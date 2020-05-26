export const openTile = index => (
  {
    type: 'OPEN_TILE',
    index,
  }
);

export const reset = numOfTiles => (
  {
    type: 'RESET',
    numOfTiles,
  }
);

export const checkPair = indexes => (
  {
    type: 'CHECK_PAIR',
    indexes,
  }
);
