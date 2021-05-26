const initialState = {
  currentId: 1,
  elements : [
    {
      id: 0,
      coords: {
        x1y1: [20, 20],
        x2y2: [140, 140],
      }
    },
  ],
  prevMousePosition: null,
  prevElementCoords: null,
  elementBorderMoving: null,
  elementIdChanging: null,

  isElementBorderMoving: false,
  isElementMoving: false,
  isCreatingElement: false,
}

const getWidth = (p) => {
  return p.x2y2[0] - p.x1y1[0];
}
const getHeight = (p) => {
  return p.x2y2[1] - p.x1y1[1];
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'MOUSE_DOWN_STICKER': {
      const { globalX, globalY, elementId } = action.payload;
      console.log(action.payload)
      const { elements } = state;
      const prevCoords = elements.find(x => x.id === elementId).coords;
      return {
        ...state,
        elementIdChanging: elementId,
        isElementMoving: true,
        prevElementCoords: prevCoords,
        prevMousePosition: [globalX, globalY]
      }
    }
    case 'MOUSE_DOWN_ELEMENT_BORDER': {
      const {globalX, globalY, elementId, borderName} = action.payload;
      return {
        ...state,
        elementIdChanging: elementId,
        isElementBorderMoving: true,
        prevMousePosition : [globalX, globalY],
        elementBorderMoving: borderName,
      }
    }
    case 'MOUSE_MOVE_ELEMENT': {
      const { globalX, globalY } = action.payload;
      const { prevMousePosition, elementIdChanging, elements } = state;

      const coords = elements.find(x => x.id === elementIdChanging).coords;
      const offset = [globalX-prevMousePosition[0], globalY-prevMousePosition[1]];
      const newCoords = {
        x1y1: [coords.x1y1[0]+offset[0], coords.x1y1[1]+offset[1]],
        x2y2: [coords.x2y2[0]+offset[0], coords.x2y2[1]+offset[1]],
      };
      const newElements = [
        ...elements.slice(0, elementIdChanging),
        {id: elementIdChanging, coords: newCoords},
        ...elements.slice(elementIdChanging + 1),
      ];
    
      return {
        ...state, 
        prevMousePosition: [globalX, globalY],
        elements: newElements,
      }
    }
    case 'MOUSE_MOVE_CREATING_ELEMENT': {
      const { canvasX, canvasY } = action.payload;
      const { elements } = state;
      const element = {...elements[elements.length-1]};
      const coords = element.coords;
      coords.x2y2 = [canvasX, canvasY];
      return {
        ...state,
        elements: [...elements.slice(0, elements.length-1), element]
      }
    }
    case 'MOUSE_MOVE_BORDER_OF_ELEMENT': {
      const { globalX, globalY } = action.payload;
      const {elementBorderMoving, prevMousePosition, elementIdChanging, elements } = state;

      let offset = [globalX-prevMousePosition[0], globalY-prevMousePosition[1]];
      const coords = elements.find(x => x.id === elementIdChanging).coords;
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

      if(getWidth(newCoords) <= 40 || getHeight(newCoords) <= 40) {
        newCoords = {...coords};
      }


      const newElements = [
        ...elements.slice(0, elementIdChanging),
        {id: elementIdChanging, coords: newCoords},
        ...elements.slice(elementIdChanging+1),
      ];

      return {
        ...state,
        elements: newElements,
        prevMousePosition: [globalX, globalY],
      }

    }
    case 'MOUSE_UP': {
      const {
        isCreatingElement,
        isElementMoving, 
        isElementBorderMoving, 
        elements, 
        elementIdChanging, 
        prevElementCoords 
      } = state;
      if(isElementMoving){
        const coords = elements.find(x => x.id === elementIdChanging).coords;
        let newCoords = {};
        newCoords.x1y1 = [coords.x1y1[0] - coords.x1y1[0] % 40 + 20, coords.x1y1[1] - coords.x1y1[1] % 40 + 20];
        newCoords.x2y2 = [coords.x2y2[0] - coords.x2y2[0] % 40 + 20, coords.x2y2[1] - coords.x2y2[1] % 40 + 20];
        
        if(
            newCoords.x1y1[0] < 20 ||
            newCoords.x1y1[1] < 20 ||
            newCoords.x2y2[0] > 780
            )
            {
                newCoords = prevElementCoords;
            }
            
        const newElements = [
            ...elements.slice(0, elementIdChanging),
            {id: elementIdChanging, coords: newCoords},
            ...elements.slice(elementIdChanging + 1),
        ];
        return {
          ...state,
            elements: newElements,
            isElementMoving: false,
        }

      }
      else if (isElementBorderMoving) {
        const coords = elements.find(x => x.id === elementIdChanging).coords;
        let newCoords = {};
        newCoords.x1y1 = [coords.x1y1[0] - coords.x1y1[0] % 40 + 20, coords.x1y1[1] - coords.x1y1[1] % 40 + 20];
        newCoords.x2y2 = [coords.x2y2[0] - coords.x2y2[0] % 40 + 20, coords.x2y2[1] - coords.x2y2[1] % 40 + 20];
        const newElements = [
          ...elements.slice(0, elementIdChanging),
          {id: elementIdChanging, coords: newCoords},
          ...elements.slice(elementIdChanging + 1),
        ];
        return {
          ...state,
          isElementBorderMoving: false,
          isCreatingElement: false,
          elements: newElements,

        }
      }
      else if(isCreatingElement) {
        
        const element = {...elements[elements.length-1]};
        const coords = element.coords;
        coords.x1y1 = [coords.x1y1[0] - coords.x1y1[0] % 40 + 20, coords.x1y1[1] - coords.x1y1[1] % 40 + 20];
        coords.x2y2 = [coords.x2y2[0] - coords.x2y2[0] % 40 + 20, coords.x2y2[1] - coords.x2y2[1] % 40 + 20];

        return {
          ...state,
          elements: [...elements.slice(0, elements.length-1), element],
          isCreatingElement: false,
        }
      }
      return state;
    }
    case 'MOUSE_DOWN_CANVAS': {
      const { elements, currentId } = state;
      const { canvasX, canvasY } = action.payload;
      const newElement = { 
        id: currentId,
        coords: {
          x1y1: [canvasX, canvasY],
          x2y2: [canvasX, canvasY],
        }
      }
      const newElements = [
        ...elements, newElement
      ];
      return {
        ...state,
        currentId: currentId + 1,
        elements: newElements,
        isCreatingElement: true,
        prevMousePosition: [canvasX, canvasY]
      }
    }

    default: return state;
  }

}


export default reducer;