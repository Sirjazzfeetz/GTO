import React, { useRef, useMemo, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SkeletonUtils } from 'three-stdlib';

export default function CarModel({ activeCar = 'classic', ...props }) {
  const baseUrl = import.meta.env.BASE_URL;
  const modelPath = activeCar === 'modern'
    ? `${baseUrl}models/ferrari_modern.glb`
    : `${baseUrl}models/ferrari_classic2.glb`;

  console.log(`CarModel: Loading ${activeCar} car from ${modelPath}`);

  const { scene } = useGLTF(modelPath);

  // Clone the scene to avoid sharing state between instances
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);

  // Apply materials and normalize transform
  useEffect(() => {
    if (!clone) return;

    // 1. Fix Materials
    clone.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
        if (obj.material) {
          obj.material = obj.material.clone();
          obj.material.envMapIntensity = 1.5;
          obj.material.needsUpdate = true;
        }
      }
    });

    // 2. Normalize Scale & Position (Auto-center)
    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);

    // Calculate scale factor to fit in a 4-unit box (approx car size)
    const maxDim = Math.max(size.x, size.y, size.z);
    const targetSize = 4.5; // Approximate length of a car in Three.js units
    const scale = targetSize / maxDim;

    clone.scale.setScalar(scale);

    // Re-center after scaling
    // We want the bottom of the car to be at y=0
    clone.position.x = -center.x * scale;
    clone.position.y = -box.min.y * scale; // Align bottom to 0
    clone.position.z = -center.z * scale;

    console.log(`CarModel: Auto-scaled ${activeCar} by ${scale.toFixed(4)}. Size: ${size.x.toFixed(2)}x${size.y.toFixed(2)}x${size.z.toFixed(2)}`);

  }, [clone, activeCar]);

  return <primitive object={clone} rotation={[0, Math.PI, 0]} {...props} />;
}

// Preload with correct base URL
const baseUrl = import.meta.env.BASE_URL;
useGLTF.preload(`${baseUrl}models/ferrari_classic2.glb`);
useGLTF.preload(`${baseUrl}models/ferrari_modern.glb`);
