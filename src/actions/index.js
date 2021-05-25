//change args to ...args

const mouseDownSticker = (event, elementId) => {
  return {
    type: 'MOUSE_DOWN_STICKER',
    payload: {
      event, elementId
    }
  }
}

const mouseDownElementBorder = (event, elementId, borderName) => {
  return {
    type: 'MOUSE_DOWN_ELEMENT_BORDER',
    payload: {
      event, elementId, borderName
    }
  }
}

const mouseMoveElement = (event) => {
  return {
    type: 'MOUSE_MOVE_ELEMENT',
    payload: {
      event
    }
  }
}

const mouseMoveBorderOfElement = (event) => {
  return {
    type: 'MOUSE_MOVE_BORDER_OF_ELEMENT',
    payload: {
      event
    }
  }
}

const mouseUp = () => {
  return {
    type: 'MOUSE_UP'
  }
}
const mouseDownCanvas = (x, y) => {
  return {
    type: 'MOUSE_DOWN_CANVAS',
    payload: {x, y}
  }
}
const mouseMoveCreatingElement = (x, y) => {
  return {
    type: 'MOUSE_MOVE_CREATING_ELEMENT',
    payload: {
      x, y
    }
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