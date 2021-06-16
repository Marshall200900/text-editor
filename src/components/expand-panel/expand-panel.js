import React from 'react';
import './expand-panel.scss';
import ElementsContainer from '../elements-container';
import { connect } from 'react-redux';
import { updateCanvasRect } from '../../actions';

class ExpandPanel extends React.Component{

  componentDidUpdate = () => {
    const {dispatch, canvasRef} = this.props;
    if(canvasRef !== undefined ){
      dispatch(updateCanvasRect(canvasRef.current.getBoundingClientRect()));
    }
  }

  render() {
    const {openedPanel} = this.props;
    let panelComponent;
    let visible = true;
    switch (openedPanel) {
      case 'figures': panelComponent = <ElementsContainer/>; break;
      case null: panelComponent = null; visible = false; break;
    }
    
    return (
        <div className={`expand-panel window-element ${visible ? '' : 'invisible'}`}>
            {panelComponent}
        </div>
    )
  }
 
}
const mapStateToProps = ({openedPanel, canvasRef}) => {
  return {
    openedPanel,
    canvasRef
  }
}


export default connect(mapStateToProps)(ExpandPanel);

