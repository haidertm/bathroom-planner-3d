import React from 'react';
import { isMobile } from '../../utils/helpers.js';

export const UndoRedoPanel = ({ onUndo, onRedo, canUndo, canRedo }) => {
  const mobile = isMobile();

  return (
    <div style={{
      position: 'absolute',
      bottom: mobile ? '80px' : '60px',
      right: '10px',
      display: 'flex',
      gap: '5px',
      zIndex: 1000
    }}>
      <button
        onClick={onUndo}
        disabled={!canUndo}
        style={{
          background: canUndo ? '#2196F3' : '#666',
          color: 'white',
          border: 'none',
          padding: '8px 12px',
          borderRadius: '4px',
          cursor: canUndo ? 'pointer' : 'not-allowed',
          fontSize: '12px',
          opacity: canUndo ? 1 : 0.5
        }}
      >
        ↶ Undo
      </button>
      <button
        onClick={onRedo}
        disabled={!canRedo}
        style={{
          background: canRedo ? '#2196F3' : '#666',
          color: 'white',
          border: 'none',
          padding: '8px 12px',
          borderRadius: '4px',
          cursor: canRedo ? 'pointer' : 'not-allowed',
          fontSize: '12px',
          opacity: canRedo ? 1 : 0.5
        }}
      >
        ↷ Redo
      </button>
    </div>
  );
};
