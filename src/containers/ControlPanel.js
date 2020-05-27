import React from 'react';
import { connect } from 'react-redux';
import { reset } from '../actions';
import './ControlPanel.css';

const Control = ({ dispatch }) => {
  dispatch(reset(16));
  return (
    <div className="conttrol-panel">
      <button className="btn" onClick={() => dispatch(reset(16))}><span className="restart restart-4" /></button>
      <button className="btn" onClick={() => dispatch(reset(36))}><span className="restart restart-6" /></button>
    </div>
  );
}

const ControlPanel = connect()(Control);

export default ControlPanel;
