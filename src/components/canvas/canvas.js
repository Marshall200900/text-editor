import React from 'react';

import './canvas.scss';
import dotNet from '../../res/dot-net.png';

import Sticker from '../sticker';
import { Resizable } from 're-resizable';

export default class Canvas extends React.Component {

    state = {
        coords: {
            x1y1: [20, 20],
            x2y1: [140, 20],
            x1y2: [20, 140],
            x2y2: [140, 140],
        },

        borderMoving: null,
        isElementMoved: false,
        prevPosition: [],
    }
    onCoordsChanged = (coords) => {
        this.setState({coords: coords});
    }


    render() {
        return(
            <div className='canvas'
                onMouseMove={this.onMouseMove}
                onMouseUp={this.onMouseUp}
                style={{ backgroundImage: `url(${dotNet})` }}
            >
                {/* <img draggable="false" className="noselect" src={dotNet}/> */}
                <Sticker coords={this.state.coords} onMouseDown={this.onMouseDown}/>
                

            </div>
        )
    }
   
    onMouseMove = (e) => {
        const {isElementMoved, prevPosition, borderMoving} = this.state;
        
        if(isElementMoved) {
            let offset = [e.clientX-prevPosition[0], e.clientY-prevPosition[1]];
            
            
            if(Math.abs(offset[1]) >= 40) {
                this.setState({prevPosition: [e.clientX, e.clientY]});
                offset[1] = offset[1] > 0 ? 40 : -40;

            }
            else {
                offset[1] = 0;
            }
            if(Math.abs(offset[0]) >= 40) {
                this.setState({prevPosition: [e.clientX, e.clientY]});
                offset[0] = offset[0] > 0 ? 40 : -40;
            }
            else {
                offset[0] = 0;
            }

            this.setState(({coords}) => {
                let newCoords;
                //TODO simplify
                switch(borderMoving) {
                    case 'left-border': {

                        const new_x1y1 = [coords.x1y1[0]+offset[0], coords.x1y1[1]];
                        const new_x1y2 = [coords.x1y2[0]+offset[0], coords.x1y2[1]];
                        newCoords = {...coords, x1y1: new_x1y1, x1y2: new_x1y2};
                    }
                    break;
                    case 'right-border': {
                        const new_x2y1 = [coords.x2y1[0]+offset[0], coords.x2y1[1]];
                        const new_x2y2 = [coords.x2y2[0]+offset[0], coords.x2y2[1]];
                        newCoords = {...coords, x2y1: new_x2y1, x2y2: new_x2y2};
                    }
                    break;
                    case 'top-border': {
                        const new_x1y1 = [coords.x1y1[0], coords.x1y1[1]+offset[1]];
                        const new_x2y1 = [coords.x2y1[0], coords.x2y1[1]+offset[1]];
                        newCoords = {...coords, x1y1: new_x1y1, x2y1: new_x2y1};
                    }
                    break;
                    case 'bottom-border': {
                        const new_x1y2 = [coords.x1y2[0], coords.x1y2[1]+offset[1]];
                        const new_x2y2 = [coords.x2y2[0], coords.x2y2[1]+offset[1]];
                        newCoords = {...coords, x1y2: new_x1y2, x2y2: new_x2y2};
                    }
                    break;
                    default: null;
                    break;

                }

                


                
                return {
                    coords: newCoords
                }
                
            });
        }

        
    }
    onMouseDown = (e, border) => {
        //TODO simplify
        this.setState({isElementMoved: true});
        this.setState({prevPosition: [e.clientX, e.clientY]});
        this.setState({borderMoving: border});

    }
    onMouseUp = () => {
        this.setState({isElementMoved: false});
    }

}