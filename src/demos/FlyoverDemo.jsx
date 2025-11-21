import React, { useLayoutEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import CarModel from '../components/CarModel';
import * as THREE from 'three';

export default function FlyoverDemo() {
    const scroll = useScroll();
    const camera = useThree((state) => state.camera);

    useFrame(() => {
        // Move camera in a cinematic arc
        const r = 5;
        const angle = scroll.offset * Math.PI; // Half circle

        // Calculate camera position
        // Start: Front low
        // Mid: Top
        // End: Back low

        // Simple arc over the top
        camera.position.x = Math.sin(angle) * r;
        camera.position.z = Math.cos(angle) * r;
        camera.position.y = 2 + Math.sin(angle * 2) * 2; // Go up and down

        camera.lookAt(0, 0, 0);
    });

    return (
        <group position={[0, -0.5, 0]}>
            <CarModel />
            <gridHelper args={[20, 20, 0x444444, 0x222222]} />
        </group>
    );
}
