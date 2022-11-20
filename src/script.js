import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as lilGui from 'lil-gui';

// Canvas
const canvas = document.querySelector('canvas');

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  45, // Field of View
  window.innerWidth / window.innerHeight, // Aspect Ratio
  0.1, // Near
  1000 // Far
);
camera.position.z = 5; // move it back
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(window.innerWidth, window.innerHeight);

// Orbit Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// GUI configurator
const gui = new lilGui.GUI();

// gltf Loader
// const gltfLoader = new GLTFLoader();
// gltfLoader.load('URL here', (gltf) => {
//   console.log(gltf);
//   const model = gtlf.scene;
//   scene.add(model);
// });

const animate = () => {
  renderer.render(scene, camera);

  controls.update();
};

renderer.setAnimationLoop(animate);

animate();
