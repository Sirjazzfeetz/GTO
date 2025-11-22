import React, { useRef, useEffect } from 'react';
import { Environment, PerspectiveCamera, OrbitControls, ContactShadows } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import CarModel from './CarModel';
import { ScrollControls, Scroll } from '@react-three/drei';
import LandingOverlay from './LandingOverlay';

// Import Demos
import SpinDemo from '../demos/SpinDemo';
import FlyoverDemo from '../demos/FlyoverDemo';
import DriveDemo from '../demos/DriveDemo';
import ZoomDemo from '../demos/ZoomDemo';
import WireframeDemo from '../demos/WireframeDemo';
import ColorShiftDemo from '../demos/ColorShiftDemo';
import ExplodeDemo from '../demos/ExplodeDemo';
import ParallaxDemo from '../demos/ParallaxDemo';
import LightsDemo from '../demos/LightsDemo';
import DriftDemo from '../demos/DriftDemo';
import HomeDemo from '../demos/HomeDemo';
import MagnumTuneDemo from '../demos/MagnumTuneDemo';

function CameraHandler({ activeDemo }) {
    const { camera, size } = useThree();

    useEffect(() => {
        // Reset camera to default state when demo changes
        // Check for portrait mode (aspect ratio < 1)
        const isPortrait = size.width / size.height < 1;
        const defaultZ = isPortrait ? 14 : 10; // Zoom out more on mobile portrait

        camera.position.set(0, 0, defaultZ);
        camera.rotation.set(0, 0, 0);
        camera.zoom = 1;
        camera.fov = 50;
        camera.updateProjectionMatrix();
        camera.lookAt(0, 0, 0);
    }, [activeDemo, camera, size.width, size.height]);

    return null;
}

const demoConfig = {
    home: { pages: 1, Component: HomeDemo },
    'magnum-tune': { pages: 1, Component: MagnumTuneDemo },
    spin: { pages: 5, Component: SpinDemo },
    flyover: { pages: 5, Component: FlyoverDemo },
    drive: { pages: 5, Component: DriveDemo },
    zoom: { pages: 4, Component: ZoomDemo },
    wireframe: { pages: 3, Component: WireframeDemo },
    colors: { pages: 4, Component: ColorShiftDemo },
    explode: { pages: 4, Component: ExplodeDemo },
    parallax: { pages: 3, Component: ParallaxDemo },
    lights: { pages: 4, Component: LightsDemo },
    drift: { pages: 5, Component: DriftDemo },
};

export default function Scene({ activeDemo, activeCar, isHome }) {
    const { pages, Component } = demoConfig[activeDemo] || demoConfig.spin;

    return (
        <>
            <CameraHandler activeDemo={activeDemo} />
            <color attach="background" args={['#111']} />

            {/* Global Lighting & Environment */}
            <Environment preset="city" />
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

            <ScrollControls pages={pages} damping={0.2}>
                {/* The Demo Component controls the camera and car based on scroll */}
                <Component activeCar={activeCar} />

                {/* Landing Page Content Overlay */}
                <LandingOverlay activeCar={activeCar} activeDemo={activeDemo} isHome={isHome} />

                {/* Base Scene Elements (can be overridden by demos if needed) */}
                <group position={[0, -0.5, 0]}>
                    {/* Car is rendered inside the specific Demo component if it needs custom manipulation, 
               OR we pass a ref. For simplicity, let's have the Demo component render the car 
               so it can wrap it or manipulate it directly. */}
                </group>
            </ScrollControls>
        </>
    );
}
