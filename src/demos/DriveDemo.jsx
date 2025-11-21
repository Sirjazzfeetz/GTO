import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import CarModel from '../components/CarModel';

export default function DriveDemo() {
    const scroll = useScroll();
    const groupRef = useRef();
    const gridRef = useRef();

    useFrame((state, delta) => {
        // Simulate driving by moving the grid backward and vibrating the car
        const offset = scroll.offset;

        // Move grid to simulate speed
        if (gridRef.current) {
            gridRef.current.position.z = (offset * 50) % 2;
        }

        // Car vibration (engine idle + speed)
        if (groupRef.current) {
            groupRef.current.position.y = -0.5 + Math.sin(state.clock.elapsedTime * 20) * 0.002;
            // Tilt back slightly when "accelerating" (scrolling down)
            groupRef.current.rotation.x = -offset * 0.05;
        }
    });

    return (
        <>
            <group ref={groupRef} position={[0, -0.5, 0]}>
                <CarModel />
            </group>

            {/* Moving Road/Grid */}
            <group position={[0, -0.5, 0]}>
                <gridHelper ref={gridRef} args={[100, 100, 0xff0000, 0x222222]} position={[0, 0, 0]} />
            </group>
        </>
    );
}
