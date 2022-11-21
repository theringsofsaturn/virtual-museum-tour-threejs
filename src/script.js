import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as lilGui from 'lil-gui';
import gsap from 'gsap';

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

// Initial position of the camera
camera.position.set(-4.9, 4.4, 1.9);
camera.rotation.set(-0.9, -0.8, -0.8);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(window.innerWidth, window.innerHeight);

// Orbit Controls
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;

let position = 0;

// gltf Loader
const gltfLoader = new GLTFLoader();
gltfLoader.load('/model/swedish-royal/scene.gltf', (gltf) => {
  console.log('Our model here!', gltf);
  const model = gltf.scene;
  scene.add(model);

  window.addEventListener('mouseup', function () {
    switch (position) {
      case 0:
        cameraMovement(-6.0, 1.72, 1.34);
        cameraRotation(-2.75, -1.24, -2.77);
        position = 1;
        break;

      case 1:
        cameraMovement(0.48, 2.09, -2.11);
        cameraRotation(-3.12, 0.22, 3.13);
        position = 2;
        break;

      case 2:
        cameraMovement(-1.49, 1.7, 0.48);
        cameraRotation(0.44, 1.43, -0.44);
        position = 0;
    }
  });

  // GUI Configurator
  // const gui = new lilGui.GUI();
  // add the camera to the GUI
  //   gui
  //     .add(model.position, 'x')
  //     .min(-100)
  //     .max(100)
  //     .step(0.001)
  //     .name('Model X Axis Position');
  //   gui
  //     .add(model.position, 'y')
  //     .min(-100)
  //     .max(100)
  //     .step(0.001)
  //     .name('Model Y Axis Position');
  //   gui
  //     .add(model.position, 'z')
  //     .min(-100)
  //     .max(100)
  //     .step(0.001)
  //     .name('Model Z Axis Position');
});

// Functions to move and rotate the camera
function cameraMovement(x, y, z) {
  gsap.to(camera.position, {
    x,
    y,
    z,
    duration: 3,
  });
}

function cameraRotation(x, y, z) {
  gsap.to(camera.rotation, {
    x,
    y,
    z,
    duration: 3,
  });
}

// Animation and loop
const animate = () => {
  renderer.render(scene, camera);

  // controls.update();
};

renderer.setAnimationLoop(animate); // this is the same as requestAnimationFrame(animate). It will call the animate function over and over again on every frame.

animate();
