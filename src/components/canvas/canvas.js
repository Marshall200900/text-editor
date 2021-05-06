import React, { createElement } from 'react';

import './canvas.scss';
import dotNet from '../../res/dot-net.png';

import Sticker from '../sticker';
export default class Canvas extends React.Component {


    static curId = 0;


    state = {
        elements: [
            {
                id: 0,
                coords: {
                    x1y1: [20, 20],
                    x2y1: [140, 20],
                    x1y2: [20, 140],
                    x2y2: [140, 140],
                },
            },
        ],
        elementIdChanging: null,
        borderMoving: null,

        isElementMoved: false,
        isElementChangingSize: false,
        
        prevPosition: [],
        prevCoords: null,
    }
    onCoordsChanged = (coords) => {
        this.setState({coords: coords});
    }


    render() {
        const {elements} = this.state;

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
                style={this.state.isElementChangingSize || this.state.isElementMoved ? { backgroundImage: `url(${dotNet})` } : {}}
            >
                {/* <img draggable="false" className="noselect" src={dotNet}/> */}
                {listOfElements}
                

            </div>
        )
    }
   
    onMouseMove = (e) => {
        const {
            elements, 
            isElementChangingSize, 
            isElementMoved, 
            prevPosition, 
            borderMoving, 
            elementIdChanging
        } = this.state;
        if(isElementChangingSize) {
            let offset = [e.clientX-prevPosition[0], e.clientY-prevPosition[1]];
            const coords = elements.find(x => x.id === elementIdChanging).coords;

            
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

            this.setState(() => {

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

                
                const newElements = [
                    ...elements.slice(0, elementIdChanging),
                    {id: elementIdChanging, coords: newCoords},
                    ...elements.slice(elementIdChanging+1),
                ];

                
                return {
                    elements: newElements
                }
                
            });
        }
        else if (isElementMoved) {
            const coords = elements.find(x => x.id === elementIdChanging).coords;

            let offset = [e.clientX-prevPosition[0], e.clientY-prevPosition[1]];
            this.setState({prevPosition: [e.clientX, e.clientY]});
            this.setState(() => {
                let newCoords = {
                    x1y1: [coords.x1y1[0]+offset[0], coords.x1y1[1]+offset[1]],
                    x1y2: [coords.x1y2[0]+offset[0], coords.x1y2[1]+offset[1]],
                    x2y1: [coords.x2y1[0]+offset[0], coords.x2y1[1]+offset[1]],
                    x2y2: [coords.x2y2[0]+offset[0], coords.x2y2[1]+offset[1]],
                };
                const newElements = [
                    ...elements.slice(0, elementIdChanging),
                    {id: elementIdChanging, coords: newCoords},
                    ...elements.slice(elementIdChanging+1),
                ];
                
                return {
                    elements: newElements,
                }
            });
        }

        
    }
    onMouseDownSticker = (e, id) => {
        this.setState({
            isElementMoved: true, 
            prevCoords: this.state.coords,
            prevPosition: [e.clientX, e.clientY],
            elementIdChanging: id,
        });
        console.log('onMouseDownSticker');
    }
    
    onMouseDownBorder = (e, id, border) => {
        
        this.setState({
            elementIdChanging: id,
            isElementChangingSize: true,
            prevPosition: [e.clientX, e.clientY],
            borderMoving: border,

        });
        console.log('onMouseDownBorder');
        e.stopPropagation();

    }
    onMouseUp = () => {
        
        if(this.state.isElementMoved){

            this.setState(({elements, elementIdChanging}) => {
                const coords = elements.find(x => x.id === elementIdChanging).coords;

                let newCoords = {};
                newCoords.x1y1 = [coords.x1y1[0] - coords.x1y1[0] % 40 + 20, coords.x1y1[1] - coords.x1y1[1] % 40 + 20];
                newCoords.x1y2 = [coords.x1y2[0] - coords.x1y2[0] % 40 + 20, coords.x1y2[1] - coords.x1y2[1] % 40 + 20];
                newCoords.x2y1 = [coords.x2y1[0] - coords.x2y1[0] % 40 + 20, coords.x2y1[1] - coords.x2y1[1] % 40 + 20];
                newCoords.x2y2 = [coords.x2y2[0] - coords.x2y2[0] % 40 + 20, coords.x2y2[1] - coords.x2y2[1] % 40 + 20];
                
                
                const newElements = [
                    ...elements.slice(0, elementIdChanging),
                    {id: elementIdChanging, coords: newCoords},
                    ...elements.slice(elementIdChanging+1),
                ];
                
                return {
                    elements: newElements,
                    
                }
            });
        }
        this.setState({
            isElementMoved: false,
            isElementChangingSize: false,
        });
    }

}