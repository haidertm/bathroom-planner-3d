import React, { useState, useEffect, useRef } from "react";

// Components
import { Toolbar } from "./components/ui/Toolbar.jsx";
import { TexturePanel } from "./components/ui/TexturePanel.jsx";
import { RoomSizePanel } from "./components/ui/RoomSizePanel.jsx";
import { UndoRedoPanel } from "./components/ui/UndoRedoPanel.jsx";

// Constants
import { ROOM_DEFAULTS } from "./constants/dimensions.js";
import { FLOOR_TEXTURES, WALL_TEXTURES } from "./constants/textures.js";
import { COMPONENT_DEFAULTS } from "./constants/components.js";

// Services
import { SceneManager } from "./services/sceneManager.js";
import { EventHandlers } from "./services/eventHandlers.js";

// Models
import { createModel } from "./models/bathroomFixtures.js";

// Utils
import { constrainAllObjectsToRoom } from "./utils/constraints.js";
import { isMobile } from "./utils/helpers.js";

// Hooks
import { useUndoRedo } from "./hooks/useUndoRedo.js";

export default function App() {
  const mountRef = useRef(null);
  const sceneManagerRef = useRef(null);
  const eventHandlersRef = useRef(null);
  const roomWidthRef = useRef(ROOM_DEFAULTS.WIDTH);
  const roomHeightRef = useRef(ROOM_DEFAULTS.HEIGHT);

  // State
  const [items, setItems] = useState([]);
  const [currentFloorTexture, setCurrentFloorTexture] = useState(0);
  const [currentWallTexture, setCurrentWallTexture] = useState(0);
  const [roomWidth, setRoomWidth] = useState(ROOM_DEFAULTS.WIDTH);
  const [roomHeight, setRoomHeight] = useState(ROOM_DEFAULTS.HEIGHT);
  const [showGrid, setShowGrid] = useState(true);

  // Hooks
  const { saveToHistory, undo, redo, canUndo, canRedo } = useUndoRedo();

  // Update refs when state changes
  useEffect(() => {
    roomWidthRef.current = roomWidth;
    roomHeightRef.current = roomHeight;
  }, [roomWidth, roomHeight]);

  // Room size change handler
  const handleRoomSizeChange = (newWidth, newHeight) => {
    setRoomWidth(newWidth);
    setRoomHeight(newHeight);

    const constrainedItems = constrainAllObjectsToRoom(items, newWidth, newHeight);
    setItems(constrainedItems);

    setTimeout(() => {
      saveToHistory({
        items: constrainedItems,
        roomWidth: newWidth,
        roomHeight: newHeight,
        currentFloorTexture,
        currentWallTexture
      });
    }, 100);
  };

  const addItem = (type) => {
    const defaults = COMPONENT_DEFAULTS[type] || { height: 0, scale: 1.0 };
    const newItem = {
      id: Date.now(),
      type,
      position: [Math.random() * 4 - 2, defaults.height, Math.random() * 4 - 2],
      rotation: 0,
      scale: defaults.scale
    };

    const newItems = [...items, newItem];
    setItems(newItems);
    saveToHistory({
      items: newItems,
      roomWidth,
      roomHeight,
      currentFloorTexture,
      currentWallTexture
    });
  };

  const handleUndo = () => {
    const prevState = undo();
    if (prevState) {
      setItems(prevState.items);
      setRoomWidth(prevState.roomWidth);
      setRoomHeight(prevState.roomHeight);
      setCurrentFloorTexture(prevState.currentFloorTexture);
      setCurrentWallTexture(prevState.currentWallTexture);
    }
  };

  const handleRedo = () => {
    const nextState = redo();
    if (nextState) {
      setItems(nextState.items);
      setRoomWidth(nextState.roomWidth);
      setRoomHeight(nextState.roomHeight);
      setCurrentFloorTexture(nextState.currentFloorTexture);
      setCurrentWallTexture(nextState.currentWallTexture);
    }
  };

  // Initialize scene
  useEffect(() => {
    // Initialize scene manager
    sceneManagerRef.current = new SceneManager();
    const { scene, camera, renderer } = sceneManagerRef.current.initializeScene();

    // Initialize event handlers
    eventHandlersRef.current = new EventHandlers(
      scene,
      camera,
      renderer,
      roomWidthRef,
      roomHeightRef,
      setItems
    );

    // Set up initial scene
    sceneManagerRef.current.updateFloor(roomWidth, roomHeight, FLOOR_TEXTURES[currentFloorTexture]);
    sceneManagerRef.current.updateWalls(roomWidth, roomHeight, WALL_TEXTURES[currentWallTexture]);
    sceneManagerRef.current.updateGrid(roomWidth, roomHeight, showGrid);

    // Add canvas to DOM
    mountRef.current.appendChild(renderer.domElement);

    // Add event listeners
    eventHandlersRef.current.addEventListeners();

    // Start animation loop
    sceneManagerRef.current.startAnimationLoop();

    // Cleanup
    return () => {
      if (eventHandlersRef.current) {
        eventHandlersRef.current.removeEventListeners();
      }

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }

      if (sceneManagerRef.current) {
        sceneManagerRef.current.dispose();
      }
    };
  }, []);

  // Update room geometry when room size changes
  useEffect(() => {
    if (!sceneManagerRef.current) return;

    sceneManagerRef.current.updateFloor(roomWidth, roomHeight, FLOOR_TEXTURES[currentFloorTexture]);
    sceneManagerRef.current.updateWalls(roomWidth, roomHeight, WALL_TEXTURES[currentWallTexture]);
    sceneManagerRef.current.updateGrid(roomWidth, roomHeight, showGrid);
  }, [roomWidth, roomHeight, showGrid]);

  // Update textures when they change
  useEffect(() => {
    if (!sceneManagerRef.current) return;

    sceneManagerRef.current.updateFloor(roomWidth, roomHeight, FLOOR_TEXTURES[currentFloorTexture]);
    sceneManagerRef.current.updateWalls(roomWidth, roomHeight, WALL_TEXTURES[currentWallTexture]);
  }, [currentFloorTexture, currentWallTexture]);

  // Update scene when items change
  useEffect(() => {
    if (!sceneManagerRef.current) return;

    sceneManagerRef.current.updateBathroomItems(items, createModel);
  }, [items]);

  return (
    <div style={{ width: '98vw', height: '100vh', position: 'relative' }}>
      <Toolbar onAdd={addItem} />
      <TexturePanel
        onFloorChange={(texture) => setCurrentFloorTexture(FLOOR_TEXTURES.indexOf(texture))}
        onWallChange={(texture) => setCurrentWallTexture(WALL_TEXTURES.indexOf(texture))}
        currentFloor={currentFloorTexture}
        currentWall={currentWallTexture}
      />
      <RoomSizePanel
        onRoomSizeChange={handleRoomSizeChange}
        roomWidth={roomWidth}
        roomHeight={roomHeight}
        showGrid={showGrid}
        onToggleGrid={setShowGrid}
        onConstrainObjects={() => {
          const constrainedItems = constrainAllObjectsToRoom(items, roomWidth, roomHeight);
          setItems(constrainedItems);
        }}
      />
      <UndoRedoPanel
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={canUndo}
        canRedo={canRedo}
      />
      <div
        ref={mountRef}
        style={{
          width: '100%',
          height: '100%',
          cursor: 'grab'
        }}
      />
      <div style={{
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        color: 'white',
        background: 'rgba(0,0,0,0.5)',
        padding: '5px 10px',
        borderRadius: '4px',
        fontSize: isMobile() ? '10px' : '12px',
        maxWidth: isMobile() ? '280px' : '320px',
        lineHeight: '1.2'
      }}>
        {isMobile() ? (
          <div>
            <div>Touch + drag: Move objects</div>
            <div>Two finger pinch: Zoom</div>
            <div>Objects snap to walls automatically</div>
          </div>
        ) : (
          <div>
            <div>Left click + drag: Move | Right click + drag: Rotate | Ctrl + drag: Height | Alt + drag: Scale</div>
            <div>Left click empty space: Rotate camera | Wheel: Zoom | Undo/Redo: Top right buttons</div>
            <div style={{ fontSize: '10px', marginTop: '2px', opacity: '0.8' }}>Objects snap to walls automatically • Adjust room size on right panel</div>
          </div>
        )}
      </div>
    </div>
  );
}
