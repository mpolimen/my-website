import './style.css'

import * as THREE from 'three';

// https://codepen.io/cubeghost/pen/pJyQRx
function init() {
	// var blue = new THREE.Color(0x7658ef);
	// var pink = new THREE.Color(0xfca4c5);

	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

	var renderer = new THREE.WebGLRenderer({ alpha: true });
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	var shape = [];
	var geometry = new THREE.IcosahedronGeometry(2.5,0);
	var material = new THREE.MeshNormalMaterial();
	shape[0] = new THREE.Mesh( geometry, material );
	shape[1] = new THREE.Mesh( geometry, material );
	shape[2] = new THREE.Mesh( geometry, material );
	shape[0].position.set(0,5,0);
	shape[1].position.set(0,5,0);
	shape[2].position.set(0,5,0);
	scene.add(shape[0],shape[1],shape[2]);

	var light = new THREE.PointLight(0xfca4c5);
	light.position.set(0,250,0);
	scene.add(light);

	camera.position.set(-3,4,10); // x y z

	function render() {
		requestAnimationFrame( render );

		shape[0].rotation.x += 0.035;
		shape[0].rotation.y -= 0.005;
		shape[1].rotation.y += 0.015;
		shape[1].rotation.z -= 0.005;
		shape[2].rotation.z -= 0.025;
		shape[2].rotation.x += 0.005;
		renderer.render(scene, camera);
	}
    
	render();
}

init();