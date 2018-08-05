import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CanvasContainer from './containers/CanvasContainer'

function App(props) {
  return (
    <div>
      Got my app!
      <CanvasContainer />
    </div>
  )
}

App.propTypes = {}

export default App
