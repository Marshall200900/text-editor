//change args to ...args

const updateCanvasRect = (canvasRect) => {
  return {
    type: 'SET_CANVAS_RECT',
    payload: { canvasRect }
  }
}
const setCanvasRef = (canvasRef) => {
  return {
    type: 'SET_CANVAS_REF',
    payload: { canvasRef }
  }
}

const createElement = (newElement) => {
  return {
    type: 'CREATE_ELEMENT',
    payload: { newElement }
  }
}
const updateElement = (newElement) => {
  return {
    type: 'UPDATE_ELEMENT',
    payload: {
      newElement,
    }
  }
}
const deleteElement = (elementId) => {
  return {
    type: 'DELETE_ELEMENT',
    payload: {
      elementId
    }
  }
}
const readStateFromFile = (data) => {
  return {
    type: 'READ_STATE_FROM_FILE',
    payload: {data}
  }
}
const switchTool = (currentTool) => {
  return {
    type: 'SWITCH_TOOL',
    payload: { currentTool }
  }
}
const switchPanel = (openedPanel) => {
  return {
    type: 'SWITCH_PANEL',
    payload: {
      openedPanel
    }
  }
}
const selectSticker = (stickerId) => {
  return {
    type: 'SELECT_STICKER',
    payload: {
      stickerId
    }
  }
}

export {
  setCanvasRef,
  updateCanvasRect,
  selectSticker,
  switchPanel,
  switchTool,
  createElement,
  updateElement,
  deleteElement,
  readStateFromFile
}