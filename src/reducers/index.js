const initialState = {
  currentId: 1,
  elements : [
    {
      type: 'kanban',
      elementState: {
        kanbanData: [
          {
            id: 0,
            status: 'not started',
            text: 'do chores'
          },
          {
            id: 1,
            status: 'in progress',
            text: 'make a sandwitch'
          },
          {
            id: 2,
            status: 'done',
            text: 'have a shower'
          },
          {
            id: 3,
            status: 'in progress',
            text: 'buy milk'
          },
        ]
      },
      id: 0,
      coords: {
        x1y1: [20, 20],
        x2y2: [500, 200],
      }
    },
  ],
}


const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'READ_STATE_FROM_FILE':
      console.log(action.payload.data)
      return action.payload.data;      
    case 'CREATE_ELEMENT': {
      const { elements, currentId } = state;
      const { newElement } = action.payload;
      newElement.id = currentId;
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
      const { elements } = this.state;
      const { newElement } = action.payload;
      const newElements = [
        ...elements.slice(0, newElement.id),
        ...elements.slice(newElement.id+1),
      ];
      return {
        ...state,
        elements: newElements
      }
    }
    case 'UPDATE_ELEMENT': {
      const { elements } = state;
      const { newElement } = action.payload;
      const newElements = [
        ...elements.slice(0, newElement.id),
        newElement,
        ...elements.slice(newElement.id+1),
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