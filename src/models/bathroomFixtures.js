import * as THREE from "three";

export const createToilet = (position) => {
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

export const createSink = (position) => {
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

export const createBath = (position) => {
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

export const createShower = (position) => {
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

export const createRadiator = (position) => {
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

export const createMirror = (position) => {
  const group = new THREE.Group();

  // Frame
  const frameGeometry = new THREE.BoxGeometry(0.8, 1.0, 0.05);
  const frameMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
  const frame = new THREE.Mesh(frameGeometry, frameMaterial);
  frame.position.set(0, 0, 0);
  group.add(frame);

  // Mirror surface
  const mirrorGeometry = new THREE.BoxGeometry(0.7, 0.9, 0.01);
  const mirrorMaterial = new THREE.MeshStandardMaterial({
    color: 0x87CEEB,
    metalness: 1,
    roughness: 0.1
  });
  const mirror = new THREE.Mesh(mirrorGeometry, mirrorMaterial);
  mirror.position.set(0, 0, 0.025);
  group.add(mirror);

  group.position.set(position[0], position[1], position[2]);
  return group;
};

export const createModel = (type, position, rotation = 0, scale = 1.0) => {
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
