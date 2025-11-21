import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import CarModel from '../components/CarModel';
import * as THREE from 'three';

export default function ColorShiftDemo({ activeCar }) {
    const scroll = useScroll();
    const groupRef = useRef();

    useFrame(() => {
        const offset = scroll.offset;

        if (groupRef.current) {
            groupRef.current.rotation.y = offset * Math.PI;

            // Calculate color based on scroll
            // Red -> Blue -> Green -> Gold
            const hue = offset; // 0 to 1
            const color = new THREE.Color().setHSL(hue, 1, 0.5);

            groupRef.current.traverse((obj) => {
                if (obj.isMesh && obj.material) {
                    // Only change the body color (assuming it's the main material)
                    // Since we don't know the exact material name, we'll change all red-ish materials
                    // or just all materials for the demo effect.
                    obj.material.color.copy(color);
                }
            });
        }
    });

    return (
        <group ref={groupRef} position={[0, -0.5, 0]}>
            <CarModel activeCar={activeCar} />
        </group>
    );
}
