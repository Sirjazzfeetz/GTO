import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import CarModel from '../components/CarModel';
import * as THREE from 'three';

export default function WireframeDemo() {
    const scroll = useScroll();
    const groupRef = useRef();

    useFrame(() => {
        const offset = scroll.offset;

        if (groupRef.current) {
            // Rotate slightly
            groupRef.current.rotation.y = offset * Math.PI;

            // Traverse and update materials
            groupRef.current.traverse((obj) => {
                if (obj.isMesh && obj.material) {
                    // We can't easily swap to wireframe non-destructively without cloning, 
                    // but for a demo we can toggle the wireframe property.
                    // A better way is to use a custom shader or effect, but this is simple.

                    // Threshold for wireframe effect
                    const isWireframe = offset > 0.5;
                    obj.material.wireframe = isWireframe;

                    if (isWireframe) {
                        obj.material.color.setHex(0x00ff00); // Matrix green
                        obj.material.emissive.setHex(0x003300);
                    } else {
                        obj.material.color.setHex(0xff0000); // Back to red
                        obj.material.emissive.setHex(0x000000);
                    }
                }
            });
        }
    });

    return (
        <group ref={groupRef} position={[0, -0.5, 0]}>
            <CarModel />
        </group>
    );
}
