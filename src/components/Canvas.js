import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SvgRenderer from './SvgRenderer'
import initializeState from '../stateInitializer'

class Canvas extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.initializeState()
  }

  render() {
    console.log('rendering canvas')
    return (
      <svg width={window.innerWidth} height={window.innerHeight}>
        {renderPaintingElements(this.props.paintings)}
      </svg>
    )
  }
}

function renderPaintingElements(paintings) {
  console.log('paintings are', paintings)
  return paintings.root.children.map(c =>
    SvgRenderer(paintings[c])
  )
}

Canvas.propTypes = {
  initializeState: PropTypes.func.isRequired,
}

export default Canvas
