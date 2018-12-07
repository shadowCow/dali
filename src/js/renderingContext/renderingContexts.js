import canvasRenderingContext from './canvasRenderingContext.js';
import svgRenderingContext from './svgRenderingContext.js';

const RENDERING_CONTEXT_TYPES = Object.freeze({
  CANVAS: 'canvas',
  SVG: 'svg'
});

const RenderingContextLoader = Object.freeze({
  load: function(type) {
    switch (type) {
      case RENDERING_CONTEXT_TYPES.CANVAS:
        return canvasRenderingContext;
      case RENDERING_CONTEXT_TYPES.SVG:
        return svgRenderingContext;
      default:
        throw `Unknown rendering context type: ${type}`;
    }
  }
});

export {
  RENDERING_CONTEXT_TYPES,
  RenderingContextLoader,
}