// import THREE
import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js';
// import Orbit controls
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
camera.position.set( 0, 0, 5 );
camera.lookAt( 0, 0, 0 );

const scene = new THREE.Scene()

//create a blue LineBasicMaterial
const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
//each point for tetrahedron
const v0 = new THREE.Vector3( - 1, - 1, - 1 ); //left point
const v1 = new THREE.Vector3( 1, - 1, - 1 ); //right point
const v2 = new THREE.Vector3( 0, - 1, 1 ); //bottom point
const v3 = new THREE.Vector3( 0, 1, 0 ); //top point

const edges = [
    [v0, v1], [v1, v2], [v2, v0], // Base triangle edges
    [v0, v3], [v1, v3], [v2, v3]  // Side edges connecting to the top vertex
];

// Loop through each edge and create a line
edges.forEach(edge => {
    const geometry = new THREE.BufferGeometry().setFromPoints(edge);
    const line = new THREE.Line(geometry, material);
    scene.add(line);
});

renderer.render( scene, camera );
