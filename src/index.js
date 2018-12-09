
import {RENDERING_CONTEXT_TYPES, RenderingContextLoader} from './js/renderingContext/renderingContexts.js';
import {
  drawText,
  drawGroup,
  drawEllipse,
  drawRect,
  drawLine,
  drawPolygon,
  drawPath,
  linePathSegment,
  bezierCurvePathSegment,
  quadraticCurvePathSegment
} from './js/commands/primitiveShapeCommands.js';
import {drawEyePair} from './js/commands/compositeCommands/eye.js'
import {drawWave} from './js/commands/compositeCommands/wave.js'

const canvasContainerId = "canvas-container";
const canvasId = "drawing-canvas";
const renderingContextType = RENDERING_CONTEXT_TYPES.CANVAS;

const renderingContext = RenderingContextLoader.load(renderingContextType);
renderingContext.init(canvasContainerId, canvasId);

const exampleData = [
  drawEllipse("1", 50, 50, 25, 40, "blue", "black", 3),
  drawRect("2", 300, 300, 100, 50, 0, 0, "red", "yellow", 1),
  drawLine("3", 150, 150, 200, 100, undefined, "green", 2),
  drawPolygon("4", [{x:400,y:50}, {x:450, y:80}, {x:560, y:60}], "green"),
  drawPath(
    "5",
    800,
    300,
    [
      linePathSegment(700,350),
      bezierCurvePathSegment(650, 25, 900, 500, 750, 50)
    ],
    "gray",
    "black",
    5
  ),
  drawRect("6", 500, 200, 100, 100, 15, 15, "orange", undefined, undefined),
  ...drawEyePair("7", 400, 200, 50, 25, "blue"),
  drawWave("8", 100, 400, 50, 50, 20, undefined, "blue", 3),
  drawText("t1", 250, 50, "hello", "50px serif", "purple", undefined, 1)
]

renderingContext.drawPrimitives(exampleData);

const exampleGroup = drawGroup(
  "g1",
  [
    drawEllipse("gs1", 800, 50, 50, 50, "blue", "black", 3),
    drawRect("gs2", 775, 25, 50, 50, 0, 0, "red", "yellow", 1),
  ],
  //undefined
  {a:1,b:0,c:0,d:1,e:0,f:0}
)

renderingContext.drawGroup(exampleGroup);