import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const WaveImage = ({ src, id }) => {
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let scene, camera, renderer, planeMesh;
    let currentState = { mousePosition: { x: 0, y: 0 }, waveIntensity: 0.005 };
    let targetState = { mousePosition: { x: 0, y: 0 }, waveIntensity: 0.005 };

    const ANIMATION_CONFIG = {
      transitionSpeed: 0.03,
      baseIntensity: 0.005,
      hoverIntensity: 0.009
    };

    const vertexShader = `...`;
    const fragmentShader = `...`;

    // function initializeScene(texture) {
    //   camera = new THREE.PerspectiveCamera(
    //     80,
    //     containerRef.current.offsetWidth / containerRef.current.offsetHeight,
    //     0.01,
    //     10
    //   );
    //   camera.position.z = 1;
    //   scene = new THREE.Scene();

      // const shaderUniforms = {
      //   u_time: { type: "f", value: 1.0 },
      //   u_mouse: { type: "v2", value: new THREE.Vector2() },
      //   u_intensity: { type: "f", value: currentState.waveIntensity },
      //   u_texture: { type: "t", value: texture }
      // };

      // planeMesh = new THREE.Mesh(
      //   new THREE.PlaneGeometry(2, 2),
      //   new THREE.ShaderMaterial({
      //     uniforms: shaderUniforms,
      //     vertexShader,
      //     fragmentShader
      //   })
      // );

      scene.add(planeMesh);
      renderer = new THREE.WebGLRenderer();
      renderer.setSize(containerRef.current.offsetWidth, containerRef.current.offsetHeight);
      containerRef.current.appendChild(renderer.domElement);
    }

    // function animateScene() {
    //   const updateValue = (target, current, speed) => {
    //     return current + (target - current) * speed;
    //   };

    //   requestAnimationFrame(animateScene);

    //   currentState.mousePosition.x = updateValue(
    //     targetState.mousePosition.x,
    //     currentState.mousePosition.x,
    //     ANIMATION_CONFIG.transitionSpeed
    //   );

    //   currentState.mousePosition.y = updateValue(
    //     targetState.mousePosition.y,
    //     currentState.mousePosition.y,
    //     ANIMATION_CONFIG.transitionSpeed
    //   );

    //   currentState.waveIntensity = updateValue(
    //     targetState.waveIntensity,
    //     currentState.waveIntensity,
    //     ANIMATION_CONFIG.transitionSpeed
    //   );

    //   const uniforms = planeMesh.material.uniforms;
    //   uniforms.u_intensity.value = currentState.waveIntensity;
    //   uniforms.u_time.value += 0.005;
    //   uniforms.u_mouse.value.set(currentState.mousePosition.x, currentState.mousePosition.y);

    //   renderer.render(scene, camera);
    // }

    // function handleMouseMove(event) {
    //   const rect = containerRef.current.getBoundingClientRect();
    //   targetState.mousePosition.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    //   targetState.mousePosition.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    // }

    // function handleMouseOver() {
    //   targetState.waveIntensity = ANIMATION_CONFIG.hoverIntensity;
    // }

    // function handleMouseOut() {
    //   targetState.waveIntensity = ANIMATION_CONFIG.baseIntensity;
    //   targetState.mousePosition = { x: 0, y: 0 };
    // }

    // const textureLoader = new THREE.TextureLoader();
    // textureLoader.load(imageRef.current.src, (texture) => {
    //   initializeScene(texture);
    //   animateScene();
    //   containerRef.current.addEventListener("mousemove", handleMouseMove);
    //   containerRef.current.addEventListener("mouseover", handleMouseOver);
    //   containerRef.current.addEventListener("mouseout", handleMouseOut);
    // });

    return () => {
      renderer.domElement && renderer.domElement.remove();
      containerRef.current.removeEventListener("mousemove", handleMouseMove);
      containerRef.current.removeEventListener("mouseover", handleMouseOver);
      containerRef.current.removeEventListener("mouseout", handleMouseOut);
    };
  }, [src]); // Reload only if the src changes

  return (
    <div ref={containerRef} className="imageContainer" id={id}>
      <img ref={imageRef} src={src} alt="" style={{ }} />
    </div>
  );
};

export default WaveImage;
