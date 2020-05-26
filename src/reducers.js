import rcolor from 'rcolor';
import shuffle from 'lodash.shuffle';
import uniqby from 'lodash.uniqby';

const openTile = (state, action) => {
  return state.map((tile, index) => {
    if (index === action.index) {
      return {
        ...tile,
        isOpen: true,
      };
    }
    return tile;
  });
};

const checkPair = (state, action) => {
  const paired =
    state[action.indexes[0]].color === state[action.indexes[1]].color;
  return state.map((tile, index) => {
    if (action.indexes.includes(index)) {
      return {
        ...tile,
        isOpen: false,
        paired,
      };
    }
    return tile;
  });
};

const reset = (state, action) => {
  const numOfTiles = action.numOfTiles;
  let tiles = [];
  while (tiles.length < numOfTiles / 2) {
    for (let i = numOfTiles / 2; i > 0; i--) {
      tiles.push(
        {
          isOpen: false,
          color: rcolor(),
          paired: false,
        },
      );
    }
    tiles = uniqby(tiles, 'color'); 
  }
  tiles = tiles.concat(tiles);
  return shuffle(tiles);
};

const tiles = (state = [], action) => {
  switch (action.type) {
    case 'OPEN_TILE':
      return openTile(state, action);
    case 'CHECK_PAIR':
      return checkPair(state, action);
    case 'RESET':
      return reset(state, action);
    default:
      return state; 
  }
};

export default tiles;
