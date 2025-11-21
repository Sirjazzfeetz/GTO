import React from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import CarModel from '../components/CarModel';
import * as THREE from 'three';

export default function ZoomDemo() {
    const scroll = useScroll();
    const camera = useThree((state) => state.camera);

    useFrame(() => {
        const offset = scroll.offset;

        // Define keyframes for camera position
        // 0: Front
        // 0.33: Wheel
        // 0.66: Rear
        // 1.0: Top

        if (offset < 0.33) {
            // Zoom to wheel
            const t = offset / 0.33;
            camera.position.lerp(new THREE.Vector3(1.5, 0.5, 1.5), t * 0.1);
            camera.lookAt(0, 0, 0);
        } else if (offset < 0.66) {
            // Zoom to rear
            const t = (offset - 0.33) / 0.33;
            camera.position.lerp(new THREE.Vector3(0, 1, -3), t * 0.1);
            camera.lookAt(0, 0.5, 0);
        } else {
            // Zoom out to top
            const t = (offset - 0.66) / 0.34;
            camera.position.lerp(new THREE.Vector3(0, 5, 0), t * 0.1);
            camera.lookAt(0, 0, 0);
        }
    });

    return (
        <group position={[0, -0.5, 0]}>
            <CarModel />
        </group>
    );
}
