import React from 'react';

import './sticker.scss';

export default class Sticker extends React.Component {

    

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="sticker" 
                style={this.setCoordinates(this.props.coords)}
                
                >
                <div className="border left-border" 
                        style={this.setBorder(this.props.coords, 'left-border')}
                        onMouseDown={(e) => this.props.onMouseDown(e, 'left-border')}
                        />
                <div className="border right-border" 
                        style={this.setBorder(this.props.coords, 'right-border')}
                        onMouseDown={(e) => this.props.onMouseDown(e, 'right-border')}
                        />
                <div className="border top-border" 
                    style={this.setBorder(this.props.coords, 'top-border')}
                    onMouseDown={(e) => this.props.onMouseDown(e, 'top-border')}

                        />
                <div className="border bottom-border" 
                    style={this.setBorder(this.props.coords, 'bottom-border')}
                    onMouseDown={(e) => this.props.onMouseDown(e, 'bottom-border')}
                        />

                
                {/* TO BE IMPLEMENTED */}
                {/* <div className="border bottom-border"/>
                <div className="border bottom-border"/>
                <div className="border bottom-border"/>
                <div className="border bottom-border"/> */}
                
            </div>
        )
    }
    
    
    setBorder = (coords, border) => {
        const width = coords.x2y1[0]-coords.x1y1[0];
        const height = coords.x1y2[1]-coords.x1y1[1];

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
            width: coords.x2y1[0]-coords.x1y1[0]+'px',
            height: coords.x1y2[1]-coords.x1y1[1]+'px',
        }
    }
}