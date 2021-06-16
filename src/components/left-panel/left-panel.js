import React from 'react';
import './left-panel.scss';
import FigureButton from '../../res/icons/ic24-play.png';
import FileButton from '../../res/icons/ic24-file.png';
import { connect } from 'react-redux';
import { switchPanel, updateCanvasRect } from '../../actions';

class LeftPanel extends React.Component {
  render() {
    const {openedPanel, dispatch, canvasRef} = this.props;
    return (
    
      <div className="left-panel window-element">
          <button className="button btn btn-outline-dark" onClick={() => this.openPanel('figures')}>
              <img src={FigureButton}/>
          </button>
          <button className="button btn btn-outline-dark" disabled>
              <img src={FileButton}/>
          </button>
      </div>
    )
  }
  
  openPanel = (panel) => {
    const { openedPanel, dispatch } = this.props;
    if(openedPanel === panel){
      dispatch(switchPanel(null));
    }
    else {
      dispatch(switchPanel(panel));
    }
  }
  componentDidUpdate = () => {

  }  

  

}
const mapStateToProps = ({openedPanel, canvasRef}) => {
  return {
    openedPanel, 
    canvasRef
  }
}


export default connect(mapStateToProps)(LeftPanel);