import React, { useState } from 'react';
import { COMPONENTS } from '../../constants/components.js';

export const Toolbar = ({ onAdd }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          padding: '10px',
          background: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          zIndex: 1001,
          display: window.innerWidth <= 768 ? 'block' : 'none'
        }}
      >
        ☰
      </button>

      {/* Desktop toolbar */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        padding: '10px',
        background: 'rgba(0,0,0,0.8)',
        zIndex: 1000,
        display: window.innerWidth > 768 ? 'flex' : 'none',
        gap: '10px',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        {COMPONENTS.map((type) => (
          <button
            key={type}
            onClick={() => onAdd(type)}
            style={{
              padding: '8px 16px',
              background: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              minWidth: '80px'
            }}
          >
            Add {type}
          </button>
        ))}
      </div>

      {/* Mobile dropdown menu */}
      {isExpanded && (
        <div style={{
          position: 'absolute',
          top: '50px',
          right: '10px',
          background: 'rgba(0,0,0,0.9)',
          padding: '10px',
          borderRadius: '4px',
          zIndex: 1001,
          display: window.innerWidth <= 768 ? 'block' : 'none',
          minWidth: '150px'
        }}>
          {COMPONENTS.map((type) => (
            <button
              key={type}
              onClick={() => {
                onAdd(type);
                setIsExpanded(false);
              }}
              style={{
                display: 'block',
                width: '100%',
                padding: '10px',
                margin: '2px 0',
                background: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Add {type}
            </button>
          ))}
        </div>
      )}
    </>
  );
};
