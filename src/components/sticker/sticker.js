import React from 'react';
import OnForeground from '../../res/icons/ic24-redo.png';
import Color from '../../res/icons/ic24-opacity.png';
import Delete from '../../res/icons/ic24-delete.png';
import './sticker.scss';
import { connect } from 'react-redux';
import { deleteElement, stickerOnForeground, updateElement } from '../../actions';

class Sticker extends React.Component {
  colors = [
    '#8CAAFF',
    '#E5B5FF',
    '#FFBDC6',
    '#F7FFBD'
  ];
  constructor(props) {
    super(props);

    this.state = {
      isPalleteOpened: false,
    }
  }
  changeColor = (color) => {
    const { dispatch, element } = this.props;
    const newElement = {...element, color: color}
    dispatch(updateElement(newElement));
    this.palleteOpened(false)
  }
  render() {
    const { element, selected, dispatch } = this.props;
    const {id, coords} = element;
    const listOfBorders = [
        this.getBorderJSX(element, 'left-border', 0),
        this.getBorderJSX(element, 'right-border', 1),
        this.getBorderJSX(element, 'top-border', 2),
        this.getBorderJSX(element, 'bottom-border', 3),
    ];
    const style = this.setCoordinates(coords);
    style.backgroundColor = element.color;
    const { colors, changeColor } = this;
    return (
        <div className={`sticker ${selected ? 'selected': ''}`} 
            style={style}
            onMouseDown={(e) => this.props.onMouseDownSticker(e, id)}
        >
            {this.props.children}
            
            <div className={`pallete ${this.state.isPalleteOpened ? 'opened': ''}`}>
              <div className="color" onClick={() => changeColor(colors[0])} style={{backgroundColor: colors[0]}}></div>
              <div className="color" onClick={() => changeColor(colors[1])} style={{backgroundColor: colors[1]}}></div>
              <div className="color" onClick={() => changeColor(colors[2])} style={{backgroundColor: colors[2]}}></div>
              <div className="color" onClick={() => changeColor(colors[3])} style={{backgroundColor: colors[3]}}></div>
            </div>
            {listOfBorders}
            {selected ? <div className="sticker-settings">
              <div className="setting" onClick={() => dispatch(stickerOnForeground(id))}><img src={OnForeground}/></div>
              <div className="setting" onClick={() => this.palleteOpened(!this.state.isPalleteOpened)}><img src={Color}/></div>
              <div className="setting" onClick={() => dispatch(deleteElement(id))}><img src={Delete}/></div>
            </div> : null}
            
            {/* TO BE IMPLEMENTED */}
            {/* <div className="border bottom-border"/>
            <div className="border bottom-border"/>
            <div className="border bottom-border"/>
            <div className="border bottom-border"/> */}
            
        </div>
    )
  }
  getBorderJSX = (element, side, keyProp) => {
      const {coords, id} = element;

      return (
          <div className={`sticker-border ${side}`}
              key={keyProp}
              style={this.setBorderParams(coords, side)}
              onMouseDown={(e) => this.props.onMouseDownBorder(e, id, side)}
          />
      )
  }
  palleteOpened = (opened) => {
    this.setState({isPalleteOpened: opened});
  }


  setBorderParams = (coords, border) => {
      const width = coords.x2y2[0]-coords.x1y1[0];
      const height = coords.x2y2[1]-coords.x1y1[1];

      let out = null;
      switch(border) {
          case 'left-border':{
              out = {
                  height: height+'px',
              }
          }
          break;
          case 'right-border':{
              out = {
                  top: -height+'px',
                  right: -width+3+'px',
                  height: height+'px',
              }
          }
          break;
          case 'top-border':{
              out = {
                  top: -2*height-3+'px',
                  width: width+'px',
              }
          }
          break;
          case 'bottom-border':{
              out = {
                  top: -height-3-6+'px',
                  width: width+'px',
              }
          }
          break;

          default: null;
          break;
      }
      return out;
  }

  //set x, y, width and height by given coords
  setCoordinates = (coords) => {
      return {
          top: coords.x1y1[1]+'px',
          left: coords.x1y1[0]+'px',
          width: coords.x2y2[0]-coords.x1y1[0]+'px',
          height: coords.x2y2[1]-coords.x1y1[1]+'px',
      }
  }
}

export default connect()(Sticker);