import React from 'react';

import './sticker.scss';

export default class Sticker extends React.Component {


  
  colors = [
    '#8CAAFF',
    '#E5B5FF',
    '#FFBDC6',
    '#F7FFBD'
  ];
  constructor(props) {
    super(props);

    this.state = {
      color: this.colors[Math.floor(Math.random() * 4)]
    }
  }

  render() {
    const {id, coords} = this.props.element;
    const element = this.props.element;
    const listOfBorders = [
        this.getBorderJSX(element, 'left-border', 0),
        this.getBorderJSX(element, 'right-border', 1),
        this.getBorderJSX(element, 'top-border', 2),
        this.getBorderJSX(element, 'bottom-border', 3),
    ];
    const style = this.setCoordinates(coords);
    style.backgroundColor = this.state.color;
    return (
        <div className="sticker" 
            style={style}
            onMouseDown={(e) => this.props.onMouseDownSticker(e, id)}
        >
            {this.props.children}

            {listOfBorders}


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