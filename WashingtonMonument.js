// import THREE
import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js';
// import Orbit controls
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.set( 0, 500, 600 );
camera.lookAt( 0, 10, 0 );

const scene = new THREE.Scene();

//set the vertices for 8 sided polygon
const vertices = [
		//base vertices centered around origin
		-27.5, 0, -27.5, //0 
		-27.5, 0 , 27.5, //1 
		27.5, 0 , 27.5,  //2 
		27.5, 0, -27.5, //3 

		//top vertices before pyramid
		-17, 500, -17, //4
		-17, 500, 17, //5
		17, 500, 17, //6
		17, 500, -17, //7

		//pyramid peak 
		0, 555, 0 //8
];

const faces = [
		//each triangle will conect three vertices twice to form a face
		//tower faces
		0, 1, 5,  0, 5, 4, //left face
		1, 2, 6,  1, 6, 5, //front face
		2, 3, 7,  2, 7, 6, //right face
		3, 0, 4,  3, 4, 7, //back face

		//pyramid faces
		4, 5, 8, //left pyramid
		5, 6, 8, //front pyramid face
		6, 7, 8, //right pyramid face 
		7, 4, 8 //back pyramid face
];

//convert for buffer geometry
const geometry = new THREE.BufferGeometry();
geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
geometry.setIndex( new THREE.Uint16BufferAttribute( faces, 1 ) );

//color formats for geometry
const materials = [
		new THREE.MeshBasicMaterial( { color: 'goldenrod' } ), //color keyword
		new THREE.MeshBasicMaterial( { color: 0xffd700 } ), //hexadecimal
		new THREE.MeshBasicMaterial( { color: 'rgb(255, 223, 0)' } ), //RGB
		new THREE.MeshBasicMaterial( { color: 'rgb(240, 200, 0)' } ) //RGB
];

//assign material to face
geometry.clearGroups();
for (let i = 0; i < faces.length; i +=3 ){
		geometry.addGroup( i, 3, i % materials.length );
}

const mesh = new THREE.Mesh(geometry, materials);
scene.add(mesh);

//orbit controls 
const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
//animation loop
function animate(){
		requestAnimationFrame( animate );
		mesh.rotation.y += 0.01; //so we can rotate y axis
		renderer.render( scene, camera );
}

animate();
