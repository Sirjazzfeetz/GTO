import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import CarModel from '../components/CarModel';

export default function SpinDemo({ activeCar }) {
    const groupRef = useRef();
    const scroll = useScroll();

    useFrame(() => {
        // Rotate the group based on scroll offset (0 to 1)
        // Full 360 rotation (2 * PI)
        if (groupRef.current) {
            groupRef.current.rotation.y = scroll.offset * Math.PI * 2;
        }
    });

    return (
        <group ref={groupRef}>
            <CarModel activeCar={activeCar} />
        </group>
    );
}
