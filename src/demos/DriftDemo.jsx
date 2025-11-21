import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import CarModel from '../components/CarModel';
import * as THREE from 'three';

export default function DriftDemo() {
    const scroll = useScroll();
    const groupRef = useRef();

    useFrame(() => {
        const offset = scroll.offset;

        if (groupRef.current) {
            // Simulate drift movement
            // Move forward (z) and slide sideways (x) while rotating (y)

            const t = offset * 20; // Increase distance significantly

            // Path: S-curve
            groupRef.current.position.z = -t + 17; // Start at 17 (far behind camera), end at -3 (same finish)
            groupRef.current.position.x = Math.sin(t * 0.5) * 3;

            // Drift angle: Face the direction of travel + drift angle
            const derivative = Math.cos(t * 0.5) * 1.5; // dx/dt
            const angle = Math.atan2(derivative, -1); // dz/dt is -1

            // Add "drift" offset to rotation
            groupRef.current.rotation.y = angle + (Math.sin(t) * 0.5);

            // Tilt body
            groupRef.current.rotation.z = -derivative * 0.1;
        }
    });

    return (
        <group ref={groupRef} position={[0, -0.5, 0]}>
            <CarModel />
            {/* Skid marks or ground reference */}
            <gridHelper args={[100, 100, 0x555555, 0x222222]} position={[0, 0, 0]} />
        </group>
    );
}
