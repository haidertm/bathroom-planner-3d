import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const COMPONENTS = ["Toilet", "Sink", "Bath", "Shower", "Radiator", "Mirror"];

const FLOOR_TEXTURES = [
  { name: "White Tile", color: 0xf8f8f8, pattern: "tile" },
  { name: "Gray Tile", color: 0xd0d0d0, pattern: "tile" },
  { name: "Marble", color: 0xf5f5dc, pattern: "marble" },
  { name: "Dark Tile", color: 0x606060, pattern: "tile" },
  { name: "Wood", color: 0xd2b48c, pattern: "wood" }
];

const WALL_TEXTURES = [
  { name: "White Paint", color: 0xffffff, pattern: "paint" },
  { name: "Light Blue", color: 0xe6f3ff, pattern: "paint" },
  { name: "Beige", color: 0xf5f5dc, pattern: "paint" },
  { name: "White Tile", color: 0xf8f8f8, pattern: "tile" },
  { name: "Blue Tile", color: 0xb0d4f1, pattern: "tile" },
  { name: "Green Tile", color: 0xc8e6c9, pattern: "tile" }
];

function TexturePanel({ onFloorChange, onWallChange, currentFloor, currentWall }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{
      position: 'absolute',
      top: '60px',
      left: '10px',
      background: 'rgba(0,0,0,0.8)',
      padding: '10px',
      borderRadius: '4px',
      zIndex: 1000,
      color: 'white',
      minWidth: '200px'
    }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: '#666',
          color: 'white',
          border: 'none',
          padding: '5px 10px',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '10px'
        }}
      >
        {isOpen ? 'Hide' : 'Show'} Textures
      </button>

      {isOpen && (
        <div>
          <div style={{ marginBottom: '15px' }}>
            <h4 style={{ margin: '0 0 5px 0', fontSize: '14px' }}>Floor Texture:</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {FLOOR_TEXTURES.map((texture, index) => (
                <button
                  key={index}
                  onClick={() => onFloorChange(texture)}
                  style={{
                    background: `#${texture.color.toString(16).padStart(6, '0')}`,
                    border: currentFloor === index ? '2px solid #4CAF50' : '1px solid #ccc',
                    width: '30px',
                    height: '30px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '8px',
                    padding: '2px'
                  }}
                  title={texture.name}
                />
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ margin: '0 0 5px 0', fontSize: '14px' }}>Wall Texture:</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {WALL_TEXTURES.map((texture, index) => (
                <button
                  key={index}
                  onClick={() => onWallChange(texture)}
                  style={{
                    background: `#${texture.color.toString(16).padStart(6, '0')}`,
                    border: currentWall === index ? '2px solid #4CAF50' : '1px solid #ccc',
                    width: '30px',
                    height: '30px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '8px',
                    padding: '2px'
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

function Toolbar({ onAdd }) {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      padding: '10px',
      background: 'rgba(0,0,0,0.8)',
      zIndex: 1000,
      display: 'flex',
      gap: '10px',
      justifyContent: 'center'
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
            fontSize: '14px'
          }}
        >
          Add {type}
        </button>
      ))}
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
  const floorRef = useRef(null);
  const wallRefs = useRef([]);

  const createTexturedMaterial = (texture) => {
    const material = new THREE.MeshStandardMaterial({ color: texture.color });

    // Add simple procedural texture patterns
    if (texture.pattern === "tile") {
      // Create a simple tile pattern using a canvas
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');

      // Fill with base color
      ctx.fillStyle = `#${texture.color.toString(16).padStart(6, '0')}`;
      ctx.fillRect(0, 0, 256, 256);

      // Add grid lines for tiles
      ctx.strokeStyle = 'rgba(0,0,0,0.1)';
      ctx.lineWidth = 2;
      for (let i = 0; i <= 256; i += 32) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 256);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(256, i);
        ctx.stroke();
      }

      const canvasTexture = new THREE.CanvasTexture(canvas);
      canvasTexture.wrapS = THREE.RepeatWrapping;
      canvasTexture.wrapT = THREE.RepeatWrapping;
      canvasTexture.repeat.set(4, 4);
      material.map = canvasTexture;
    }

    return material;
  };

  const createWalls = (scene) => {
    const wallHeight = 3;
    const wallThickness = 0.1;
    const roomSize = 5;

    // Clear existing walls
    wallRefs.current.forEach(wall => {
      if (wall.parent) wall.parent.remove(wall);
    });
    wallRefs.current = [];

    const wallTexture = WALL_TEXTURES[currentWallTexture];
    const wallMaterial = createTexturedMaterial(wallTexture);

    // Create 4 walls
    const walls = [
      { // North wall
        geometry: new THREE.BoxGeometry(roomSize * 2, wallHeight, wallThickness),
        position: [0, wallHeight / 2, -roomSize]
      },
      { // South wall
        geometry: new THREE.BoxGeometry(roomSize * 2, wallHeight, wallThickness),
        position: [0, wallHeight / 2, roomSize]
      },
      { // East wall
        geometry: new THREE.BoxGeometry(wallThickness, wallHeight, roomSize * 2),
        position: [roomSize, wallHeight / 2, 0]
      },
      { // West wall
        geometry: new THREE.BoxGeometry(wallThickness, wallHeight, roomSize * 2),
        position: [-roomSize, wallHeight / 2, 0]
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

  const createModel = (type, position, rotation = 0) => {
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
      group.userData.type = type;
    }

    return group;
  };

  const addItem = (type) => {
    const newItem = {
      id: Date.now(),
      type,
      position: [Math.random() * 4 - 2, type === 'Mirror' ? 1.2 : 0, Math.random() * 4 - 2],
      rotation: 0,
    };
    setItems((prev) => [...prev, newItem]);
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
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.3);
    directionalLight2.position.set(-5, 10, -5);
    scene.add(directionalLight2);

    // Floor
    const floorGeometry = new THREE.BoxGeometry(10, 0.1, 10);
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

    // Grid
    const gridHelper = new THREE.GridHelper(10, 10);
    gridHelper.position.y = 0.01;
    scene.add(gridHelper);

    // Raycaster for object selection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let selectedObject = null;
    let isDragging = false;
    let isRotating = false;
    let isObjectRotating = false;
    let isHeightAdjusting = false;
    let dragPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    let verticalPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    let dragOffset = new THREE.Vector3();
    let rotationStartAngle = 0;
    let objectStartRotation = 0;
    let heightStartY = 0;
    let mouseStartY = 0;

    // Snapping settings
    const SNAP_DISTANCE = 0.3;
    const WALL_POSITIONS = [-5, 5]; // X and Z coordinates of walls

    // Mouse interaction variables
    let mouseX = 0;
    let mouseY = 0;
    let mouseDownX = 0;
    let mouseDownY = 0;

    const updateMousePosition = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
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

      // Snap to walls with proper offset so objects stay inside the room
      WALL_POSITIONS.forEach(wallPos => {
        // Check Z-axis walls (North/South walls)
        if (Math.abs(position.z - wallPos) < SNAP_DISTANCE) {
          if (wallPos > 0) { // South wall
            snappedPos.z = wallPos - 0.4; // Keep objects inside room
          } else { // North wall
            snappedPos.z = wallPos + 0.4; // Keep objects inside room
          }
        }
        // Check X-axis walls (East/West walls)
        if (Math.abs(position.x - wallPos) < SNAP_DISTANCE) {
          if (wallPos > 0) { // East wall
            snappedPos.x = wallPos - 0.4; // Keep objects inside room
          } else { // West wall
            snappedPos.x = wallPos + 0.4; // Keep objects inside room
          }
        }
      });

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

      if (isHeightAdjusting && selectedObject) {
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

        // Constrain to room bounds (within walls)
        newPosition.x = Math.max(-4.8, Math.min(4.8, newPosition.x));
        newPosition.z = Math.max(-4.8, Math.min(4.8, newPosition.z));

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
      renderer.domElement.style.cursor = 'default';
    };

    const handleContextMenu = (event) => {
      event.preventDefault(); // Prevent browser context menu
    };

    const handleWheel = (event) => {
      const scale = event.deltaY > 0 ? 1.1 : 0.9;
      camera.position.multiplyScalar(scale);
    };

    mountRef.current.appendChild(renderer.domElement);

    // Add event listeners
    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    renderer.domElement.addEventListener('mousemove', handleMouseMove);
    renderer.domElement.addEventListener('mouseup', handleMouseUp);
    renderer.domElement.addEventListener('contextmenu', handleContextMenu);
    renderer.domElement.addEventListener('wheel', handleWheel);

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
      window.removeEventListener('resize', handleResize);

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

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
      const model = createModel(item.type, item.position, item.rotation || 0);
      if (model) {
        model.userData.isBathroomItem = true;
        model.userData.itemId = item.id;
        sceneRef.current.add(model);
      }
    });
  }, [items]);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Toolbar onAdd={addItem} />
      <TexturePanel
        onFloorChange={(texture) => setCurrentFloorTexture(FLOOR_TEXTURES.indexOf(texture))}
        onWallChange={(texture) => setCurrentWallTexture(WALL_TEXTURES.indexOf(texture))}
        currentFloor={currentFloorTexture}
        currentWall={currentWallTexture}
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
        fontSize: '12px',
        maxWidth: '300px'
      }}>
        <div>Left click + drag: Move objects | Right click + drag: Rotate objects</div>
        <div>Ctrl + drag: Adjust height | Left click empty space: Rotate camera | Wheel: Zoom</div>
        <div style={{ fontSize: '10px', marginTop: '2px', opacity: '0.8' }}>Objects snap to walls automatically</div>
      </div>
    </div>
  );
}
