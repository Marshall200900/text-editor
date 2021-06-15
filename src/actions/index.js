//change args to ...args

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
const deleteElement = (elementID) => {
  return {
    type: 'DELETE_ELEMENT',
    payload: {
      elementID
    }
  }
}
const readStateFromFile = (data) => {
  return {
    type: 'READ_STATE_FROM_FILE',
    payload: {data}
  }
}

export {
  createElement,
  updateElement,
  deleteElement,
  readStateFromFile
}