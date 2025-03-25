import * as THREE from "three";

function createStarfield() {
  const texture = new THREE.TextureLoader().load("starTexture.png");

  // Generate 200000 stars with a random position from -2000 to 2000
  const NUM_STARS = 200000;
  const vertices = [];
  for (let i = 0; i < NUM_STARS; i++) {
    const x = THREE.MathUtils.randFloatSpread(2000);
    const y = THREE.MathUtils.randFloatSpread(2000);
    const z = THREE.MathUtils.randFloatSpread(2000);
    vertices.push(x, y, z);
  }
  // Stores the geometry for the stars as a float32 buffer array of 3 components x, y, and z
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  );
  // Create a point material with a star texture
  const material = new THREE.PointsMaterial({
    color: 0x888888,
    map: texture,
    transparent: true,
  });
  // Create the mesh that contains the point geometry and material
  const points = new THREE.Points(geometry, material);
  return points;
}

// setup scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  600
);

// setup renderer and window
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// generate starfield and add to scene
const stars = createStarfield();
scene.add(stars);
camera.position.z = 800;

// setup clock to check for delta time
const clock = new THREE.Clock();
const speed = 20;
let dt = 0;

function animate() {
  requestAnimationFrame(animate);
  dt = clock.getDelta();
  camera.position.z -= speed * dt;

  // reset if camera position below 0
  if (camera.position.z <= -500) {
    camera.position.z = 800;
  }
  renderer.render(scene, camera);
}

animate();
