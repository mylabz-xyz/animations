import * as THREE from 'three';


let scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );
camera.position.z = 5;


var viewport: HTMLElement = document.querySelector('#viewport') as HTMLElement;
renderer.setSize(  viewport.clientWidth, viewport.clientHeight );
viewport.appendChild( renderer.domElement );

window.addEventListener('resize', function(){
	var viewport: HTMLElement = document.querySelector('#viewport');
	camera.aspect = viewport.clientWidth / viewport.clientHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( viewport.clientWidth, viewport.clientHeight );
	console.log('resize');
})

var animate = function () {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render( scene, camera );
};

animate();