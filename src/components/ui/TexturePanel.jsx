import React, { useState } from 'react';
import { FLOOR_TEXTURES, WALL_TEXTURES } from '../../constants/textures.js';

export const TexturePanel = ({ onFloorChange, onWallChange, currentFloor, currentWall }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = window.innerWidth <= 768;

  return (
    <div style={{
      position: 'absolute',
      top: isMobile ? '10px' : '60px',
      left: '10px',
      background: 'rgba(0,0,0,0.8)',
      padding: '10px',
      borderRadius: '4px',
      zIndex: 1000,
      color: 'white',
      minWidth: isMobile ? '280px' : '200px',
      maxWidth: isMobile ? '90vw' : '300px'
    }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: '#666',
          color: 'white',
          border: 'none',
          padding: '8px 12px',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '10px',
          fontSize: isMobile ? '16px' : '14px',
          width: '100%'
        }}
      >
        {isOpen ? 'Hide' : 'Show'} Textures
      </button>

      {isOpen && (
        <div>
          <div style={{ marginBottom: '15px' }}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: isMobile ? '16px' : '14px' }}>Floor Texture:</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {FLOOR_TEXTURES.map((texture, index) => (
                <button
                  key={index}
                  onClick={() => onFloorChange(texture)}
                  style={{
                    background: `#${texture.color.toString(16).padStart(6, '0')}`,
                    border: currentFloor === index ? '2px solid #4CAF50' : '1px solid #ccc',
                    width: isMobile ? '40px' : '30px',
                    height: isMobile ? '40px' : '30px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '8px',
                    padding: '2px',
                    minWidth: isMobile ? '40px' : '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  title={texture.name}
                />
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ margin: '0 0 8px 0', fontSize: isMobile ? '16px' : '14px' }}>Wall Texture:</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {WALL_TEXTURES.map((texture, index) => (
                <button
                  key={index}
                  onClick={() => onWallChange(texture)}
                  style={{
                    background: `#${texture.color.toString(16).padStart(6, '0')}`,
                    border: currentWall === index ? '2px solid #4CAF50' : '1px solid #ccc',
                    width: isMobile ? '40px' : '30px',
                    height: isMobile ? '40px' : '30px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '8px',
                    padding: '2px',
                    minWidth: isMobile ? '40px' : '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  title={texture.name}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
