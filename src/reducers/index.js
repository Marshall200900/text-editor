const initialState = {
  currentTool: 'text',
  currentId: 0,
  elements : [
    
  ],
  openedPanel: null,
  selectedStickerId: null,
}



const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_CANVAS_REF': {
      return {
        ...state,
        canvasRef: action.payload.canvasRef
      }
    }
    case 'SET_CANVAS_RECT': {
      return {
        ...state,
        canvasRect: action.payload.canvasRect
      }
    }
    case 'SELECT_STICKER': {
      return {
        ...state,
        selectedStickerId: action.payload.stickerId,
      }
    }
    case 'SWITCH_PANEL': {
      return {
        ...state,
        openedPanel: action.payload.openedPanel
      }
    }
    case 'SWITCH_TOOL': {
      return {
        ...state,
        currentTool: action.payload.currentTool
      }
    }
    case 'READ_STATE_FROM_FILE':
      return action.payload.data;
    case 'CREATE_ELEMENT': {
      const { elements, currentId, currentTool } = state;
      const newElement = {...action.payload.newElement, type: currentTool, id: currentId, elementState: {}}
      const newElements = [
        ...elements, newElement
      ];
      return {
        ...state,
        elements: newElements,
        currentId: currentId + 1,
      }
    }
    case 'DELETE_ELEMENT': {
      const { elements } = state;
      const { elementId } = action.payload;
      const id = elements.findIndex(el => el.id === elementId)
      const newElements = [
        ...elements.slice(0, id),
        ...elements.slice(id+1),
      ];
      console.log(newElements);
      return {
        ...state,
        elements: newElements
      }
    }
    case 'UPDATE_ELEMENT': {
      const { elements } = state;
      const { newElement } = action.payload;
      const id = elements.findIndex(el => el.id === newElement.id)

      const newElements = [
        ...elements.slice(0, id),
        newElement,
        ...elements.slice(id+1),
      ];
      return {
        ...state,
        elements: newElements
      }
    }
    default: return state;
  }
}


export default reducer;