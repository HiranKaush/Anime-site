import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

const Model = () => {
  const group = useRef();
  const { scene, materials, animations } = useGLTF("/models/ocean/scene.gltf");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions) {
      Object.values(actions).forEach((action) => action.play());
    }
  }, [actions]);

  useEffect(() => {
    if (materials) {
      Object.values(materials).forEach((material) => {
        if (material.isMeshStandardMaterial || material.isMeshPhysicalMaterial) {
          material.transparent = false; // Ensure not transparent
          material.opacity = 1.0; // Full opacity
          material.color = new THREE.Color(0x1e3c60); // Ocean color
          material.metalness = 0.2; // Adjust metalness
          material.roughness = 0.1; // Adjust roughness
          material.envMapIntensity = 1; // Adjust environment map intensity
          material.clearcoat = 0.7; // Adjust clearcoat
          material.clearcoatRoughness = 0.1; // Adjust clearcoat roughness
          material.side = THREE.DoubleSide; // Render from both sides
          material.needsUpdate = true; // Ensure material updates
        }
      });
    }
  }, [materials]);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true; // Enable casting shadows
        child.receiveShadow = true; // Enable receiving shadows
        if (child.material) {
          child.material.needsUpdate = true; // Update material if needed
        }
      }
    });
  }, [scene]);

  return <primitive ref={group} object={scene} />;
};

export default Model;
