import * as THREE from 'three';

// variables
const imageContainer = document.getElementById("imageContainer");
const imageElement = document.getElementById("myImage");

let scene, camera, renderer, planeMesh;

// for smooth transitions between base and hover states
let currentState = { mousePosition: { x: 0, y: 0 }, waveIntensity: 0.005 };
let targetState = { mousePosition: { x: 0, y: 0 }, waveIntensity: 0.005 };

const ANIMATION_CONFIG = {
  transitionSpeed: 0.03,
  baseIntensity: 0.005,
  hoverIntensity: 0.009
};

// shaders
const vertexShader = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const fragmentShader = `
    uniform float u_time;
    uniform vec2 u_mouse;
    uniform float u_intensity;
    uniform sampler2D u_texture;
    varying vec2 vUv;

    void main() {
        vec2 uv = vUv;
        float wave1 = sin(uv.x * 10.0 + u_time * 0.5 + u_mouse.x * 5.0) * u_intensity;
        float wave2 = sin(uv.y * 12.0 + u_time * 0.8 + u_mouse.y * 4.0) * u_intensity;
        float wave3 = cos(uv.x * 8.0 + u_time * 0.5 + u_mouse.x * 3.0) * u_intensity;
        float wave4 = cos(uv.y * 9.0 + u_time * 0.7 + u_mouse.y * 3.5) * u_intensity;

        uv.y += wave1 + wave2;
        uv.x += wave3 + wave4;
        
        gl_FragColor = texture2D(u_texture, uv);
    }
`;

function initializeScene(texture) {
  //   camera setup
  camera = new THREE.PerspectiveCamera(
    80,
    imageElement.offsetWidth / imageElement.offsetHeight,
    0.01,
    10
  );
  camera.position.z = 1;

  //   scene creation
  scene = new THREE.Scene();

  //   uniforms
  const shaderUniforms = {
    u_time: { type: "f", value: 1.0 },
    u_mouse: { type: "v2", value: new THREE.Vector2() },
    u_intensity: { type: "f", value: currentState.waveIntensity },
    u_texture: { type: "t", value: texture }
  };

  //   create a plane mesh with materials
  planeMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2),
    new THREE.ShaderMaterial({
      uniforms: shaderUniforms,
      vertexShader,
      fragmentShader
    })
  );

  //   add mesh to the scene
  scene.add(planeMesh);

  //   render
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(imageElement.offsetWidth, imageElement.offsetHeight);

  //   create a canvas
  imageContainer.appendChild(renderer.domElement);
  
  imageContainer.addEventListener("mousemove", handleMouseMove, false);
}

// use the existing image from html in the canvas
initializeScene(new THREE.TextureLoader().load(imageElement.src));

animateScene();


function animateScene() {
  requestAnimationFrame(animateScene);

  currentState.mousePosition.x = updateValue(
    targetState.mousePosition.x,
    currentState.mousePosition.x,
    ANIMATION_CONFIG.transitionSpeed
  );

  currentState.mousePosition.y = updateValue(
    targetState.mousePosition.y,
    currentState.mousePosition.y,
    ANIMATION_CONFIG.transitionSpeed
  );

  currentState.waveIntensity = updateValue(
    targetState.waveIntensity,
    currentState.waveIntensity,
    ANIMATION_CONFIG.transitionSpeed
  );

  const uniforms = planeMesh.material.uniforms;

  uniforms.u_intensity.value = currentState.waveIntensity;
  uniforms.u_time.value += 0.005;
  uniforms.u_mouse.value.set(currentState.mousePosition.x, currentState.mousePosition.y);

  renderer.render(scene, camera);
}

function updateValue(targetState, current, transitionSpeed) {
  return current + (targetState - current) * transitionSpeed;
}

// event listener
imageContainer.addEventListener("mouseover", handleMouseOver, false);
imageContainer.addEventListener("mouseout", handleMouseOut, false);

function handleMouseMove(event) {
    const rect = imageContainer.getBoundingClientRect();
    targetState.mousePosition.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    targetState.mousePosition.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
}

function handleMouseOver() {
    targetState.waveIntensity = ANIMATION_CONFIG.hoverIntensity;
}

function handleMouseOut() {
    targetState.waveIntensity = ANIMATION_CONFIG.baseIntensity;
    targetState.mousePosition = { x: 0, y: 0 };
}
