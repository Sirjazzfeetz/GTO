import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import CarModel from '../components/CarModel';
import * as THREE from 'three';

export default function ExplodeDemo() {
    const scroll = useScroll();
    const groupRef = useRef();

    useFrame(() => {
        const offset = scroll.offset;

        if (groupRef.current) {
            // Rotate slowly
            groupRef.current.rotation.y = offset * Math.PI * 0.5;

            // "Explode" effect: Scale up and disperse
            // Since we can't easily move individual parts without knowing the hierarchy,
            // we'll simulate an "exploded view" by scaling the whole group up 
            // and maybe moving it towards the camera while rotating.
            // OR we can try to traverse and move meshes away from center if they have offsets.

            // Let's try a simple scale/warp effect that looks like it's expanding
            const scale = 1 + offset * 0.5;
            groupRef.current.scale.set(scale, scale, scale);

            // And maybe separate the wheels if we could find them, but for now:
            // We'll just add a "scanning" effect with a plane
        }
    });

    return (
        <group ref={groupRef} position={[0, -0.5, 0]}>
            <CarModel />
            {/* Scanning Plane */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, scroll.offset * 2, 0]}>
                <planeGeometry args={[5, 5]} />
                <meshBasicMaterial color="cyan" transparent opacity={0.2} side={THREE.DoubleSide} />
            </mesh>
        </group>
    );
}
