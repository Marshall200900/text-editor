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
    const { isElementMoving, isElementBorderMoving, dispatch } = this.props;
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    dispatch(mouseDownCanvas(x, y));
  }


  onMouseMove = (e) => {
    const { isElementMoving, isElementBorderMoving, isCreatingElement, dispatch } = this.props;
    
    if(isElementBorderMoving) {
      dispatch(mouseMoveBorderOfElement(e));
    }
    else if (isElementMoving) {
      dispatch(mouseMoveElement(e));
    }
    else if (isCreatingElement) {  
      const rect = e.target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      dispatch(mouseMoveCreatingElement(x, y));


    }

  }
  onMouseDownSticker = (e, id) => {
    const { dispatch } = this.props;
    dispatch(mouseDownSticker(e, id));

    e.stopPropagation();
  }
  
  onMouseDownBorder = (e, id, border) => {
    const { dispatch } = this.props;
    dispatch(mouseDownElementBorder(e, id, border));

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