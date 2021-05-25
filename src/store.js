import { createStore, applyMiddleware } from "redux";
import reducer from './reducers';



const logger = store => next => action => {
  console.log(`dispatching action: ${action.type}`);
  const res = next(action);
  // console.log(`now state is ${JSON.stringify(store.getState())}`);
  return res;
}

const store = createStore(reducer, applyMiddleware(logger));

export default store;