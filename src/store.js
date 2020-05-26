import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import { checkPair } from './actions';

export const pairChecker = store => next => action => {
  const tiles = store.getState();

  if (action.type === 'OPEN_TILE') {
    if (tiles.filter(t => t.isOpen).length === 2) return

    const firstTile = tiles.findIndex(tile => tile.isOpen);

    if (firstTile !== -1 && firstTile !== action.index) {
      store.dispatch(checkPair([firstTile, action.index]));
    }

    return next(action);
  }

  if (action.type === 'CHECK_PAIR') {
    const timeoutId = setTimeout(
      () => next(action),
      1000
    );
    return function cancel() {
      clearTimeout(timeoutId);
    }
  }

  return next(action);
};


const store = createStore(
  reducer,
  applyMiddleware(pairChecker)
);

export default store;
