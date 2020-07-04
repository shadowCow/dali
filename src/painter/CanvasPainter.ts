import { Painter } from './Painter';
import { assertNever } from '../util/typeGuards';
import { CompositeDrawable, PrimitiveDrawable, DrawableTypes, StaticDrawable } from '../drawables/drawable';
import { Styles, MatchStylesHandler, matchStyles } from '../drawables/styles/Styles';
import { Ellipse, Rect, Line, Polyline, Polygon, Path, PathSegment, Text, Image, fontString, PrimitiveTypes, PathSegmentTypes, EquilateralPolygon } from '../drawables/primitives/primitiveShapes';
import * as Transform from '../drawables/transform/Transform';
import * as Translate from '../drawables/transform/Translate';
import * as Rotate from '../drawables/transform/Rotate';
import * as Scale from '../drawables/transform/Scale';
import * as Skew from '../drawables/transform/Skew';
import { cssColorString } from '../drawables/styles/Color';

export function createCanvasAndPainter(
    document: Document,
    containerId: string,
    canvasId: string
): CanvasPainter | null {

    const container = getCanvasContainer(
        document,
        containerId
    );

    const canvas = getCanvas(
        document,
        container,
        canvasId
    );

    const ctx = canvas.getContext('2d');

    if (ctx) {
        return new CanvasPainter(
            canvas,
            ctx
        );
    } else {
        return null;
    }
}

function getCanvasContainer(
    document: Document,
    containerId: string
): HTMLElement {
    const maybeContainer = document.getElementById(containerId);

    if (maybeContainer) {
        return maybeContainer;
    } else {
        const container = document.createElement('div');
        container.id = containerId;

        document.body.appendChild(
            container
        );

        return container;
    }
}

function getCanvas(
    document: Document,
    container: HTMLElement,
    canvasId: string
): HTMLCanvasElement {
    const maybeAlreadyCanvas = document.getElementById(canvasId);
  
    if (maybeAlreadyCanvas && maybeAlreadyCanvas.tagName === 'canvas') {
        return maybeAlreadyCanvas as HTMLCanvasElement;
    } else {
        const canvas = document.createElement('canvas');
        canvas.id = canvasId;
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;

        container.appendChild(canvas);

        return canvas;
    }
}

export class CanvasPainter implements Painter {
    constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly ctx: CanvasRenderingContext2D
    ) {}

    draw(drawable: StaticDrawable): void {
        switch (drawable.kind) {
            case DrawableTypes.COMPOSITE_DRAWABLE:
                drawComposite(drawable, this.ctx);
                break;
            case DrawableTypes.PRIMITIVE_DRAWABLE:
                drawPrimitive(drawable, this.ctx);
                break;
            default:
                assertNever(drawable);
        }
    }

    clear(): void {
        this.ctx.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height,
        );
    }
}

function drawComposite(
    drawable: CompositeDrawable,
    ctx: CanvasRenderingContext2D
): void {
    ctx.save();
    
    styleCanvas(ctx, drawable.styles);
    applyTransform(ctx, drawable.transform);
    
    drawable.drawables.forEach(d => {
        switch (d.kind) {
            case DrawableTypes.COMPOSITE_DRAWABLE:
                drawComposite(d, ctx);
                break;
            case DrawableTypes.PRIMITIVE_DRAWABLE:
                drawPrimitive(d, ctx);
                break;
            default:
                assertNever(d);
        }
    });

    ctx.restore();
}

function drawPrimitive(
    drawable: PrimitiveDrawable,
    ctx: CanvasRenderingContext2D
): void {
    ctx.save();

    applyTransform(ctx, drawable.transform);

    switch (drawable.primitive.kind) {
        case PrimitiveTypes.TEXT:
            drawText(ctx, drawable.primitive, drawable.styles);
            break;
        case PrimitiveTypes.LINE:
            drawLine(ctx, drawable.primitive, drawable.styles);
            break;
        case PrimitiveTypes.RECT:
            drawRect(ctx, drawable.primitive, drawable.styles);
            break;
        case PrimitiveTypes.ELLIPSE:
            drawEllipse(ctx, drawable.primitive, drawable.styles);
            break;
        case PrimitiveTypes.PATH:
            drawPath(ctx, drawable.primitive, drawable.styles);
            break;
        case PrimitiveTypes.POLYLINE:
            drawPolyline(ctx, drawable.primitive, drawable.styles);
            break;
        case PrimitiveTypes.POLYGON:
            drawPolygon(ctx, drawable.primitive, drawable.styles);
            break;
        case PrimitiveTypes.EQUILATERAL_POLYGON:
            drawEquilateralPolygon(ctx, drawable.primitive, drawable.styles);
            break;
        case PrimitiveTypes.IMAGE:
            drawImage(ctx, drawable.primitive);
            break;
        default:
            assertNever(drawable.primitive);
    }

    ctx.restore();
}

function drawText(
    ctx: CanvasRenderingContext2D,
    text: Text,
    styles?: Styles
): void {
    if (text.font) {
        ctx.font = fontString(text.font);
    }

    styleAndDrawToCanvas(ctx, {
        stroke: s => ctx.strokeText(
            text.text,
            text.x,
            text.y
        ),
        fill: f => ctx.fillText(
            text.text,
            text.x,
            text.y
        ),
        strokeAndFill: sf => {
            ctx.fillText(text.text, text.x, text.y);
            ctx.strokeText(text.text, text.x, text.y);
        },
    }, styles);
}

function drawEllipse(
    ctx: CanvasRenderingContext2D,
    ellipse: Ellipse,
    styles?: Styles
): void {
    styleCanvas(ctx, styles);

    ctx.beginPath();
    ctx.ellipse(
        ellipse.cx,
        ellipse.cy,
        ellipse.rx,
        ellipse.ry,
        0,
        0,
        2 * Math.PI
    );

    drawToCanvas({
        stroke: s => ctx.stroke(),
        fill: f => ctx.fill(),
        strokeAndFill: sf => {
            ctx.fill();
            ctx.stroke();
        },
    }, styles);

    ctx.closePath();
}

function drawRect(
    ctx: CanvasRenderingContext2D,
    rect: Rect,
    styles?: Styles
): void {
    if (rect.rx && rect.rx > 0 || rect.ry && rect.ry > 0) {
        drawRoundRect(ctx, rect, styles);
    } else {
        styleAndDrawToCanvas(ctx, {
            stroke: s => ctx.strokeRect(rect.x, rect.y, rect.width, rect.height),
            fill: f => ctx.fillRect(rect.x, rect.y, rect.width, rect.height),
            strokeAndFill: sf => {
                ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
                ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
            },
        }, styles);
    }
}

function drawRoundRect(
    ctx: CanvasRenderingContext2D,
    rect: Rect,
    styles?: Styles
): void {
    const {x, y, width, height} = rect;
    const rx = rect.rx ? rect.rx : 0;
    const ry = rect.ry ? rect.ry : 0;

    styleCanvas(ctx, styles);

    ctx.beginPath();
    ctx.moveTo(x + rx, y);
    ctx.lineTo(x + width - rx, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + ry);
    ctx.lineTo(x + width, y + height - ry);
    ctx.quadraticCurveTo(x + width, y + height, x + width - rx, y + height);
    ctx.lineTo(x + rx, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - ry);
    ctx.lineTo(x, y + ry);
    ctx.quadraticCurveTo(x, y, x + rx, y);
  
    drawToCanvas({
        stroke: s => ctx.stroke(),
        fill: f => ctx.fill(),
        strokeAndFill: sf => {
            ctx.fill();
            ctx.stroke();
        },
    }, styles);

    ctx.closePath();
}

function drawLine(
    ctx: CanvasRenderingContext2D,
    line: Line,
    styles?: Styles
): void {
    styleCanvas(ctx, styles);
  
    ctx.beginPath();
    ctx.moveTo(line.x1, line.y1);
    ctx.lineTo(line.x2, line.y2);

    ctx.stroke();
    ctx.closePath();
}

function drawPolyline(
    ctx: CanvasRenderingContext2D,
    polyline: Polyline,
    styles?: Styles
): void {
    styleCanvas(ctx, styles);

    const { points } = polyline;

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length - 1; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.lineTo(points[points.length-1].x, points[points.length-1].y);

    drawToCanvas({
        stroke: s => ctx.stroke(),
        fill: f => ctx.fill(),
        strokeAndFill: sf => {
            ctx.fill();
            ctx.stroke();
        },
    }, styles);

    ctx.closePath();
}

function drawPolygon(
    ctx: CanvasRenderingContext2D,
    polygon: Polygon,
    styles?: Styles
) {
    styleCanvas(ctx, styles);

    const points = polygon.points;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length-1; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.lineTo(points[points.length-1].x, points[points.length-1].y);

    drawToCanvas({
        stroke: s => ctx.stroke(),
        fill: f => ctx.fill(),
        strokeAndFill: sf => {
            ctx.fill();
            ctx.stroke();
        },
    }, styles);

    ctx.closePath();
}

function drawEquilateralPolygon(
    ctx: CanvasRenderingContext2D,
    equilateralPolygon: EquilateralPolygon,
    styles?: Styles
): void {
    styleCanvas(ctx, styles);

    ctx.translate(equilateralPolygon.cx, equilateralPolygon.cy);
    const angle = equilateralPolygonInteriorAngle(equilateralPolygon.n);
    const firstPoint = {
        x: 0,
        y: (-1) * equilateralPolygon.radius,
    };

    ctx.beginPath();
    ctx.moveTo(firstPoint.x, firstPoint.y);
    for (let i = 1; i < equilateralPolygon.n; i++) {
        ctx.save();
        applyRotate(
            ctx,
            {
                a: i * angle,
                x: 0,
                y: 0,
            },
        );
        ctx.lineTo(firstPoint.x, firstPoint.y);
        ctx.restore();
    }
    ctx.lineTo(firstPoint.x, firstPoint.y);

    drawToCanvas({
        stroke: s => ctx.stroke(),
        fill: f => ctx.fill(),
        strokeAndFill: sf => {
            ctx.fill();
            ctx.stroke();
        },
    }, styles);

    ctx.closePath();
}

function equilateralPolygonInteriorAngle(
    n: number,
): number {
    return (2*Math.PI) / n;
}

function drawPath(
    ctx: CanvasRenderingContext2D,
    path: Path,
    styles?: Styles
) {
    styleCanvas(ctx, styles);
  
    ctx.beginPath();
    ctx.moveTo(path.startX, path.startY);
    path.segments.forEach(s => drawPathSegment(ctx, s));

    drawToCanvas({
        stroke: s => ctx.stroke(),
        fill: f => ctx.fill(),
        strokeAndFill: sf => {
            ctx.fill();
            ctx.stroke();
        },
    }, styles);

    ctx.closePath();
}

function drawPathSegment(
    ctx: CanvasRenderingContext2D,
    segment: PathSegment
): void {
    switch (segment.kind) {
        case PathSegmentTypes.MOVE_TO:
            ctx.moveTo(segment.x, segment.y);
            break;
        case PathSegmentTypes.LINE_TO:
            ctx.lineTo(segment.x, segment.y);
            break;
        case PathSegmentTypes.BEZIER_CURVE_TO:
            ctx.bezierCurveTo(
                segment.cp1x,
                segment.cp1y,
                segment.cp2x,
                segment.cp2y,
                segment.toX,
                segment.toY
            );
            break;
        case PathSegmentTypes.QUADRATIC_CURVE_TO:
            ctx.quadraticCurveTo(
                segment.cpx,
                segment.cpy,
                segment.toX,
                segment.toY
            );
            break;
        default:
            assertNever(segment);
    }
}

function drawImage(
    ctx: CanvasRenderingContext2D,
    image: Image,
): void {
    ctx.drawImage(image.image, 0, 0);
}

function applyTransform(
    ctx: CanvasRenderingContext2D,
    transform: Transform.State,
): void {
    applyTranslate(ctx, transform.translate);
    applyRotate(ctx, transform.rotate);
    applyScale(ctx, transform.scale);
    applySkew(ctx, transform.skew);
}

function applyTranslate(
    ctx: CanvasRenderingContext2D,
    translate: Translate.State,
): void {
    ctx.translate(translate.x, translate.y);
}

function applyRotate(
    ctx: CanvasRenderingContext2D,
    rotate: Rotate.State,
): void {
    // ctx rotation is around 0,0
    // so we need to translate before rotating
    ctx.translate(rotate.x, rotate.y);
    ctx.rotate(rotate.a);
    ctx.translate(-rotate.x, -rotate.y);
}

function applyScale(
    ctx: CanvasRenderingContext2D,
    scale: Scale.State,
): void {
    ctx.scale(scale.x, scale.y);
}

function applySkew(
    ctx: CanvasRenderingContext2D,
    skew: Skew.State,
): void {
    ctx.transform(1, skew.y, skew.x, 1, 0, 0);
}

function resetTransform(
    ctx: CanvasRenderingContext2D
): void {
    ctx.setTransform(1,0,0,1,0,0);
}

function styleAndDrawToCanvas(
    ctx: CanvasRenderingContext2D,
    handler: MatchStylesHandler,
    styles?: Styles
): void {
    if (styles) {
        switch (styles.kind) {
            case 'stroke':
                ctx.strokeStyle = cssColorString(styles.color);
                ctx.lineWidth = styles.width;
                handler.stroke(styles);
                break;
            case 'fill':
                ctx.fillStyle = cssColorString(styles.color);
                handler.fill(styles);
                break;
            case 'stroke_and_fill':
                ctx.strokeStyle = cssColorString(styles.stroke.color);
                ctx.lineWidth = styles.stroke.width;
                ctx.fillStyle = cssColorString(styles.fill.color);
                handler.strokeAndFill(styles);
                break;
            default:
                assertNever(styles);
        }
    }
}

function drawToCanvas(
    handler: MatchStylesHandler,
    styles?: Styles,
): void {
    if (styles) {
        matchStyles(styles, handler);
    }
}

function styleCanvas(
    ctx: CanvasRenderingContext2D,
    styles?: Styles
): void {
    if (styles) {
        styleAndDrawToCanvas(
            ctx,
            {
                stroke: s => {},
                fill: f => {},
                strokeAndFill: sf => {},
            },
            styles
        );
    }
}
