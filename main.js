import './style.css'

import * as THREE from 'three';

// Some Code Credits: https://codepen.io/Mombasa/pen/leiGu
var $container = $('#container');
var renderer = new THREE.WebGLRenderer({antialias: true});
var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
var scene = new THREE.Scene();
var mouseX = 0, mouseY = 0;

scene.add(camera);
renderer.setSize(window.innerWidth, window.innerHeight);
$container.append(renderer.domElement);


window.addEventListener( 'resize', onWindowResize, false );
/////////////////////////////////////////

// Console
var Controls = function() {
  this.speed = 1;
  this.rotation = 0;
};

var text = new Controls()
//     gui = new dat.GUI();
//     gui.add(text, 'speed', 0, 10);
//     gui.add(text, 'rotation',0,15);

/////////////////////////////////////////

// Normalmaterial
var normalMaterial = new THREE.MeshNormalMaterial({});


// Torus
function Torus(f){
  this.b = new THREE.Mesh(new THREE.TorusGeometry( 160, 75, 2, 13),normalMaterial);
  this.b.position.x = 57*Math.cos(f);
  this.b.position.y = 57*Math.sin(f);
  this.b.position.z = f*1.25;
  this.b.rotation.z = f*0.03;
}
		
var numTorus = 80;
var tabTorus = [];
for(var i=0; i<numTorus; i++){
  tabTorus.push(new Torus(-i*13));
  scene.add(tabTorus[i].b);
}	

// Gallery
const texture_me = new THREE.TextureLoader().load('images/me.jpg');
const me = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: texture_me }));
scene.add(me);
me.position.z = -7;
me.position.x = 3;

function spin() {
  const t = document.body.getBoundingClientRect().top;

  me.rotation.y += 0.01;
  me.rotation.z += 0.01;
  me.position.y = t * -.02;

}
document.body.onscroll = spin;

// Update
function update(){
  for(var i=0; i<numTorus; i++){
    tabTorus[i].b.position.z+=text.speed;
    tabTorus[i].b.rotation.z+=i*text.rotation/10000;
    if(tabTorus[i].b.position.z>0)
    {
      tabTorus[i].b.position.z=-1000;
    }
  }
}

function onWindowResize() {
    // windowHalfX = window.innerWidth / 2;
    // windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}

// Render
function render() {
  requestAnimationFrame(render);

  camera.position.x += (mouseX - camera.position.x ) * .05;
  camera.position.y += (-mouseY - camera.position.y ) * .05;

  renderer.render(scene, camera);
  update();
}

render();
spin();