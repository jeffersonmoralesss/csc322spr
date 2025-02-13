// Import THREE
import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js';

// Import OrbitControls
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';

// Create renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 10);

// Create OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = -10;
controls.maxDistance = 100;

// Create scene
const scene = new THREE.Scene();

// Function to evaluate the implicit equation
function implicitFunction(x, y) {
    return Math.pow(x * x + y * y, 2) - 4 * (x * x - y * y);
}

// Create geometry for the implicit curve visualization
const points = [];
const segments = 500; // Grid segments
const range = 2; // Value range for x and y, cant be too big

for (let i = -segments; i <= segments; i++) {
    for (let j = -segments; j <= segments; j++) {
        const x = (i / segments) * range;
        const y = (j / segments) * range;
        if (Math.abs(implicitFunction(x, y)) < 0.05) { // add points if needed
            points.push(new THREE.Vector3(x, y, 0));
        }
    }
}

//Create geometry
const geometry = new THREE.BufferGeometry().setFromPoints(points);
const material = new THREE.PointsMaterial({ color: 0xff0000, size: 0.05 });
const object = new THREE.Points(geometry, material);

//Add the object into scene
scene.add(object);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

