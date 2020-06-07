import { Painter } from './Painter';
import { assertNever } from '../util/typeGuards';
import { Drawable, CompositeDrawable, PrimitiveDrawable } from '../drawables/drawable';
import { Styles, MatchStylesHandler, matchStyles, cssColorString } from '../drawables/primitives/styles';
import { Ellipse, Rect, Line, Polyline, Polygon, Path, PathSegment, Text } from '../drawables/primitives/primitiveShapes';
import { Transform } from '../drawables/primitives/transforms';

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
  let maybeContainer = document.getElementById(containerId);

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
  let maybeAlreadyCanvas = document.getElementById(canvasId);
  
  if (maybeAlreadyCanvas && maybeAlreadyCanvas.tagName === 'canvas') {
    return <HTMLCanvasElement>maybeAlreadyCanvas;
  } else {
    const canvas = document.createElement('canvas');
    canvas.id = canvasId;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
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

  draw(drawable: Drawable): void {
    switch (drawable.typeTag) {
      case 'composite_drawable':
        drawComposite(drawable, this.ctx);
        break;
      case 'primitive_drawable':
        drawPrimitive(drawable, this.ctx);
        break;
      default: assertNever(drawable)
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
  drawable.drawables.forEach(d => {
    switch (d.typeTag) {
      case 'composite_drawable':
        drawComposite(d, ctx);
        break;
      case 'primitive_drawable':
        drawPrimitive(d, ctx);
        break;
      default: assertNever(d);
    }
  })
}

function drawPrimitive(
  drawable: PrimitiveDrawable,
  ctx: CanvasRenderingContext2D
): void {
  drawable.transforms.forEach(transform => {
    applyTransform(ctx, transform.transform);
  });

  switch (drawable.primitive.typeTag) {
    case 'text':
      drawText(ctx, drawable.primitive.primitive, drawable.styles.styles);
      break;
    case 'line':
      drawLine(ctx, drawable.primitive.primitive, drawable.styles.styles);
      break;
    case 'rect':
      drawRect(ctx, drawable.primitive.primitive, drawable.styles.styles);
      break;
    case 'ellipse':
      drawEllipse(ctx, drawable.primitive.primitive, drawable.styles.styles);
      break;
    case 'path':
      drawPath(ctx, drawable.primitive.primitive, drawable.styles.styles);
      break;
    case 'polyline':
      drawPolyline(ctx, drawable.primitive.primitive, drawable.styles.styles);
      break;
    case 'polygon':
      drawPolygon(ctx, drawable.primitive.primitive, drawable.styles.styles);
      break;
    default: assertNever(drawable.primitive);
  }

  resetTransform(ctx);
}

function drawText(
  ctx: CanvasRenderingContext2D,
  text: Text,
  styles?: Styles
): void {
  if (text.font) {
    ctx.font = text.font;
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
    }
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
  )

  drawToCanvas({
    stroke: s => ctx.stroke(),
    fill: f => ctx.fill(),
    strokeAndFill: sf => {
      ctx.fill();
      ctx.stroke();
    }
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
      }
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
    }
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
  ctx.lineTo(points[points.length-1].x, points[points.length-1].y)

  ctx.stroke();
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
  ctx.lineTo(points[points.length-1].x, points[points.length-1].y)

  drawToCanvas({
    stroke: s => ctx.stroke(),
    fill: f => ctx.fill(),
    strokeAndFill: sf => {
      ctx.fill();
      ctx.stroke();
    }
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
  ctx.moveTo(path.startX, path.startY);
  path.segments.forEach(s => drawPathSegment(ctx, s));

  drawToCanvas({
    stroke: s => ctx.stroke(),
    fill: f => ctx.fill(),
    strokeAndFill: sf => {
      ctx.fill();
      ctx.stroke();
    }
  }, styles);

  ctx.closePath();
}

function drawPathSegment(
  ctx: CanvasRenderingContext2D,
  segment: PathSegment
): void {
  switch (segment.typeTag) {
    case 'move_to':
      ctx.moveTo(segment.x, segment.y);
      break;
    case 'line_to':
      ctx.lineTo(segment.x, segment.y);
      break;
    case 'bezier_curve_to':
      ctx.bezierCurveTo(
        segment.cp1x,
        segment.cp1y,
        segment.cp2x,
        segment.cp2y,
        segment.toX,
        segment.toY
      )
      break;
    case 'quadratic_curve_to':
      ctx.quadraticCurveTo(
        segment.cpx,
        segment.cpy,
        segment.toX,
        segment.toY
      )
      break;
    default:
      assertNever(segment);
  }
}

function applyTransform(
  ctx: CanvasRenderingContext2D,
  transform: Transform,
): void {
  switch (transform.typeTag) {
    case 'rotate':
      // ctx rotation is around 0,0
      // so we need to translate before rotating
      ctx.translate(transform.x, transform.y);
      ctx.rotate(transform.a);
      ctx.translate(-transform.x, -transform.y);
      break;
    case 'scale':
      ctx.scale(transform.x, transform.y);
      break;
    case 'skew':
      ctx.transform(1, transform.y, transform.x, 1, 0, 0);
      break;
    case 'translate':
      ctx.translate(transform.x, transform.y);
      break;
  }
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
    switch (styles.typeTag) {
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
      default: assertNever(styles);
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
        strokeAndFill: sf => {}
      },
      styles
    )
  }
}