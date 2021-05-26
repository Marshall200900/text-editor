//change args to ...args

const mouseDownSticker = (globalX, globalY, elementId) => {
  return {
    type: 'MOUSE_DOWN_STICKER',
    payload: {
      globalX,
      globalY,
      elementId
    }
  }
}

const mouseDownElementBorder = (globalX, globalY, elementId, borderName) => {
  return {
    type: 'MOUSE_DOWN_ELEMENT_BORDER',
    payload: {
      globalX,
      globalY,
      elementId, 
      borderName
    }
  }
}

const mouseMoveElement = (globalX, globalY) => {
  return {
    type: 'MOUSE_MOVE_ELEMENT',
    payload: {
      globalX,
      globalY
    }
  }
}

const mouseMoveBorderOfElement = (globalX, globalY) => {
  return {
    type: 'MOUSE_MOVE_BORDER_OF_ELEMENT',
    payload: {
      globalX,
      globalY
    }
  }
}

const mouseUp = () => {
  return {
    type: 'MOUSE_UP'
  }
}
const mouseDownCanvas = (canvasX, canvasY) => {
  return {
    type: 'MOUSE_DOWN_CANVAS',
    payload: {canvasX, canvasY}
  }
}
const mouseMoveCreatingElement = (canvasX, canvasY) => {
  return {
    type: 'MOUSE_MOVE_CREATING_ELEMENT',
    payload: {canvasX, canvasY}
  }
}

export {
  mouseDownCanvas,
  mouseDownSticker,
  mouseDownElementBorder,
  mouseMoveBorderOfElement,
  mouseUp,
  mouseMoveElement,
  mouseMoveCreatingElement,
}