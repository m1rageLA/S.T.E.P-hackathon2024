import * as THREE from "three";

function createMesh(properties) {
  const defaultProperties = {
    size: { x: 1, y: 1, z: 1 },
    position: { x: 0, y: 0, z: 0 },
    material: new THREE.MeshStandardMaterial({ color: 0xffffff }),
    castShadow: true,
    receiveShadow: true,
  };

  const finalProperties = {
    ...defaultProperties,
    ...properties,
    size: { ...defaultProperties.size, ...properties.size },
  };

  const geometry = new THREE.BoxGeometry(
    finalProperties.size.x,
    finalProperties.size.y,
    finalProperties.size.z
  );
  const material = finalProperties.material;
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(
    finalProperties.position.x,
    finalProperties.position.y,
    finalProperties.position.z
  );
  mesh.receiveShadow = true;
  mesh.castShadow = true;
  return mesh;
}

export { createMesh };
