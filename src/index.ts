import { Painter, createCanvasAndPainter } from "./painter/index";
import { ellipse, primitiveDrawable, strokeAndFill, rect, line, stroke, polygon, fill, path, lineTo, bezierCurveTo, eyePair, waves, text } from "./drawables/index";


const canvasContainerId = "canvas-container";
const canvasId = "drawing-canvas";

const painter: Painter | null = createCanvasAndPainter(
  document,
  canvasContainerId,
  canvasId
)

if (painter) {
  const exampleData = [
    primitiveDrawable(
      '1',
      ellipse(
        50, 50, 25, 40
      ),
      strokeAndFill('black', 3, 'blue')
    ),
    primitiveDrawable(
      '2',
      rect(
        300, 300, 100, 50, 0, 0
      ),
      strokeAndFill('yellow', 1, 'red')
    ),
    primitiveDrawable(
      '3',
      line(150, 150, 200, 100),
      stroke('green', 2)
    ),
    primitiveDrawable(
      '4',
      polygon({x:400,y:50}, {x:450, y:80}, {x:560, y:60}),
      fill('green')
    ),
    primitiveDrawable(
      '5',
      path(
        800,
        300,
        [
          lineTo(700, 350),
          bezierCurveTo(650, 25, 900, 500, 750, 50)
        ]
      ),
      strokeAndFill('black', 5, 'gray')
    ),
    primitiveDrawable(
      '6',
      rect(500, 200, 100, 100, 15, 15),
      fill('orange')
    ),
    eyePair(
      '7',
      400,
      200,
      50,
      25,
      'blue'
    ),
    waves(
      '8',
      100,
      400,
      50,
      50,
      20,
      stroke('blue', 3)
    ),
    primitiveDrawable(
      't1',
      text(250, 50, 'hello', '50px serif'),
      fill('purple')
    )
  ]
  
  exampleData.forEach(d => {
    painter.draw(d);
  });
} else {
  throw new Error('Unable to create canvas');
}


// function init(containerId: string, canvasId: string): void {
//   let maybeAlreadyCanvas = document.getElementById(canvasId);

//   if (!maybeAlreadyCanvas) {
//     let container = document.getElementById(containerId);

//     canvas = document.createElementNS(svgNs, 'svg');
//     canvas.id = canvasId;
//     canvas.setAttribute("width", "100%");
//     canvas.setAttribute("height", "100%");
//     // canvas.setAttribute("viewBox", "0 0 1000 600");
//     canvas.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");

//     container.appendChild(canvas);
//   } else {
//     canvas = maybeAlreadyCanvas;
//   }
// }
