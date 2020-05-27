import React from 'react';
import Tile from './Tile';
import './Tiles.css';

const Tiles = ({ tiles, onTileClick }) => {
  const areaWidth = tiles.length === 16 ? '432px' : '648px';
  return (
    <div className="tiles-container">
      <div className="tiles-area" style={{ width: areaWidth }}> 
        {tiles.map((tile, i) => (
          <Tile
            key={`tile-${i}`}
            tile={tile}
            onTileClick={onTileClick}
            i={i}
          />
        ))}
      </div>
    </div>
  );
}

export default Tiles;
