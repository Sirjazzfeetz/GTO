import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import CarModel from '../components/CarModel';
import * as THREE from 'three';

export default function LightsDemo() {
    const scroll = useScroll();
    const lightRef = useRef();
    const carRef = useRef();

    useFrame(() => {
        const offset = scroll.offset;

        if (lightRef.current) {
            // Move light in a circle
            const angle = offset * Math.PI * 2;
            lightRef.current.position.x = Math.sin(angle) * 5;
            lightRef.current.position.z = Math.cos(angle) * 5;

            // Change color
            const hue = offset;
            lightRef.current.color.setHSL(hue, 1, 0.5);
        }

        if (carRef.current) {
            carRef.current.rotation.y = -offset * Math.PI * 0.5;
        }
    });

    return (
        <group>
            <group ref={carRef} position={[0, -0.5, 0]}>
                <CarModel />
            </group>

            {/* Dynamic Light */}
            <pointLight ref={lightRef} position={[0, 3, 3]} intensity={2} distance={10} castShadow />

            {/* Ambient dim */}
            <ambientLight intensity={0.1} />
        </group>
    );
}
