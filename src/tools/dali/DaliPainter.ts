import { Painter } from "../../painter/Painter";
import { Drawable, DrawableTypes, DrawableGroup, PrimitiveDrawable } from "./drawables/drawable";
import { assertNever } from "../../util/patternMatching";
import { MatchStylesHandler, Styles, matchStyles } from "./drawables/styles/Styles";
import { cssColorString } from "./drawables/styles/Color";
import { GeometricPrimitive2Kinds, Quad, Text, fontString, Ellipse, Rect, Line, Polyline, Polygon, Path, PathSegment, PathSegmentTypes } from "./drawables/primitives/GeometricPrimitive2";
import { Transform } from "./drawables/transform/Transform";
import { VecXY } from "../../math/Vec";
import { TreeNode, TreeNodeKind, Branch, Leaf } from "../../data_structures/Tree";

export type DaliPainter = Painter<
    TreeNode<DrawableGroup, PrimitiveDrawable>
>;

export function createDaliPainter(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    scale: number = 1,
): DaliPainter {
    ctx.scale(scale, scale);

    const paint = (node: TreeNode<DrawableGroup, PrimitiveDrawable>) => {
        switch (node.kind) {
            case TreeNodeKind.BRANCH:
                drawComposite(node, ctx);
                break;
            case TreeNodeKind.LEAF:
                drawPrimitive(node, ctx);
                break;
            default:
                assertNever(node);
        }
    };

    const clear = () => {
        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height,
        );
    };

    return {
        paint,
        clear,
    };
}


function drawComposite(
    node: Branch<DrawableGroup, PrimitiveDrawable>,
    ctx: CanvasRenderingContext2D
): void {
    ctx.save();
    
    applyTransform(ctx, node.content.transform);
    
    node.children.forEach(child => {
        switch (child.kind) {
            case TreeNodeKind.BRANCH:
                drawComposite(child, ctx);
                break;
            case TreeNodeKind.LEAF:
                drawPrimitive(child, ctx);
                break;
            default:
                assertNever(child);
        }
    });

    ctx.restore();
}

function drawPrimitive(
    node: Leaf<PrimitiveDrawable>,
    ctx: CanvasRenderingContext2D
): void {
    ctx.save();
    const drawable = node.content;

    applyTransform(ctx, drawable.transform);

    switch (drawable.primitive.kind) {
        case GeometricPrimitive2Kinds.TEXT:
            drawText(ctx, drawable.primitive, drawable.styles);
            break;
        case GeometricPrimitive2Kinds.LINE:
            drawLine(ctx, drawable.primitive, drawable.styles);
            break;
        case GeometricPrimitive2Kinds.RECT:
            drawRect(ctx, drawable.primitive, drawable.styles);
            break;
        case GeometricPrimitive2Kinds.ELLIPSE:
            drawEllipse(ctx, drawable.primitive, drawable.styles);
            break;
        case GeometricPrimitive2Kinds.PATH:
            drawPath(ctx, drawable.primitive, drawable.styles);
            break;
        case GeometricPrimitive2Kinds.POLYLINE:
            drawPolyline(ctx, drawable.primitive, drawable.styles);
            break;
        case GeometricPrimitive2Kinds.POLYGON:
            drawPolygon(ctx, drawable.primitive, drawable.styles);
            break;
        case GeometricPrimitive2Kinds.IMAGE:
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
    if (text.params.font) {
        ctx.font = fontString(text.params.font);
    }

    styleAndDrawToCanvas(ctx, {
        stroke: s => ctx.strokeText(
            text.params.text,
            0,
            0,
        ),
        fill: f => ctx.fillText(
            text.params.text,
            0,
            0,
        ),
        strokeAndFill: sf => {
            ctx.fillText(text.params.text, 0, 0);
            ctx.strokeText(text.params.text, 0, 0);
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
        0,
        0,
        ellipse.params.rx,
        ellipse.params.ry,
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
    if (rect.params.rx && rect.params.rx > 0 || rect.params.ry && rect.params.ry > 0) {
        drawRoundRect(ctx, rect, styles);
    } else {
        styleAndDrawToCanvas(ctx, {
            stroke: s => ctx.strokeRect(0, 0, rect.params.w, rect.params.h),
            fill: f => ctx.fillRect(0, 0, rect.params.w, rect.params.h),
            strokeAndFill: sf => {
                ctx.fillRect(0, 0, rect.params.w, rect.params.h);
                ctx.strokeRect(0, 0, rect.params.w, rect.params.h);
            },
        }, styles);
    }
}

function drawRoundRect(
    ctx: CanvasRenderingContext2D,
    rect: Rect,
    styles?: Styles
): void {
    const x = 0;
    const y = 0;
    const width = rect.params.w;
    const height = rect.params.h;
    const rx = rect.params.rx ? rect.params.rx : 0;
    const ry = rect.params.ry ? rect.params.ry : 0;

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
    ctx.moveTo(0, 0);
    ctx.lineTo(line.params.toX, line.params.toY);

    ctx.stroke();
    ctx.closePath();
}

function drawPolyline(
    ctx: CanvasRenderingContext2D,
    polyline: Polyline,
    styles?: Styles
): void {
    styleCanvas(ctx, styles);

    const { points } = polyline.params;

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

    const points = polygon.params.points;
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

function drawPath(
    ctx: CanvasRenderingContext2D,
    path: Path,
    styles?: Styles
) {
    styleCanvas(ctx, styles);
  
    ctx.beginPath();
    ctx.moveTo(0, 0);
    path.params.segments.forEach(s => drawPathSegment(ctx, s));

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
    image: Quad,
): void {
    ctx.drawImage(image.params.image, 0, 0);
}

function applyTransform(
    ctx: CanvasRenderingContext2D,
    transform: Transform,
): void {
    applyTranslation(ctx, transform.translation);
    applyRotation(ctx, transform.rotation);
    applyScale(ctx, transform.scale);
}

function applyTranslation(
    ctx: CanvasRenderingContext2D,
    translation: VecXY,
): void {
    ctx.translate(translation.x, translation.y);
}

function applyRotation(
    ctx: CanvasRenderingContext2D,
    rotation: VecXY,
): void {
    const angle = Math.atan2(rotation.y, rotation.x);
    ctx.rotate(angle);
}

function applyScale(
    ctx: CanvasRenderingContext2D,
    scale: VecXY,
): void {
    ctx.scale(scale.x, scale.y);
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
        matchStyles(
            styles,
            handler,
        );
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
