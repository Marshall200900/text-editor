import React from 'react';
import './canvas.scss';
import dotNet from '../../res/dot-net.png';
import Sticker from '../sticker';
import { connect } from 'react-redux';
import {
  mouseDownSticker,
  mouseDownElementBorder,
  mouseMoveElement,
  mouseMoveBorderOfElement,
  mouseUp,
  mouseDownCanvas,
  mouseMoveCreatingElement
  } from '../../actions';

class Canvas extends React.Component {

  static curId = 0;
  render() {
      const { elements, isElementMoving, isElementBorderMoving } = this.props;

      const listOfElements = elements.map((element) => {
          const {id} = element;
          return (
              <Sticker element={element}
                  key={id}
                  onMouseDownSticker={this.onMouseDownSticker}
                  onMouseDownBorder={this.onMouseDownBorder}
              />
          )
      })

      return(
          <div className='canvas'
              onMouseMove={this.onMouseMove}
              onMouseUp={this.onMouseUp}
              onMouseLeave={this.onMouseUp}
              onMouseDown={this.onMouseDown}
              style={isElementBorderMoving || isElementMoving ? { backgroundImage: `url(${dotNet})` } : {}}
          >
              {/* <img draggable="false" className="noselect" src={dotNet}/> */}
              {listOfElements}
          </div>
      )
  }
  onMouseDown = (e) => {
    const { dispatch } = this.props;
    const rect = e.target.getBoundingClientRect();
    const canvasX = e.clientX - rect.left;
    const canvasY = e.clientY - rect.top;
    
    dispatch(mouseDownCanvas(canvasX, canvasY));
  }


  onMouseMove = (e) => {
    const { isElementMoving, isElementBorderMoving, isCreatingElement, dispatch } = this.props;
    const globalX = e.clientX;
    const globalY = e.clientY;

    if(isElementBorderMoving) {
      dispatch(mouseMoveBorderOfElement(globalX, globalY));
    }
    else if (isElementMoving) {
      dispatch(mouseMoveElement(globalX, globalY));
    }
    else if (isCreatingElement) {  
      const rect = e.target.getBoundingClientRect();
      const canvasX = e.clientX - rect.left;
      const canvasY = e.clientY - rect.top;
      
      dispatch(mouseMoveCreatingElement(canvasX, canvasY));


    }

  }
  onMouseDownSticker = (e, id) => {
    const { dispatch } = this.props;
    const globalX = e.clientX;
    const globalY = e.clientY;

    dispatch(mouseDownSticker(globalX, globalY, id));

    e.stopPropagation();
  }
  
  onMouseDownBorder = (e, id, border) => {
    const { dispatch } = this.props;
    const globalX = e.clientX;
    const globalY = e.clientY;
    dispatch(mouseDownElementBorder(globalX, globalY, id, border));

    e.stopPropagation();

  }
  onMouseUp = () => {
    const { dispatch } = this.props;
    dispatch(mouseUp());
  }
}


const mapStateToProps = ({ elements, isElementMoving, isElementBorderMoving, isCreatingElement }) => {
  return {
    elements,
    isElementMoving,
    isElementBorderMoving,
    isCreatingElement
  }
}

export default connect(mapStateToProps)(Canvas);