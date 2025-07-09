import React, { useState } from 'react';
import { ROOM_DEFAULTS } from '../../constants/dimensions.js';
import { isMobile } from '../../utils/helpers.js';

export const RoomSizePanel = ({
  onRoomSizeChange,
  roomWidth,
  roomHeight,
  showGrid,
  onToggleGrid,
  onConstrainObjects,
  wallCullingEnabled = true,
  onToggleWallCulling
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempWidth, setTempWidth] = useState(roomWidth);
  const [tempHeight, setTempHeight] = useState(roomHeight);

  const handleApply = () => {
    onRoomSizeChange(tempWidth, tempHeight);
  };

  const handleReset = () => {
    setTempWidth(ROOM_DEFAULTS.WIDTH);
    setTempHeight(ROOM_DEFAULTS.HEIGHT);
    onRoomSizeChange(ROOM_DEFAULTS.WIDTH, ROOM_DEFAULTS.HEIGHT);
  };

  const mobile = isMobile();

  return (
    <div style={{
      position: 'absolute',
      top: mobile ? '10px' : '60px',
      right: '10px',
      background: 'rgba(0,0,0,0.8)',
      padding: '10px',
      borderRadius: '4px',
      zIndex: 1000,
      color: 'white',
      minWidth: mobile ? '200px' : '180px'
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
          fontSize: mobile ? '16px' : '14px',
          width: '100%'
        }}
      >
        {isOpen ? 'Hide' : 'Show'} Room Size
      </button>

      {isOpen && (
        <div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px' }}>
              Width: {tempWidth}m
            </label>
            <input
              type="range"
              min={ROOM_DEFAULTS.MIN_SIZE}
              max={ROOM_DEFAULTS.MAX_SIZE}
              step={ROOM_DEFAULTS.STEP}
              value={tempWidth}
              onChange={(e) => setTempWidth(parseFloat(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px' }}>
              Height: {tempHeight}m
            </label>
            <input
              type="range"
              min={ROOM_DEFAULTS.MIN_SIZE}
              max={ROOM_DEFAULTS.MAX_SIZE}
              step={ROOM_DEFAULTS.STEP}
              value={tempHeight}
              onChange={(e) => setTempHeight(parseFloat(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
            <button
              onClick={handleApply}
              style={{
                flex: 1,
                background: '#4CAF50',
                color: 'white',
                border: 'none',
                padding: '6px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              Apply
            </button>
            <button
              onClick={handleReset}
              style={{
                flex: 1,
                background: '#f44336',
                color: 'white',
                border: 'none',
                padding: '6px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              Reset
            </button>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <button
              onClick={onConstrainObjects}
              style={{
                width: '100%',
                background: '#FF9800',
                color: 'white',
                border: 'none',
                padding: '6px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              Fix Objects in Room
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <input
              type="checkbox"
              id="showGrid"
              checked={showGrid}
              onChange={(e) => onToggleGrid(e.target.checked)}
              style={{ margin: 0 }}
            />
            <label htmlFor="showGrid" style={{ fontSize: '12px', cursor: 'pointer' }}>
              Show Grid
            </label>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              id="wallCulling"
              checked={wallCullingEnabled}
              onChange={(e) => onToggleWallCulling && onToggleWallCulling(e.target.checked)}
              style={{ margin: 0 }}
            />
            <label htmlFor="wallCulling" style={{ fontSize: '12px', cursor: 'pointer' }}>
              Smart Wall Hiding
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
