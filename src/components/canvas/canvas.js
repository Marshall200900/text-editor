import React from 'react';
import './canvas.scss';
import dotNet from '../../res/dot-net.png';
import Sticker from '../sticker';
import { connect } from 'react-redux';
import { createElement, deleteElement, selectSticker, updateCanvasRect, updateElement, setCanvasRef } from '../../actions';
import Kanban from '../canvas-components/kanban';
import TextSticker from '../canvas-components/text-sticker';
import Checklist from '../canvas-components/checklist';
class Canvas extends React.Component {
  state = {
    prevMousePosition: null,
    prevElementCoords: null,
    elementBorderMoving: null,
    elementIdChanging: null,
  
    isElementBorderMoving: false,
    isElementMoving: false,
    isCreatingElement: false,
  }
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }
  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch(setCanvasRef(this.canvas));
    dispatch(updateCanvasRect(this.canvas.current.getBoundingClientRect()))
    window.addEventListener('resize', () => dispatch(updateCanvasRect(this.canvas.current.getBoundingClientRect())));
    document.addEventListener('keydown', (e) => {
      const key = e.key;
      if(key === 'Delete') {
        this.deleteSelected();
      }
    })
  }
  deleteSelected = () => {
    const { dispatch, selectedStickerId } = this.props;

    dispatch(deleteElement(selectedStickerId));
  }
  updateCanvasRect = (canvasRect) => {
    this.setState({canvasRect});
  }

  render() {
    const {  isElementMoving, isElementBorderMoving } = this.state;
    const { elements, selectedStickerId } = this.props;
    const listOfElements = elements.map((element) => {
      let stickerContent;
        switch (element.type) {
          case 'text': stickerContent = <TextSticker elementState={element.elementState} updateData={(data) => this.updateData(id, data)}/>; break;
          case 'kanban': stickerContent = <Kanban elementState={element.elementState} updateData={(data) => this.updateData(id, data)}/>; break;
          case 'checklist': stickerContent = <Checklist elementState={element.elementState} updateData={(data) => this.updateData(id, data)}/>; break;
        }
        const {id} = element;
        const selected = selectedStickerId === id; // maybe there is a way to refactor
        return (
            <Sticker element={element}
                key={id}
                onMouseDownSticker={this.onMouseDownSticker}
                onMouseDownBorder={this.onMouseDownBorder}
                selected={selected}
            >
            {stickerContent}
            </Sticker>
        )
    })
    return(
        <div className='canvas' ref={this.canvas}
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
  updateData = (id, elementState) => {
    const { elements, dispatch } = this.props;
    const element = elements.find(el => el.id === id);
    const newElement = { ...element, elementState };
    dispatch(updateElement(newElement));
  }
  getElementWidth = (coords) => {
    return coords.x2y2[0] - coords.x1y1[0];
  }
  getElementHeight = (coords) => {
    return coords.x2y2[1] - coords.x1y1[1];
  }
  snapCoordinates = (coords) => {
    const newCoords = {
      x1y1: [coords.x1y1[0] - coords.x1y1[0] % 40 + 20, coords.x1y1[1] - coords.x1y1[1] % 40 + 20],
      x2y2: [coords.x2y2[0] - coords.x2y2[0] % 40 + 20, coords.x2y2[1] - coords.x2y2[1] % 40 + 20]
    };
    return newCoords;
  }
  onMouseDown = (e) => {
    const [canvasX, canvasY] = this.getCanvasCoords(e);
    this.mouseDownCanvas(canvasX, canvasY);
  }
  mouseDownCanvas = (canvasX, canvasY) => {
    this.props.dispatch(selectSticker(null));
    const { dispatch } = this.props;
    const newElement = { 
      coords: {
        x1y1: [canvasX, canvasY],
        x2y2: [canvasX, canvasY],
      },
    }
    dispatch(createElement(newElement));

    this.setState({
      isCreatingElement: true,
      prevMousePosition: [canvasX, canvasY]
    })
  }
  mouseMoveBorderOfElement = (globalX, globalY) => {
    const {elementBorderMoving, prevMousePosition, elementIdChanging } = this.state;
      const { elements, dispatch } = this.props;

      let offset = [globalX-prevMousePosition[0], globalY-prevMousePosition[1]];
      const element = elements.find(x => x.id === elementIdChanging);
      const coords = element.coords;
      let newCoords;
      switch(elementBorderMoving) {
        case 'left-border': {
          const new_x1y1 = [coords.x1y1[0]+offset[0], coords.x1y1[1]];
          newCoords = {...coords, x1y1: new_x1y1};
        }
        break;
        case 'right-border': {
          const new_x2y2 = [coords.x2y2[0]+offset[0], coords.x2y2[1]];
          newCoords = {...coords, x2y2: new_x2y2};
        }
        break;
        case 'top-border': {
          const new_x1y1 = [coords.x1y1[0], coords.x1y1[1]+offset[1]];
          newCoords = {...coords, x1y1: new_x1y1};
        }
        break;
        case 'bottom-border': {
            const new_x2y2 = [coords.x2y2[0], coords.x2y2[1]+offset[1]];
            newCoords = {...coords, x2y2: new_x2y2};
          }
          break;
        }
        
        if(this.getElementWidth(newCoords) <= 40 || this.getElementHeight(newCoords) <= 40) {
        newCoords = {...coords};
      }
      dispatch(updateElement({...element, id: elementIdChanging, coords: newCoords}))
      this.setState({
        prevMousePosition: [globalX, globalY]
      })
  }
  mouseMoveElement = (globalX, globalY) => {
    const { prevMousePosition, elementIdChanging } = this.state;
    const { elements, dispatch } = this.props;
    const element = elements.find(x => x.id === elementIdChanging);
    const coords = element.coords;
    const offset = [globalX-prevMousePosition[0], globalY-prevMousePosition[1]];
    const newCoords = {
      x1y1: [coords.x1y1[0]+offset[0], coords.x1y1[1]+offset[1]],
      x2y2: [coords.x2y2[0]+offset[0], coords.x2y2[1]+offset[1]],
    };
    dispatch(updateElement({...element, id: elementIdChanging, coords: newCoords}))
    this.setState({
      prevMousePosition: [globalX, globalY],
    })
  }
  mouseMoveCreatingElement = (canvasX, canvasY) => {
    const { elements, dispatch } = this.props;
    const element = {...elements[elements.length-1]};
    const coords = element.coords;
    coords.x2y2 = [canvasX, canvasY];
    dispatch(updateElement(element));

  }

  onMouseMove = (e) => {
    const { isElementMoving, isElementBorderMoving, isCreatingElement } = this.state;
    const [globalX, globalY] = this.getGlobalCoords(e);
    if(isElementBorderMoving) {
      this.mouseMoveBorderOfElement(globalX, globalY);
    }
    else if (isElementMoving) {
      this.mouseMoveElement(globalX, globalY);
    }
    else if (isCreatingElement) {
      const { elements, dispatch } = this.props;
      const element = {...elements[elements.length-1]};
      const [canvasX, canvasY] = this.getCanvasCoords(e);
      this.mouseMoveCreatingElement(canvasX, canvasY);
    }
  }
  onMouseDownSticker = (e, id) => {
    this.props.dispatch(selectSticker(id));
    const { elements } = this.props;
    const prevCoords = elements.find(x => x.id === id).coords;
    this.setState({
      elementIdChanging: id,
      isElementMoving: true,
      prevElementCoords: prevCoords,
      prevMousePosition: this.getGlobalCoords(e)
    })
    e.stopPropagation();
  }
  
  onMouseDownBorder = (e, id, border) => {
    this.props.dispatch(selectSticker(id));
    this.setState({
      elementIdChanging: id,
      isElementBorderMoving: true,
      elementBorderMoving: border,
      prevMousePosition : this.getGlobalCoords(e),
    })
    e.stopPropagation();
  }
  onMouseUp = () => {
    const { isElementMoving, isElementBorderMoving, isCreatingElement, elementIdChanging, prevElementCoords } = this.state;
    const { elements, dispatch } = this.props;
    const element = elements.find(x => x.id === elementIdChanging);
    if(isElementBorderMoving) {
      const coords = element.coords;
      let newCoords = this.snapCoordinates(coords);
      if(newCoords.x1y1[0] < 20 ||
          newCoords.x1y1[1] < 20 ||
          newCoords.x2y2[0] > 780) {
              newCoords = prevElementCoords;
      }
      dispatch(updateElement({...element, id: elementIdChanging, coords: newCoords}));
      this.setState({
        isElementMoving: false,
        isElementBorderMoving: false,
      })
    }
    else if (isElementMoving) {
      const coords = element.coords;
      let newCoords;
      if(coords.x1y1[0] < 20 ||
        coords.x1y1[1] < 20 ||
        coords.x2y2[0] > 780) {
        newCoords = prevElementCoords;
      }
      else {
        newCoords = this.snapCoordinates(coords);
      }
      dispatch(updateElement({...element, id: elementIdChanging, coords: newCoords}));
      this.setState({
        isElementBorderMoving: false,
        isElementMoving: false,
        isCreatingElement: false,
      })
    }
    else if (isCreatingElement) {
      
      const element = {...elements[elements.length-1]};
      if(!this.isValidElement(element)) {
        dispatch(deleteElement(element.id));
      }
      else {
        element.coords = this.snapCoordinates(element.coords);
        dispatch(updateElement(element));
        
      }
      this.setState({
        isCreatingElement: false,
      })
    }  
  }
  isValidElement = (element) => {
    const { x1y1, x2y2 } = element.coords;
    return x1y1[1]-x2y2[1]<=0 && x1y1[0]-x2y2[0]<=0 && Math.pow(x1y1[0]-x2y2[0], 2) >= 1600 && Math.pow(x1y1[1]-x2y2[1], 2) >= 1600; 
  }
  getGlobalCoords = (e) => {
    return [e.clientX, e.clientY]
  }
  
  getCanvasCoords = (e) => {
    const { canvasRect } = this.props;
    const rect = canvasRect;
    return [e.clientX - rect.left, e.clientY - rect.top]
  }
}
const mapStateToProps = ({ elements, selectedStickerId, canvasRect }) => {
  return {
    elements,
    selectedStickerId,
    canvasRect
  }
}

export default connect(mapStateToProps)(Canvas);