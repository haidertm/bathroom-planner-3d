import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";

const COMPONENTS = ["Toilet", "Sink", "Bath", "Shower", "Radiator", "Mirror"];

// Custom texture definitions - supports both files and colors
const FLOOR_TEXTURES = [
  { name: "White Tile", file: "", color: 0xf8f8f8, scale: [4, 4] },
  { name: "Gray Tile", file: "/textures/floor_grey_tile.avif", color: 0xd0d0d0, scale: [4, 4] },
  { name: "Marble", file: "", color: 0xf5f5dc, scale: [2, 2] },
  { name: "Dark Tile", file: "", color: 0x606060, scale: [4, 4] },
  { name: "Wood", file: "", color: 0xd2b48c, scale: [3, 3] },
  { name: "Red Terracotta", file: "/textures/floor_red_terracotta.jpg", color: 0xffffff, scale: [4, 4] },
  { name: "Stone", file: "", color: 0x888888, scale: [2, 2] }
];

const WALL_TEXTURES = [
  { name: "Metro White Tile", file: "/textures/wall_metro_white_tile.png", color: 0xffffff, scale: [20, 12] },
  { name: "White Paint", file: "", color: 0xffffff, scale: [1, 1] },
  { name: "Light Blue", file: "", color: 0xe6f3ff, scale: [1, 1] },
  { name: "Beige", file: "", color: 0xf5f5dc, scale: [1, 1] },
  { name: "White Tile", file: "", color: 0xf8f8f8, scale: [4, 4] },
  { name: "Blue Tile", file: "", color: 0xb0d4f1, scale: [4, 4] },
  { name: "Green Tile", file: "", color: 0xc8e6c9, scale: [4, 4] },
  { name: "Brick", file: "/textures/wall_brick.jpg", color: 0xcc6666, scale: [6, 4] },
  { name: "Subway Tile", file: "", color: 0xf0f0f0, scale: [8, 6] }
];

function Toolbar({ onAdd }) {
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
}

function TexturePanel({ onFloorChange, onWallChange, currentFloor, currentWall }) {
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
}

function RoomSizePanel({ onRoomSizeChange, roomWidth, roomHeight }) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempWidth, setTempWidth] = useState(roomWidth);
  const [tempHeight, setTempHeight] = useState(roomHeight);
  const isMobile = window.innerWidth <= 768;

  const handleApply = () => {
    onRoomSizeChange(tempWidth, tempHeight);
  };

  const handleReset = () => {
    setTempWidth(10);
    setTempHeight(10);
    onRoomSizeChange(10, 10);
  };

  return (
    <div style={{
      position: 'absolute',
      top: isMobile ? '10px' : '60px',
      right: '10px',
      background: 'rgba(0,0,0,0.8)',
      padding: '10px',
      borderRadius: '4px',
      zIndex: 1000,
      color: 'white',
      minWidth: isMobile ? '200px' : '180px'
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
              min="6"
              max="20"
              step="0.5"
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
              min="6"
              max="20"
              step="0.5"
              value={tempHeight}
              onChange={(e) => setTempHeight(parseFloat(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '5px' }}>
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
        </div>
      )}
    </div>
  );
}

function UndoRedoPanel({ onUndo, onRedo, canUndo, canRedo }) {
  const isMobile = window.innerWidth <= 768;

  return (
    <div style={{
      position: 'absolute',
      bottom: isMobile ? '80px' : '60px',
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
}

export default function App() {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const [items, setItems] = useState([]);
  const [currentFloorTexture, setCurrentFloorTexture] = useState(0);
  const [currentWallTexture, setCurrentWallTexture] = useState(0);
  const [roomWidth, setRoomWidth] = useState(10);
  const [roomHeight, setRoomHeight] = useState(10);
  const floorRef = useRef(null);
  const wallRefs = useRef([]);

  // Undo/Redo state management
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const textureLoader = useRef(new THREE.TextureLoader());
  const loadedTexturesRef = useRef(new Map());

  // Save state to history
  const saveToHistory = (newItems) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({
      items: JSON.parse(JSON.stringify(newItems)),
      roomWidth,
      roomHeight,
      currentFloorTexture,
      currentWallTexture
    });

    // Limit history to 50 states
    if (newHistory.length > 50) {
      newHistory.shift();
    } else {
      setHistoryIndex(historyIndex + 1);
    }

    setHistory(newHistory);
  };

  // Undo function
  const undo = () => {
    if (historyIndex > 0) {
      const prevState = history[historyIndex - 1];
      setItems(prevState.items);
      setRoomWidth(prevState.roomWidth);
      setRoomHeight(prevState.roomHeight);
      setCurrentFloorTexture(prevState.currentFloorTexture);
      setCurrentWallTexture(prevState.currentWallTexture);
      setHistoryIndex(historyIndex - 1);
    }
  };

  // Redo function
  const redo = () => {
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      setItems(nextState.items);
      setRoomWidth(nextState.roomWidth);
      setRoomHeight(nextState.roomHeight);
      setCurrentFloorTexture(nextState.currentFloorTexture);
      setCurrentWallTexture(nextState.currentWallTexture);
      setHistoryIndex(historyIndex + 1);
    }
  };

  const createTexturedMaterial = (textureConfig) => {
    // Check if we should use file or color
    const hasValidFile = textureConfig.file &&
      textureConfig.file.trim() !== "" &&
      textureConfig.file !== null &&
      textureConfig.file !== undefined;

    // Create material with appropriate base
    const material = new THREE.MeshStandardMaterial({
      color: hasValidFile ? 0xffffff : textureConfig.color, // Use white for textures, actual color for solid colors
      roughness: 0.8,
      metalness: 0.0
    });

    // If no valid file, return material with just color
    if (!hasValidFile) {
      return material;
    }

    // Check if texture is already loaded
    const cacheKey = `${textureConfig.file}_${textureConfig.scale?.join('x') || 'default'}`;
    if (loadedTexturesRef.current.has(cacheKey)) {
      const texture = loadedTexturesRef.current.get(cacheKey);
      material.map = texture;
      return material;
    }

    // Load texture from file
    textureLoader.current.load(
      textureConfig.file,
      (texture) => {
        // Configure texture for better color representation
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.encoding = THREE.sRGBEncoding;
        texture.flipY = false;

        // Use custom scale if provided, otherwise use defaults
        const scaleX = textureConfig.scale ? textureConfig.scale[0] : 4;
        const scaleY = textureConfig.scale ? textureConfig.scale[1] : 4;
        texture.repeat.set(scaleX, scaleY);

        // Store loaded texture with scale info
        loadedTexturesRef.current.set(cacheKey, texture);

        // Apply texture to material
        material.map = texture;
        material.needsUpdate = true;
      },
      (progress) => {
        console.log(`Loading texture: ${(progress.loaded / progress.total * 100)}%`);
      },
      (error) => {
        console.warn(`Failed to load texture: ${textureConfig.file}, falling back to color`, error);
        // Fallback to color-based material
        material.color.setHex(textureConfig.color);
        material.needsUpdate = true;
      }
    );

    return material;
  };

  const createWalls = (scene) => {
    const wallHeight = 3;
    const wallThickness = 0.1;
    const roomSizeX = roomWidth / 2;
    const roomSizeZ = roomHeight / 2;

    // Clear existing walls
    wallRefs.current.forEach(wall => {
      if (wall.parent) wall.parent.remove(wall);
    });
    wallRefs.current = [];

    const wallTexture = WALL_TEXTURES[currentWallTexture];
    const wallMaterial = createTexturedMaterial(wallTexture);

    // Create 4 walls with dynamic sizing
    const walls = [
      { // North wall
        geometry: new THREE.BoxGeometry(roomWidth, wallHeight, wallThickness),
        position: [0, wallHeight / 2, -roomSizeZ]
      },
      { // South wall
        geometry: new THREE.BoxGeometry(roomWidth, wallHeight, wallThickness),
        position: [0, wallHeight / 2, roomSizeZ]
      },
      { // East wall
        geometry: new THREE.BoxGeometry(wallThickness, wallHeight, roomHeight),
        position: [roomSizeX, wallHeight / 2, 0]
      },
      { // West wall
        geometry: new THREE.BoxGeometry(wallThickness, wallHeight, roomHeight),
        position: [-roomSizeX, wallHeight / 2, 0]
      }
    ];

    walls.forEach(wallData => {
      const wall = new THREE.Mesh(wallData.geometry, wallMaterial);
      wall.position.set(wallData.position[0], wallData.position[1], wallData.position[2]);
      wall.receiveShadow = true;
      wall.userData.isWall = true;
      scene.add(wall);
      wallRefs.current.push(wall);
    });
  };

  // Create simple bathroom fixtures
  const createToilet = (position) => {
    const group = new THREE.Group();

    // Base
    const baseGeometry = new THREE.BoxGeometry(0.6, 0.4, 0.8);
    const baseMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.set(0, 0.2, 0);
    group.add(base);

    // Tank
    const tankGeometry = new THREE.BoxGeometry(0.5, 0.6, 0.2);
    const tank = new THREE.Mesh(tankGeometry, baseMaterial);
    tank.position.set(0, 0.5, -0.3);
    group.add(tank);

    // Seat
    const seatGeometry = new THREE.CylinderGeometry(0.25, 0.25, 0.05);
    const seatMaterial = new THREE.MeshStandardMaterial({ color: 0xf0f0f0 });
    const seat = new THREE.Mesh(seatGeometry, seatMaterial);
    seat.position.set(0, 0.42, 0.1);
    group.add(seat);

    group.position.set(position[0], position[1], position[2]);
    return group;
  };

  const createSink = (position) => {
    const group = new THREE.Group();

    // Basin
    const basinGeometry = new THREE.CylinderGeometry(0.3, 0.25, 0.15);
    const basinMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const basin = new THREE.Mesh(basinGeometry, basinMaterial);
    basin.position.set(0, 0.85, 0);
    group.add(basin);

    // Pedestal
    const pedestalGeometry = new THREE.CylinderGeometry(0.15, 0.2, 0.8);
    const pedestal = new THREE.Mesh(pedestalGeometry, basinMaterial);
    pedestal.position.set(0, 0.4, 0);
    group.add(pedestal);

    // Faucet
    const faucetGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.15);
    const faucetMaterial = new THREE.MeshStandardMaterial({ color: 0xc0c0c0 });
    const faucet = new THREE.Mesh(faucetGeometry, faucetMaterial);
    faucet.position.set(0, 1.0, -0.2);
    faucet.rotation.x = Math.PI / 2;
    group.add(faucet);

    group.position.set(position[0], position[1], position[2]);
    return group;
  };

  const createBath = (position) => {
    const group = new THREE.Group();

    // Tub
    const tubGeometry = new THREE.BoxGeometry(1.7, 0.6, 0.8);
    const tubMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const tub = new THREE.Mesh(tubGeometry, tubMaterial);
    tub.position.set(0, 0.3, 0);
    group.add(tub);

    // Inner cavity
    const innerGeometry = new THREE.BoxGeometry(1.5, 0.4, 0.6);
    const innerMaterial = new THREE.MeshStandardMaterial({ color: 0xf8f8f8 });
    const inner = new THREE.Mesh(innerGeometry, innerMaterial);
    inner.position.set(0, 0.4, 0);
    group.add(inner);

    group.position.set(position[0], position[1], position[2]);
    return group;
  };

  const createShower = (position) => {
    const group = new THREE.Group();

    // Base
    const baseGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.1);
    const baseMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.set(0, 0.05, 0);
    group.add(base);

    // Walls
    const wallMaterial = new THREE.MeshStandardMaterial({
      color: 0xadd8e6,
      transparent: true,
      opacity: 0.3
    });

    const wall1Geometry = new THREE.BoxGeometry(0.8, 2, 0.05);
    const wall1 = new THREE.Mesh(wall1Geometry, wallMaterial);
    wall1.position.set(-0.4, 1, 0);
    group.add(wall1);

    const wall2Geometry = new THREE.BoxGeometry(0.05, 2, 0.8);
    const wall2 = new THREE.Mesh(wall2Geometry, wallMaterial);
    wall2.position.set(0, 1, -0.4);
    group.add(wall2);

    // Shower head
    const headGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.05);
    const headMaterial = new THREE.MeshStandardMaterial({ color: 0xc0c0c0 });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.set(0, 1.8, 0);
    group.add(head);

    group.position.set(position[0], position[1], position[2]);
    return group;
  };

  const createRadiator = (position) => {
    const group = new THREE.Group();

    const mainGeometry = new THREE.BoxGeometry(0.8, 0.6, 0.1);
    const mainMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const main = new THREE.Mesh(mainGeometry, mainMaterial);
    main.position.set(0, 0.5, 0);
    group.add(main);

    // Radiator fins
    const finMaterial = new THREE.MeshStandardMaterial({ color: 0xe0e0e0 });
    for (let i = 0; i < 8; i++) {
      const finGeometry = new THREE.BoxGeometry(0.08, 0.5, 0.08);
      const fin = new THREE.Mesh(finGeometry, finMaterial);
      fin.position.set(-0.3 + i * 0.08, 0.5, 0);
      group.add(fin);
    }

    group.position.set(position[0], position[1], position[2]);
    return group;
  };

  const createMirror = (position) => {
    const group = new THREE.Group();

    // Frame
    const frameGeometry = new THREE.BoxGeometry(0.8, 1.0, 0.05);
    const frameMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    frame.position.set(0, 0, 0); // Changed from 1.2 to 0 for relative positioning
    group.add(frame);

    // Mirror surface
    const mirrorGeometry = new THREE.BoxGeometry(0.7, 0.9, 0.01);
    const mirrorMaterial = new THREE.MeshStandardMaterial({
      color: 0x87CEEB,
      metalness: 1,
      roughness: 0.1
    });
    const mirror = new THREE.Mesh(mirrorGeometry, mirrorMaterial);
    mirror.position.set(0, 0, 0.025); // Relative to frame
    group.add(mirror);

    group.position.set(position[0], position[1], position[2]);
    return group;
  };

  const createModel = (type, position, rotation = 0, scale = 1.0) => {
    let group;
    switch(type) {
      case "Toilet": group = createToilet(position); break;
      case "Sink": group = createSink(position); break;
      case "Bath": group = createBath(position); break;
      case "Shower": group = createShower(position); break;
      case "Radiator": group = createRadiator(position); break;
      case "Mirror": group = createMirror(position); break;
      default: return null;
    }

    if (group) {
      group.rotation.y = rotation;
      group.scale.set(scale, scale, scale);
      group.userData.type = type;
    }

    return group;
  };

  // Room size change handler
  const handleRoomSizeChange = (newWidth, newHeight) => {
    setRoomWidth(newWidth);
    setRoomHeight(newHeight);

    // Constrain existing objects to new room bounds
    const maxX = (newWidth / 2) - 0.4;
    const maxZ = (newHeight / 2) - 0.4;

    setItems(prev => prev.map(item => ({
      ...item,
      position: [
        Math.max(-maxX, Math.min(maxX, item.position[0])),
        item.position[1],
        Math.max(-maxZ, Math.min(maxZ, item.position[2]))
      ]
    })));

    saveToHistory(items);
  };

  const addItem = (type) => {
    const newItem = {
      id: Date.now(),
      type,
      position: [Math.random() * 4 - 2, type === 'Mirror' ? 1.2 : 0, Math.random() * 4 - 2],
      rotation: 0,
      scale: 1.0
    };

    const newItems = [...items, newItem];
    setItems(newItems);
    saveToHistory(newItems);
  };

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 10);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    rendererRef.current = renderer;

    // Lighting - Enhanced for better color representation
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    scene.add(directionalLight);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
    directionalLight2.position.set(-5, 10, -5);
    scene.add(directionalLight2);

    const frontLight = new THREE.DirectionalLight(0xffffff, 0.3);
    frontLight.position.set(0, 5, 10);
    scene.add(frontLight);

    // Floor - now dynamic based on room size
    const floorGeometry = new THREE.BoxGeometry(roomWidth, 0.1, roomHeight);
    const floorTexture = FLOOR_TEXTURES[currentFloorTexture];
    const floorMaterial = createTexturedMaterial(floorTexture);
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = -0.05;
    floor.receiveShadow = true;
    floor.userData.isFloor = true;
    scene.add(floor);
    floorRef.current = floor;

    // Create walls
    createWalls(scene);

    // Grid - now dynamic based on room size
    const gridHelper = new THREE.GridHelper(Math.max(roomWidth, roomHeight), Math.max(roomWidth, roomHeight));
    gridHelper.position.y = 0.01;
    scene.add(gridHelper);

    // Touch support variables
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStart = null;
    let lastTouchDistance = 0;
    let isTouchDevice = 'ontouchstart' in window;

    // Mouse interaction variables
    let mouseX = 0;
    let mouseY = 0;
    let mouseDownX = 0;
    let mouseDownY = 0;

    // Raycaster for object selection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let selectedObject = null;
    let isDragging = false;
    let isRotating = false;
    let isObjectRotating = false;
    let isHeightAdjusting = false;
    let isScaling = false;
    let dragPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    let dragOffset = new THREE.Vector3();
    let rotationStartAngle = 0;
    let objectStartRotation = 0;
    let heightStartY = 0;
    let scaleStart = 1;
    let mouseStartY = 0;

    const updateMousePosition = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const updateTouchPosition = (touch) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const getTouchDistance = (touch1, touch2) => {
      const dx = touch1.clientX - touch2.clientX;
      const dy = touch1.clientY - touch2.clientY;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const getIntersectedObject = (mouse) => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      for (let intersect of intersects) {
        let obj = intersect.object;
        // Find the parent group (bathroom item)
        while (obj.parent && !obj.userData.isBathroomItem) {
          obj = obj.parent;
        }
        if (obj.userData.isBathroomItem) {
          return { object: obj, point: intersect.point };
        }
      }
      return null;
    };

    const snapToWall = (position) => {
      const snappedPos = { ...position };
      const roomSizeX = roomWidth / 2;
      const roomSizeZ = roomHeight / 2;
      const SNAP_DISTANCE = 0.3;

      // Snap to walls with proper offset so objects stay inside the room
      // Check Z-axis walls (North/South walls)
      if (Math.abs(position.z - roomSizeZ) < SNAP_DISTANCE) {
        snappedPos.z = roomSizeZ - 0.4; // South wall
      } else if (Math.abs(position.z - (-roomSizeZ)) < SNAP_DISTANCE) {
        snappedPos.z = -roomSizeZ + 0.4; // North wall
      }

      // Check X-axis walls (East/West walls)
      if (Math.abs(position.x - roomSizeX) < SNAP_DISTANCE) {
        snappedPos.x = roomSizeX - 0.4; // East wall
      } else if (Math.abs(position.x - (-roomSizeX)) < SNAP_DISTANCE) {
        snappedPos.x = -roomSizeX + 0.4; // West wall
      }

      return snappedPos;
    };

    const highlightObject = (obj, highlight) => {
      if (obj) {
        obj.traverse((child) => {
          if (child.isMesh) {
            if (highlight) {
              child.material = child.material.clone();
              child.material.emissive.setHex(0x444444);
            } else {
              child.material.emissive.setHex(0x000000);
            }
          }
        });
      }
    };

    const handleMouseDown = (event) => {
      mouseDownX = event.clientX;
      mouseDownY = event.clientY;
      mouseX = event.clientX;
      mouseY = event.clientY;

      updateMousePosition(event);
      const intersected = getIntersectedObject(mouse);

      if (intersected) {
        selectedObject = intersected.object;

        if (event.button === 2) { // Right click for rotation
          isObjectRotating = true;

          // Calculate initial rotation angle
          const rect = renderer.domElement.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          rotationStartAngle = Math.atan2(event.clientY - centerY, event.clientX - centerX);
          objectStartRotation = selectedObject.rotation.y;

          renderer.domElement.style.cursor = 'crosshair';
        } else if (event.ctrlKey || event.metaKey) { // Ctrl/Cmd + click for height adjustment
          isHeightAdjusting = true;
          heightStartY = selectedObject.position.y;
          mouseStartY = event.clientY;

          renderer.domElement.style.cursor = 'row-resize';
        } else if (event.altKey) { // Alt + click for scaling
          isScaling = true;
          scaleStart = selectedObject.scale.x; // Assume uniform scaling
          mouseStartY = event.clientY;

          renderer.domElement.style.cursor = 'nw-resize';
        } else { // Left click for dragging
          isDragging = true;

          // Calculate drag offset
          raycaster.setFromCamera(mouse, camera);
          const intersectPoint = new THREE.Vector3();
          raycaster.ray.intersectPlane(dragPlane, intersectPoint);
          dragOffset.subVectors(selectedObject.position, intersectPoint);

          renderer.domElement.style.cursor = 'grabbing';
        }

        highlightObject(selectedObject, true);
      } else {
        if (event.button === 0) { // Left click for camera rotation
          isRotating = true;
          renderer.domElement.style.cursor = 'grabbing';
        }
      }
    };

    const handleMouseMove = (event) => {
      updateMousePosition(event);

      if (isScaling && selectedObject) {
        // Scale object
        const deltaY = (mouseStartY - event.clientY) * 0.01;
        let newScale = Math.max(0.2, Math.min(3.0, scaleStart + deltaY));

        selectedObject.scale.set(newScale, newScale, newScale);

        // Update items state
        const itemId = selectedObject.userData.itemId;
        setItems(prev => prev.map(item =>
          item.id === itemId
            ? { ...item, scale: newScale }
            : item
        ));

      } else if (isHeightAdjusting && selectedObject) {
        // Adjust object height
        const deltaY = (mouseStartY - event.clientY) * 0.01; // Inverted for intuitive movement
        let newY = heightStartY + deltaY;

        // Constrain height based on object type
        const minHeight = 0;
        const maxHeight = selectedObject.userData.type === 'Mirror' ? 2.5 : 1.5;
        newY = Math.max(minHeight, Math.min(maxHeight, newY));

        selectedObject.position.y = newY;

        // Update items state
        const itemId = selectedObject.userData.itemId;
        setItems(prev => prev.map(item =>
          item.id === itemId
            ? { ...item, position: [selectedObject.position.x, newY, selectedObject.position.z] }
            : item
        ));

      } else if (isObjectRotating && selectedObject) {
        // Rotate object
        const rect = renderer.domElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const currentAngle = Math.atan2(event.clientY - centerY, event.clientX - centerX);
        const deltaAngle = currentAngle - rotationStartAngle;

        selectedObject.rotation.y = objectStartRotation + deltaAngle;

        // Update items state
        const itemId = selectedObject.userData.itemId;
        setItems(prev => prev.map(item =>
          item.id === itemId
            ? { ...item, rotation: selectedObject.rotation.y }
            : item
        ));

      } else if (isDragging && selectedObject) {
        // Drag object
        raycaster.setFromCamera(mouse, camera);
        const intersectPoint = new THREE.Vector3();
        raycaster.ray.intersectPlane(dragPlane, intersectPoint);

        let newPosition = intersectPoint.add(dragOffset);

        // Constrain to room bounds (within walls) - now dynamic
        const maxX = (roomWidth / 2) - 0.4;
        const maxZ = (roomHeight / 2) - 0.4;
        newPosition.x = Math.max(-maxX, Math.min(maxX, newPosition.x));
        newPosition.z = Math.max(-maxZ, Math.min(maxZ, newPosition.z));

        // Apply wall snapping
        const snappedPos = snapToWall(newPosition);
        newPosition.x = snappedPos.x;
        newPosition.z = snappedPos.z;

        selectedObject.position.copy(newPosition);

        // Update items state
        const itemId = selectedObject.userData.itemId;
        setItems(prev => prev.map(item =>
          item.id === itemId
            ? { ...item, position: [newPosition.x, newPosition.y, newPosition.z] }
            : item
        ));

      } else if (isRotating) {
        // Rotate camera
        const deltaX = event.clientX - mouseX;
        const deltaY = event.clientY - mouseY;

        const spherical = new THREE.Spherical();
        spherical.setFromVector3(camera.position);
        spherical.theta -= deltaX * 0.01;
        spherical.phi += deltaY * 0.01;
        spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.phi));

        camera.position.setFromSpherical(spherical);
        camera.lookAt(0, 0, 0);

        mouseX = event.clientX;
        mouseY = event.clientY;
      } else {
        // Hover effect
        const intersected = getIntersectedObject(mouse);
        if (intersected) {
          renderer.domElement.style.cursor = 'grab';
        } else {
          renderer.domElement.style.cursor = 'default';
        }
      }
    };

    const handleMouseUp = (event) => {
      if (selectedObject) {
        highlightObject(selectedObject, false);
        selectedObject = null;
      }

      isDragging = false;
      isRotating = false;
      isObjectRotating = false;
      isHeightAdjusting = false;
      isScaling = false;
      renderer.domElement.style.cursor = 'default';
    };

    const handleContextMenu = (event) => {
      event.preventDefault(); // Prevent browser context menu
    };

    const handleWheel = (event) => {
      const scale = event.deltaY > 0 ? 1.1 : 0.9;
      camera.position.multiplyScalar(scale);
    };

    const handleTouchStart = (event) => {
      event.preventDefault();
      const touches = event.touches;

      if (touches.length === 1) {
        const touch = touches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
        touchStart = touch;

        updateTouchPosition(touch);
        const intersected = getIntersectedObject(mouse);

        if (intersected) {
          selectedObject = intersected.object;
          isDragging = true;

          raycaster.setFromCamera(mouse, camera);
          const intersectPoint = new THREE.Vector3();
          raycaster.ray.intersectPlane(dragPlane, intersectPoint);
          dragOffset.subVectors(selectedObject.position, intersectPoint);

          highlightObject(selectedObject, true);
        } else {
          isRotating = true;
          mouseX = touch.clientX;
          mouseY = touch.clientY;
        }
      } else if (touches.length === 2) {
        lastTouchDistance = getTouchDistance(touches[0], touches[1]);
      }
    };

    const handleTouchMove = (event) => {
      event.preventDefault();
      const touches = event.touches;

      if (touches.length === 1) {
        const touch = touches[0];
        updateTouchPosition(touch);

        if (isDragging && selectedObject) {
          raycaster.setFromCamera(mouse, camera);
          const intersectPoint = new THREE.Vector3();
          raycaster.ray.intersectPlane(dragPlane, intersectPoint);

          let newPosition = intersectPoint.add(dragOffset);

          const maxX = (roomWidth / 2) - 0.4;
          const maxZ = (roomHeight / 2) - 0.4;
          newPosition.x = Math.max(-maxX, Math.min(maxX, newPosition.x));
          newPosition.z = Math.max(-maxZ, Math.min(maxZ, newPosition.z));

          const snappedPos = snapToWall(newPosition);
          newPosition.x = snappedPos.x;
          newPosition.z = snappedPos.z;

          selectedObject.position.copy(newPosition);

          const itemId = selectedObject.userData.itemId;
          setItems(prev => prev.map(item =>
            item.id === itemId
              ? { ...item, position: [newPosition.x, newPosition.y, newPosition.z] }
              : item
          ));
        } else if (isRotating) {
          const deltaX = touch.clientX - mouseX;
          const deltaY = touch.clientY - mouseY;

          const spherical = new THREE.Spherical();
          spherical.setFromVector3(camera.position);
          spherical.theta -= deltaX * 0.01;
          spherical.phi += deltaY * 0.01;
          spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.phi));

          camera.position.setFromSpherical(spherical);
          camera.lookAt(0, 0, 0);

          mouseX = touch.clientX;
          mouseY = touch.clientY;
        }
      } else if (touches.length === 2) {
        const distance = getTouchDistance(touches[0], touches[1]);
        const scale = distance / lastTouchDistance;

        if (scale > 1.02) {
          camera.position.multiplyScalar(0.95);
          lastTouchDistance = distance;
        } else if (scale < 0.98) {
          camera.position.multiplyScalar(1.05);
          lastTouchDistance = distance;
        }
      }
    };

    const handleTouchEnd = (event) => {
      event.preventDefault();
      const touches = event.touches;

      if (selectedObject) {
        highlightObject(selectedObject, false);
        selectedObject = null;
      }

      isDragging = false;
      isRotating = false;
      isObjectRotating = false;
      isHeightAdjusting = false;
      isScaling = false;

      if (touches.length === 0) {
        touchStart = null;
      }
    };

    mountRef.current.appendChild(renderer.domElement);

    // Add event listeners
    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    renderer.domElement.addEventListener('mousemove', handleMouseMove);
    renderer.domElement.addEventListener('mouseup', handleMouseUp);
    renderer.domElement.addEventListener('contextmenu', handleContextMenu);
    renderer.domElement.addEventListener('wheel', handleWheel);

    // Add touch event listeners
    if (isTouchDevice) {
      renderer.domElement.addEventListener('touchstart', handleTouchStart, { passive: false });
      renderer.domElement.addEventListener('touchmove', handleTouchMove, { passive: false });
      renderer.domElement.addEventListener('touchend', handleTouchEnd, { passive: false });
    }

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      // Cleanup
      renderer.domElement.removeEventListener('mousedown', handleMouseDown);
      renderer.domElement.removeEventListener('mousemove', handleMouseMove);
      renderer.domElement.removeEventListener('mouseup', handleMouseUp);
      renderer.domElement.removeEventListener('contextmenu', handleContextMenu);
      renderer.domElement.removeEventListener('wheel', handleWheel);

      if (isTouchDevice) {
        renderer.domElement.removeEventListener('touchstart', handleTouchStart);
        renderer.domElement.removeEventListener('touchmove', handleTouchMove);
        renderer.domElement.removeEventListener('touchend', handleTouchEnd);
      }

      window.removeEventListener('resize', handleResize);

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update floor and walls when room size changes
  useEffect(() => {
    if (!sceneRef.current) return;

    // Update floor
    if (floorRef.current) {
      sceneRef.current.remove(floorRef.current);
      const floorGeometry = new THREE.BoxGeometry(roomWidth, 0.1, roomHeight);
      const floorTexture = FLOOR_TEXTURES[currentFloorTexture];
      const floorMaterial = createTexturedMaterial(floorTexture);
      const floor = new THREE.Mesh(floorGeometry, floorMaterial);
      floor.position.y = -0.05;
      floor.receiveShadow = true;
      floor.userData.isFloor = true;
      sceneRef.current.add(floor);
      floorRef.current = floor;
    }

    // Update walls
    createWalls(sceneRef.current);

    // Update grid
    const existingGrid = sceneRef.current.children.find(child => child.isGridHelper);
    if (existingGrid) {
      sceneRef.current.remove(existingGrid);
      const gridHelper = new THREE.GridHelper(Math.max(roomWidth, roomHeight), Math.max(roomWidth, roomHeight));
      gridHelper.position.y = 0.01;
      sceneRef.current.add(gridHelper);
    }
  }, [roomWidth, roomHeight]);

  // Update floor and wall textures
  useEffect(() => {
    if (!sceneRef.current) return;

    // Update floor texture
    if (floorRef.current) {
      const floorTexture = FLOOR_TEXTURES[currentFloorTexture];
      floorRef.current.material = createTexturedMaterial(floorTexture);
    }

    // Update wall textures
    if (wallRefs.current.length > 0) {
      const wallTexture = WALL_TEXTURES[currentWallTexture];
      const wallMaterial = createTexturedMaterial(wallTexture);
      wallRefs.current.forEach(wall => {
        wall.material = wallMaterial;
      });
    }
  }, [currentFloorTexture, currentWallTexture]);

  // Update scene when items change
  useEffect(() => {
    if (!sceneRef.current) return;

    // Remove existing bathroom items (keep floor, grid, lights, walls)
    const objectsToRemove = [];
    sceneRef.current.traverse((child) => {
      if (child.userData.isBathroomItem) {
        objectsToRemove.push(child);
      }
    });
    objectsToRemove.forEach(obj => sceneRef.current.remove(obj));

    // Add new items
    items.forEach(item => {
      const model = createModel(item.type, item.position, item.rotation || 0, item.scale || 1.0);
      if (model) {
        model.userData.isBathroomItem = true;
        model.userData.itemId = item.id;
        sceneRef.current.add(model);
      }
    });
  }, [items]);

  return (
    <div style={{ width: '98vw', height: '99vh', position: 'relative' }}>
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
      />
      <UndoRedoPanel
        onUndo={undo}
        onRedo={redo}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
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
        fontSize: window.innerWidth <= 768 ? '10px' : '12px',
        maxWidth: window.innerWidth <= 768 ? '280px' : '320px',
        lineHeight: '1.2'
      }}>
        {window.innerWidth <= 768 ? (
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
