// Импортируем необходимые библиотеки из Three.js
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export function createScene() {
  // Создаем сцену
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf2f2f2);
  let characterMesh;

  // Параметры для ортографической камеры
  const aspect = window.innerWidth / window.innerHeight;
  const d = 4; // масштаб, можно настроить по желанию

  // Создаем ортографическую камеру для изометрического вида
  const camera = new THREE.OrthographicCamera(
    -d * aspect, // left
    d * aspect, // right
    d, // top
    -d, // bottom
    0, // near
    1000 // far
  );

  // Устанавливаем полученные координаты камеры и target
  camera.position.set(-2.4312726283033967, 6.92567825288854, -17.796448421979143); 
  camera.lookAt(7.448129276631615, 2.575467779299757, -1.937735856969807);

  // Создаем рендерер
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true; // Включаем поддержку теней
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.CineonToneMapping;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  const ambLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambLight);

  // Создаем свет
  const light = new THREE.DirectionalLight(0xffffff, 3.8);
  light.position.set(-20, 10, -100);
  light.castShadow = true;
  light.shadow.radius = 4;
  scene.add(light);

  light.shadow.mapSize.width = 1024;
  light.shadow.mapSize.height = 1024;
  light.shadow.camera.near = 0.5;
  light.shadow.camera.far = 50;
  light.shadow.bias = -0.005;

  // Создаем свет 222
  const light2 = new THREE.DirectionalLight(0xffffff, 4);
  light2.position.set(10, 20, 8);
  light2.castShadow = true;
  light2.shadow.radius = 4;
  scene.add(light2);

  light2.shadow.mapSize.width = 1024;
  light2.shadow.mapSize.height = 1024;
  light2.shadow.camera.near = 0.5;
  light2.shadow.camera.far = 50;
  light2.shadow.bias = -0.005;

  // Создаем плоскость (платформу)
  const planeGeometry = new THREE.PlaneGeometry(50, 50);
  const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.2 });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -Math.PI / 2;
  plane.receiveShadow = true;
  scene.add(plane);

  // Загружаем модель с помощью GLTFLoader
  const loader = new GLTFLoader();
  loader.load(
    "/test11.glb",
    (gltf) => {
      characterMesh = gltf.scene;
      characterMesh.position.set(3, 0, 0);
      characterMesh.castShadow = true;

      characterMesh.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.metalness = 0;
        }
      });
      scene.add(characterMesh);
    },
    undefined,
    (error) => {
      console.error("An error occurred while loading the model:", error);
    }
  );

  // Окружающий свет
  const ambientLight = new THREE.AmbientLight(0x404040);
  scene.add(ambientLight);

  // Функция анимации
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  // Обработка изменения размера окна
  window.addEventListener("resize", () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspect = width / height;

    camera.left = -d * aspect;
    camera.right = d * aspect;
    camera.top = d;
    camera.bottom = -d;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });

  // Функции запуска и остановки анимации
  return {
    start: () => {
      const renderTarget = document.getElementById("render-target");
      if (renderTarget) {
        renderTarget.appendChild(renderer.domElement); // Привязываем рендерер к render-target
      }
      animate();
    },
    stop: () => {
      const renderTarget = document.getElementById("render-target");
      if (renderTarget && renderer.domElement.parentNode === renderTarget) {
        renderTarget.removeChild(renderer.domElement); // Удаляем рендерер
      }
      window.cancelAnimationFrame(animate); // Остановка анимации
    },
  };
}