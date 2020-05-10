import { Painter } from "./Painter";
import { Drawable, CompositeDrawable, PrimitiveDrawable, Styles, Text, Primitive, PathSegment, Path } from "../drawables/index";
import { assertNever } from "../util/typeGuards";

const svgNs: string = "http://www.w3.org/2000/svg";

export class SvgPainter implements Painter {
  constructor(
    private readonly canvas: SVGElement
  ) {}

  draw(drawable: Drawable): void {
    throw new Error('Method not implemented');
    // switch (drawable.typeTag) {
    //   case 'composite_drawable':
    //     drawComposite(drawable, this.canvas);
    //     break;
    //   case 'primitive_drawable':
    //     drawPrimitive(drawable, this.canvas);
    //     break;
    //   default: assertNever(drawable)
    // }
  }
}

// function drawComposite(
//   drawable: CompositeDrawable,
//   canvas: SVGElement
// ): void {
//   drawable.drawables.forEach(d => {
//     switch (d.typeTag) {
//       case 'composite_drawable':
//         drawComposite(d, canvas);
//         break;
//       case 'primitive_drawable':
//         drawPrimitive(d, canvas);
//         break;
//       default: assertNever(d);
//     }
//   })
// }

// function drawPrimitive(
//   drawable: PrimitiveDrawable,
//   canvas: SVGElement
// ): void {
//   switch (drawable.primitive.typeTag) {
//     case 'text':
//       drawText(canvas, drawable.primitive, drawable.styles);
//       break;
//     case 'line':
//       drawLine(canvas, drawable.primitive, drawable.styles);
//       break;
//     case 'rect':
//       drawRect(canvas, drawable.primitive, drawable.styles);
//       break;
//     case 'ellipse':
//       drawEllipse(canvas, drawable.primitive, drawable.styles);
//       break;
//     case 'path':
//       drawPath(canvas, drawable.primitive, drawable.styles);
//       break;
//     case 'polyline':
//       drawPolyline(canvas, drawable.primitive, drawable.styles);
//       break;
//     case 'polygon':
//       drawPolygon(canvas, drawable.primitive, drawable.styles);
//       break;
//     default: assertNever(drawable.primitive);
//   }
// }


// function drawText(
//   parent: SVGElement,
//   text: Text,
//   styles?: Styles
// ): void {
//   const textElement = createAndAdd(
//     "text",
//     text,
//     ["x","y"],
//     parent
//   )

//   textElement.style.font = textData.drawParams.font;

//   const textNode = document.createTextNode(textData.drawParams.text);
//   textElement.appendChild(textNode);
// }

// function drawEllipse(ellipseData, parent = canvas) {
//   _createAndAdd(
//     "ellipse",
//     ellipseData,
//     ["cx","cy","rx","ry"],
//     parent
//   )
// }

// function drawRect(rectData, parent = canvas) {
//   _createAndAdd(
//     "rect",
//     rectData,
//     ["x","y","width","height","rx","ry"],
//     parent
//   )
// }

// function drawLine(lineData, parent = canvas) {
//   _createAndAdd(
//     "line",
//     lineData,
//     ['x1','y1','x2','y2'],
//     parent
//   );
// }

// function drawPolygon(polygonData, parent = canvas) {
//   const pointsAsSvgString = polygonData.drawParams.points.map(p => {
//     return `${p.x},${p.y}`
//   }).reduce((acc, item, index) => {
//     if (index !== 0) {
//       return acc + " " + item
//     } else {
//       return acc + item
//     }
//   }, "");

//   const polygonForSvg = {
//     ...polygonData,
//     drawParams: {
//       points: pointsAsSvgString
//     }
//   }

//   _createAndAdd(
//     "polygon",
//     polygonForSvg,
//     ["points"],
//     parent
//   )
// }

// function drawPath(
//   parent: SVGElement,
//   path: Path,
//   styles?: Styles
// ) {
//   const pathStart: string = `M${path.startX} ${path.startY},`
//   const segmentsAsSvgString: string = path.segments.map(s => {
//     return pathSegmentToSvgString(s);
//   }).reduce((acc, item) => {
//     return acc + " " + item
//   }, pathStart);

//   const pathForSvg = {
//     ...path,
//     drawParams: {
//       d: segmentsAsSvgString
//     }
//   }

//   createAndAdd(
//     "path",
//     pathForSvg,
//     ["d"],
//     parent
//   )
// }

// function pathSegmentToSvgString(
//   pathSegment: PathSegment
// ): string {
//   switch (pathSegment.typeTag) {
//     case 'move_to':
//       return `M${pathSegment.x} ${pathSegment.y}`;
//     case 'line_to':
//       return `L ${pathSegment.x} ${pathSegment.y}`;
//     case 'bezier_curve_to':
//       return `C ${pathSegment.cp1x} ${pathSegment.cp2x}, ${pathSegment.cp2x} ${pathSegment.cp2y}, ${pathSegment.toX} ${pathSegment.toY}`;
//     case 'quadratic_curve_to':
//       return `Q ${pathSegment.cpx} ${pathSegment.cpy}, ${pathSegment.toX} ${pathSegment.toY}`;
//     default:
//       assertNever(pathSegment);
//   }
// }

// // function drawGroup(
// //   groupData: Command<PrimitiveShapeParams>,
// //   parent = canvas
// // ): void {
// //   const groupEl = createAndAdd(
// //     "g",
// //     groupData.params,
// //     [],
// //     parent
// //   );

// //   addStyles(groupEl, groupData.params.styles);

// //   groupData.params.drawParams.primitives.forEach(p => drawPrimitive(p, groupEl));
// // }

// function createAndAdd(
//   elementTag: string,
//   data: PrimitiveDrawable,
//   attributes: Array<string>,
//   parent = canvas
// ) {
//   const element = document.createElementNS(svgNs, elementTag);
//   setAttributes(element, data.primitive, attributes);
//   addStyles(element, data.styles);
//   // addTransform(element, data.transform);

//   parent.appendChild(element);

//   return element;
// }

// function setAttributes(
//   element,
//   data: object,
//   attributes: Array<string>
// ): void {
//   attributes.forEach(a => {
//     element.setAttribute(a, data[a])
//   });
// }

// function addStyles(
//   element,
//   styles?: Styles,
// ): void {
//   if (styles) {
//     if (styles.stroke) {
//       element.style.stroke = styles.stroke;
//       element.style.strokeWidth = styles.strokeWidth;
//     }
//     if (styles.fill) {
//       element.style.fill = styles.fill;
//     } else {
//       element.style.fill = "none"
//     }
//   }
// }

// function addTransform(
//   element,
//   transform?: Transform
// ): void {
//   if (transform) {
//     let transformAsSvgString: string = transform.transformOps.reduce((acc: string, item: TransformOp, index) => {
//       if (index !== 0) {
//         return acc + " " + _transformOpAsSvgString(item)
//       } else {
//         return acc + _transformOpAsSvgString(item) 
//       }
//     }, "")
//     element.setAttribute("transform", transformAsSvgString);
//   }
// }

// function transformOpAsSvgString(
//   transformOp: TransformOp
// ): string {
//   switch (transformOp.type) {
//     case TransformOps.ROTATE:
//       return _rotateAsSvgString(transformOp)
//     case TransformOps.SCALE:
//       return _scaleAsSvgString(transformOp)
//     case TransformOps.SKEW:
//       return _skewAsSvgString(transformOp)
//     case TransformOps.TRANSLATE:
//       return _translateAsSvgString(transformOp)
//   }
// }

// function rotateAsSvgString(
//   rotate: TransformOp
// ): string {
//   return `rotate(${rotate.a} ${rotate.x} ${rotate.y})`
// }

// function scaleAsSvgString(
//   scale: TransformOp
// ): string {
//   return `scale(${scale.x} ${scale.y})`
// }

// function skewAsSvgString(
//   skew: TransformOp
// ): string {
//   let skewString: string = "";
//   if (skew.x) {
//     skewString = `skewX(${skew.x})`
//   }
//   if (skew.y) {
//     let maybeSpace = skewString.length > 0
//      ? " "
//      : "";

//     skewString = skewString + maybeSpace + `skewY(${skew.y})`
//   }

//   return skewString;
// }

// function translateAsSvgString(
//   translate: TransformOp
// ): string {
//   return `translate(${translate.x} ${translate.y})`
// }
