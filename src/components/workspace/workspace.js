import React from 'react';

import './workspace.scss';
import Canvas from '../canvas';
import { updateCanvasRect } from '../../actions';
import { connect } from 'react-redux';
const Workspace = ({dispatch, canvasRef}) => {
  return (
      <div className="workspace window-element" onScroll={() => dispatch(updateCanvasRect(canvasRef.current.getBoundingClientRect()))}>
          <Canvas/>
      </div>
  )
}
const mapStateToProps = ({canvasRef}) => {
  return {
    canvasRef
  }
}
export default connect(mapStateToProps)(Workspace);
