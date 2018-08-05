import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PaintingConstants from '../model/PaintingConstants'
const {
  CIRCLE,
  ELLIPSE,
  RECT,
  LINE,
  POLYLINE,
  POLYGON,
  PATH,
} = PaintingConstants

function SvgRenderer(svgData) {
  console.log('rendering svg data', svgData)
  switch (svgData.type) {
    case CIRCLE:
      console.log("rendering circle")
      return (
        <circle key={svgData.id}
                cx={svgData.centerX}
                cy={svgData.centerY}
                r={svgData.radius}
                fill={svgData.fill}
                stroke={svgData.stroke}
                strokeWidth={svgData.strokeWidth} />
      )
    case ELLIPSE:
      return (
        <ellipse key={svgData.id}
                 cx={svgData.centerX}
                 cy={svgData.centerY}
                 rx={svgData.radiusX}
                 ry={svgData.radiusY}
                 fill={svgData.fill}
                 stroke={svgData.stroke}
                 strokeWidth={svgData.strokeWidth} />
      )
    case RECT:
      return (
        <rect key={svgData.id}
              x={svgData.x}
              y={svgData.y}
              width={svgData.width}
              height={svgData.height}
              fill={svgData.fill}
              stroke={svgData.stroke}
              strokeWidth={svgData.strokeWidth} />
      )
    case LINE:
      return (
        <line key={svgData.id}
              x1={svgData.x1}
              y1={svgData.y1}
              x2={svgData.x2}
              y2={svgData.y2}
              fill={svgData.fill}
              stroke={svgData.stroke}
              strokeWidth={svgData.strokeWidth} />
      )
    case POLYLINE:
      return (
        <polyline key={svgData.id}
                  points={svgData.points}
                  fill={svgData.fill}
                  stroke={svgData.stroke}
                  strokeWidth={svgData.strokeWidth} />
      )
    case POLYGON:
      return (
        <polygon key={svgData.id}
                 points={svgData.points}
                 fill={svgData.fill}
                 stroke={svgData.stroke}
                 strokeWidth={svgData.strokeWidth} />
      )
    case PATH:
      console.log('rendering path')
      return (
        <path key={svgData.id}
              d={svgData.d}
              fill={svgData.fill}
              stroke={svgData.stroke}
              strokeWidth={svgData.strokeWidth} />
      )
  }
}

export default SvgRenderer
