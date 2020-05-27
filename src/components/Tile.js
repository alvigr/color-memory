import React from 'react';
import './Tile.css';

const Tile = ({ tile, onTileClick, i }) => {
  const { color, paired } = tile || {};
  const frontSide = paired ? '#c4c4c4' : '#e0e0e0';
  return (
    <>
    <div className="scene scene--tile">
      <div
        className={`tile ${tile.isOpen && 'is-flipped'}`}
        onClick={paired ? () => false : () => onTileClick(i)}
      >
        <div
          style={{ backgroundColor: frontSide }} 
          className="tile_face" 
        />
        <div
          style={{ backgroundColor: color }}
          className="tile_face tile_face--back"
        />
      </div>
    </div>
    </>
  );
};

export default Tile;
