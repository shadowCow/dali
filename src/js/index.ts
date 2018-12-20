
import {RenderingContextTypes, RenderingContextLoader} from './renderingContext/renderingContexts.js';
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
  quadraticCurvePathSegment,
  translate,
  rotate,
  scale,
  skew
} from './commands/primitiveShapeCommands.js';
import {drawEyePair} from './commands/compositeCommands/eye.js'
import {drawWave} from './commands/compositeCommands/wave.js'

const canvasContainerId = "canvas-container";
const canvasId = "drawing-canvas";
const renderingContextType = RenderingContextTypes.Svg;

const renderingContext = RenderingContextLoader.load(renderingContextType);
renderingContext.init(canvasContainerId, canvasId);

const exampleData = [
  drawEllipse(
    "1",
    {cx:50,cy:50,rx:25,ry:40},
    {fill:"blue",stroke:"black",strokeWidth:3}
  ),
  drawRect(
    "2",
    {x:300,y:300,width:100,height:50,rx:0,ry:0},
    {fill:"red",stroke:"yellow",strokeWidth:1},
    {transformOps:[
      translate(30, -30),
      rotate(0.5, 0, 0),
      scale(1.5, 0.5),
      skew(30, 30)
    ]}
  ),
  drawLine(
    "3",
    {x1:150,y1:150,x2:200,y2:100},
    {fill:"none",stroke:"green",strokeWidth:2}
  ),
  drawPolygon(
    "4", 
    {points: [{x:400,y:50}, {x:450, y:80}, {x:560, y:60}]},
    {fill: "green"}
  ),
  drawPath(
    "5",
    {
      startX: 800,
      startY: 300,
      segments: [
        linePathSegment(700,350),
        bezierCurvePathSegment(650, 25, 900, 500, 750, 50)
      ]
    },
    {fill:"gray",stroke:"black",strokeWidth:5}
  ),
  drawRect(
    "6",
    {x:500,y:200,width:100,height:100,rx:15,ry:15},
    {fill:"orange"}
  ),
  ...drawEyePair("7", 400, 200, 50, 25, "blue"),
  drawWave(
    "8",
    {startX:100,startY:400,waveLength:50,amplitude:50,numCycles:20},
    {fill:"none",stroke:"blue",strokeWidth:3}
  ),
  drawText(
    "t1",
    {x:250,y:50,text:"hello",font:"50px serif"},
    {fill:"purple"}
  )
]

renderingContext.drawPrimitives(exampleData);

const exampleGroup = drawGroup(
  "g1",
  {primitives: [
    drawEllipse(
      "gs1",
      {cx:800,cy:50,rx:50,ry:50},
      {fill:"blue",stroke:"black",strokeWidth:3}
    ),
    drawRect(
      "gs2",
      {x:775,y:25,width:50,height:50,rx:0,ry:0},
      {fill:"red",stroke:"yellow",strokeWidth:1}
    ),
  ]}
)

renderingContext.drawGroup(exampleGroup);