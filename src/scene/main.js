import * as THREE from 'three';
import { getSceneUpdate } from './sceneLoop';
import { createListener } from './listener';

function createScene() {
  const DEG2RAD = Math.PI / 180;

  // Set up rendering
  const gameWindow = document.getElementById('render-target');
  if (!gameWindow) {
    throw new Error('Game window not found');
  }
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(gameWindow.offsetWidth, gameWindow.offsetHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  gameWindow.appendChild(renderer.domElement);

  // Create listener

  const listener = createListener()
  
  // Setup scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x777777);
  setupLights();


  // Setup camera
  const camera = new THREE.PerspectiveCamera(
    75,
    gameWindow.offsetWidth / gameWindow.offsetHeight,
    0.1,
    1000
  );
  camera.position.z = 8.5;
  camera.position.y = 7;
  camera.rotation.x = -45 * DEG2RAD // 45 degrees

  // Setup scene manager
  const sceneManager = getSceneUpdate(scene, listener.inputMap, renderer, camera)

  // Functions
  function setupLights() {
    const sun = new THREE.DirectionalLight(0xffffff, 5);
    sun.castShadow = true;

    // Position shadow camera
    sun.shadow.camera.left = -10;
    sun.shadow.camera.right = 10;
    sun.shadow.camera.top = 10;
    sun.shadow.camera.bottom = -10;
    sun.shadow.mapSize.width = 1024;
    sun.shadow.mapSize.height = 1024;
    sun.shadow.camera.near = 0.5;
    sun.shadow.camera.far = 50;
    sun.position.set(-5, 10, -5)

    // Adjust camera settings

    scene.add(sun);
    scene.add(new THREE.AmbientLight(0xffffff, 0.3));
    
    // Debug shadow camera

    // const helper = new THREE.CameraHelper( sun.shadow.camera );
    // scene.add( helper )
  }

  function updateSize(width, height) {
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  function draw() {
    sceneManager.updateScene()
    listener.resetInputMap()
    renderer.render(scene, camera);
  }

  function start() {
    renderer.setAnimationLoop(draw);
  }

  function stop() {
    renderer.setAnimationLoop(null);
  }

  return {
    start,
    stop,
    updateSize,
    listener
  };
}

export { createScene };