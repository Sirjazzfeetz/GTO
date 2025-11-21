import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import CarModel from '../components/CarModel';
import * as THREE from 'three';

function FloatingElement({ position, speed, color }) {
    const ref = useRef();
    const scroll = useScroll();

    useFrame(() => {
        if (ref.current) {
            // Move based on scroll offset * speed
            ref.current.position.y = position[1] + scroll.offset * speed;
            ref.current.rotation.x += 0.01;
            ref.current.rotation.y += 0.01;
        }
    });

    return (
        <mesh ref={ref} position={position}>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial color={color} />
        </mesh>
    );
}

export default function ParallaxDemo() {
    const scroll = useScroll();
    const carRef = useRef();

    useFrame(() => {
        if (carRef.current) {
            carRef.current.rotation.y = scroll.offset * Math.PI * 0.2;
        }
    });

    return (
        <group>
            <group ref={carRef} position={[0, -0.5, 0]}>
                <CarModel />
            </group>

            {/* Background Elements */}
            <FloatingElement position={[-2, 0, -2]} speed={5} color="red" />
            <FloatingElement position={[2, 2, -3]} speed={-3} color="blue" />
            <FloatingElement position={[-3, 3, -1]} speed={8} color="yellow" />
            <FloatingElement position={[3, -1, -4]} speed={2} color="green" />
            <FloatingElement position={[0, 4, -5]} speed={-6} color="purple" />
        </group>
    );
}
