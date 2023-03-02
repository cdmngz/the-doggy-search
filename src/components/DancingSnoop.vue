<script setup lang="ts">
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { onMounted } from "vue";

// SCENE
const scene = new THREE.Scene();

// CAMERA
const camera = new THREE.PerspectiveCamera(5, 1, 0.1, 1000);
camera.position.set(0, 0, 80);
scene.add(camera);

// RENDERER
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth / 4, window.innerHeight / 4);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000, 0); // the default

// CONTROLS
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = false;
orbitControls.minDistance = 40;
orbitControls.maxDistance = 50;
orbitControls.enablePan = false;
orbitControls.maxPolarAngle = Math.PI / 2 - 1;
orbitControls.update();

// MODEL
new GLTFLoader().load("/model/SnoopDogg.glb", function (gltf) {
  const model = gltf.scene;
  scene.add(model);
});

// ANIMATE
function animate() {
  orbitControls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

// RESIZE HANDLER
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(10, 10);
}
window.addEventListener("resize", onWindowResize);

function light() {
  scene.add(new THREE.AmbientLight(0xffffff, 2.6));
}
onMounted(() => {
  const container = <HTMLElement>document.getElementById("render");
  container.append(renderer.domElement);
  light();
  animate();
});
</script>

<template>
  <div>
    <div id="render" class="flex justify-center items-center -mb-12"></div>
  </div>
</template>
