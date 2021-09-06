import './style.css'

import * as THREE from 'three';
import { Mesh } from 'three';

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

	// CUBES
	var cubes = [];
	cubes.push(new Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshNormalMaterial()));
	cubes[0].position.set(6, -10, 0);
	cubes[0].originaly = cubes[0].position.y;
	cubes.push(new Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshNormalMaterial()));
	cubes[1].position.set(-10, -22, 0);
	cubes[1].originaly = cubes[1].position.y;
	cubes.push(new Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshNormalMaterial()));
	cubes[2].position.set(6, -35, 0);
	cubes[2].originaly = cubes[2].position.y;
	for(let cube of cubes) {
		scene.add(cube);
	}

	// SPIN
	function spin() {
		const t = document.body.getBoundingClientRect().top;

		cubes.forEach((cube) => {
			cube.position.y = t * -0.015 + cube.originaly;
			cube.rotation.y += 0.04;
  			cube.rotation.z += 0.04;
		})
	}
	document.body.onscroll = spin;
	spin();

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