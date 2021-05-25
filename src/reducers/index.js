const initialState = {
  currentId: 1,
  elements : [
    {
      id: 0,
      coords: {
        x1y1: [20, 20],
        x2y1: [140, 20],
        x1y2: [20, 140],
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


const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'MOUSE_DOWN_STICKER': {
      const { event, elementId } = action.payload;
      const { elements } = state;
      const prevCoords = elements.find(x => x.id === elementId).coords;
      return {
        ...state,
        elementIdChanging: elementId,
        isElementMoving: true,
        prevElementCoords: prevCoords,
        prevMousePosition: [event.clientX, event.clientY]
      }
    }
    case 'MOUSE_DOWN_ELEMENT_BORDER': {
      const {event, elementId, borderName} = action.payload;
      return {
        ...state,
        elementIdChanging: elementId,
        isElementBorderMoving: true,
        prevMousePosition : [event.clientX, event.clientY],
        elementBorderMoving: borderName,
      }
    }
    case 'MOUSE_MOVE_ELEMENT': {
      const { event: e } = action.payload;
      const { prevMousePosition, elementIdChanging, elements } = state;

      const coords = elements.find(x => x.id === elementIdChanging).coords;
      const offset = [e.clientX-prevMousePosition[0], e.clientY-prevMousePosition[1]];
      const newCoords = {
        x1y1: [coords.x1y1[0]+offset[0], coords.x1y1[1]+offset[1]],
        x1y2: [coords.x1y2[0]+offset[0], coords.x1y2[1]+offset[1]],
        x2y1: [coords.x2y1[0]+offset[0], coords.x2y1[1]+offset[1]],
        x2y2: [coords.x2y2[0]+offset[0], coords.x2y2[1]+offset[1]],
      };
      const newElements = [
        ...elements.slice(0, elementIdChanging),
        {id: elementIdChanging, coords: newCoords},
        ...elements.slice(elementIdChanging + 1),
      ];
    
      return {
        ...state, 
        prevMousePosition: [e.clientX, e.clientY],
        elements: newElements,
      }
    }
    case 'MOUSE_MOVE_CREATING_ELEMENT': {
      const { x, y } = action.payload;
      const { elements, prevMousePosition } = state;
      
      const width = x - prevMousePosition[0]
      const height = y - prevMousePosition[1];
      const element = {...elements[elements.length-1]};
      
      let coords = element.coords;
      
      coords.x1y2 = [x - width, y];
      coords.x2y1 = [x, y - height];
      coords.x2y2 = [x, y];

      element.coords = coords;

      return {
        ...state,
        elements: [...elements.slice(0, elements.length-1), element]
      }
    }
    case 'MOUSE_MOVE_BORDER_OF_ELEMENT': {
      const { event: e } = action.payload;
      const {elementBorderMoving, prevMousePosition, elementIdChanging, elements } = state;
      let offset = [e.clientX-prevMousePosition[0], e.clientY-prevMousePosition[1]];
      const coords = elements.find(x => x.id === elementIdChanging).coords;
      let newCoords;
      switch(elementBorderMoving) {
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
      }
      const newElements = [
        ...elements.slice(0, elementIdChanging),
        {id: elementIdChanging, coords: newCoords},
        ...elements.slice(elementIdChanging+1),
      ];

      return {
        ...state,
        elements: newElements,
        prevMousePosition: [e.clientX, e.clientY],
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
        newCoords.x1y2 = [coords.x1y2[0] - coords.x1y2[0] % 40 + 20, coords.x1y2[1] - coords.x1y2[1] % 40 + 20];
        newCoords.x2y1 = [coords.x2y1[0] - coords.x2y1[0] % 40 + 20, coords.x2y1[1] - coords.x2y1[1] % 40 + 20];
        newCoords.x2y2 = [coords.x2y2[0] - coords.x2y2[0] % 40 + 20, coords.x2y2[1] - coords.x2y2[1] % 40 + 20];
        
        if(
            newCoords.x1y1[0] < 20 ||
            newCoords.x1y1[1] < 20 ||
            newCoords.x2y2[0] > 780 ||
            newCoords.x1y2[1] > 780 
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
        newCoords.x1y2 = [coords.x1y2[0] - coords.x1y2[0] % 40 + 20, coords.x1y2[1] - coords.x1y2[1] % 40 + 20];
        newCoords.x2y1 = [coords.x2y1[0] - coords.x2y1[0] % 40 + 20, coords.x2y1[1] - coords.x2y1[1] % 40 + 20];
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
        coords.x1y2 = [coords.x1y2[0] - coords.x1y2[0] % 40 + 20, coords.x1y2[1] - coords.x1y2[1] % 40 + 20];
        coords.x2y1 = [coords.x2y1[0] - coords.x2y1[0] % 40 + 20, coords.x2y1[1] - coords.x2y1[1] % 40 + 20];
        coords.x2y2 = [coords.x2y2[0] - coords.x2y2[0] % 40 + 20, coords.x2y2[1] - coords.x2y2[1] % 40 + 20];

        return {
          ...state,
          elements: [...elements.slice(0, elements.length-1), element],
          isCreatingElement: false,
        }
      }
      return state;
    }

    case 'UPDATE_COORDINATES': {
      const { offset } = action.payload;
      const { elementIdChanging } = state;
      const elementUpdating = elements.find(x => x.id === elementIdChanging)
      return {
        ...state, 
        elements: newElements
      }
    }
    case 'MOUSE_DOWN_CANVAS': {
      const { elements, currentId } = state;
      const { x, y } = action.payload;
      const newElement = { 
        id: currentId,
        coords: {
          x1y1: [x, y],
          x2y1: [x, y],
          x1y2: [x, y],
          x2y2: [x, y],
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
        prevMousePosition: [x, y]
      }
    }

    default: return state;
  }

}


export default reducer;