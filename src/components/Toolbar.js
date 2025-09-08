import React from 'react';
import './Toolbar.css';

const Toolbar = ({ onUndo, onRedo, onClear, onSave, canUndo, canRedo }) => {
  return (
    <div className="toolbar">
      <div className="toolbar-group">
        <button 
          className={`toolbar-button ${!canUndo ? 'disabled' : ''}`}
          onClick={onUndo}
          disabled={!canUndo}
          title="Undo (Ctrl+Z)"
        >
          ↶ Undo
        </button>
        <button 
          className={`toolbar-button ${!canRedo ? 'disabled' : ''}`}
          onClick={onRedo}
          disabled={!canRedo}
          title="Redo (Ctrl+Y)"
        >
          ↷ Redo
        </button>
      </div>
      
      <div className="toolbar-group">
        <button 
          className="toolbar-button"
          onClick={onClear}
          title="Clear Canvas"
        >
          🗑️ Clear
        </button>
      </div>
      
      <div className="toolbar-group">
        <button 
          className="toolbar-button primary"
          onClick={onSave}
          title="Save Design as PNG"
        >
          💾 Save
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
