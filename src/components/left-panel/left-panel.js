import React from 'react';
import './left-panel.scss';
import FigureButton from '../../res/icons/ic24-play.png';
import FileButton from '../../res/icons/ic24-file.png';
import { connect } from 'react-redux';
import { switchPanel } from '../../actions';

const LeftPanel = ({openedPanel, dispatch}) => {
  const openPanel = (panel) => {
    if(openedPanel === panel){
      dispatch(switchPanel(null));
    }
    else {
      dispatch(switchPanel(panel));
    }
  }

  return (
      <div className="left-panel window-element">
          <button className="button btn btn-outline-dark" onClick={() => openPanel('figures')}>
              <img src={FigureButton}/>
          </button>
          <button className="button btn btn-outline-dark" disabled>
              <img src={FileButton}/>
          </button>
      </div>
  )
  

}
const mapStateToProps = ({openedPanel}) => {
  return {
    openedPanel
  }
}


export default connect(mapStateToProps)(LeftPanel);