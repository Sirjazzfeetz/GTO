import React, { useState, Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader } from '@react-three/drei';
import Scene from './components/Scene';
import { Leva } from 'leva';
import { HashRouter, Routes, Route, Link, useParams, Navigate, useLocation } from 'react-router-dom';
import HomeDemo from './demos/HomeDemo';
import MagnumTuneDemo from './demos/MagnumTuneDemo';
import SpinDemo from './demos/SpinDemo';
import FlyoverDemo from './demos/FlyoverDemo';
import DriveDemo from './demos/DriveDemo';
import ZoomDemo from './demos/ZoomDemo';
import WireframeDemo from './demos/WireframeDemo';
import ColorShiftDemo from './demos/ColorShiftDemo';
import ExplodeDemo from './demos/ExplodeDemo';
import ParallaxDemo from './demos/ParallaxDemo';
import LightsDemo from './demos/LightsDemo';
import DriftDemo from './demos/DriftDemo';
import DropdownMenu from './components/DropdownMenu';

const DEMOS = [
    { id: 'home', name: 'Home' },
    { id: 'spin', name: '360 Spin' },
    { id: 'flyover', name: 'Camera Flyover' },
    { id: 'drive', name: 'Drive Path' },
    { id: 'zoom', name: 'Zoom Details' },
    { id: 'wireframe', name: 'Wireframe Transition' },
    { id: 'colors', name: 'Color Shift' },
    { id: 'explode', name: 'Exploded View' },
    { id: 'parallax', name: 'Parallax Env' },
    { id: 'lights', name: 'Day/Night' },
    { id: 'drift', name: 'Drift Effect' },
];

function DemoPage({ activeCar, isHome = false }) {
    const { id } = useParams();
    // Validate ID, fallback to spin if invalid, or 'home' if isHome is true
    const activeDemo = isHome ? 'home' : (DEMOS.find(d => d.id === id) ? id : 'spin');

    return (
        <>
            {/* 3D Scene Layer */}
            <div className="absolute inset-0 z-0">
                <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
                    <Suspense fallback={null}>
                        <Scene key={activeDemo} activeDemo={activeDemo} activeCar={activeCar} isHome={isHome} />
                    </Suspense>
                </Canvas>
                <Loader />
            </div>
        </>
    );
}

function Layout() {
    const activeCar = 'classic';

    return (
        <div className="w-full h-screen bg-black relative overflow-hidden font-sans text-white">
            {/* UI Overlay */}
            <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-4 md:p-6">
                {/* Header & Navigation */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 pointer-events-auto w-full max-w-7xl mx-auto">
                    <header className="flex flex-col items-center md:items-start justify-center py-2 md:py-4">
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl md:text-6xl font-['Alfa_Slab_One'] tracking-wider text-white drop-shadow-[0_4px_0_rgba(220,38,38,0.8)] transform -skew-x-6">
                                MAGNUM P.I. <span className="text-red-600">FERRARI</span>
                            </h1>
                            <p className="text-gray-300 text-[0.6rem] md:text-sm tracking-[0.4em] uppercase mt-2 font-bold bg-black/40 inline-block px-2 py-1 backdrop-blur-sm border-l-2 border-red-600">
                                Premium Scroll Experience
                            </p>
                        </div>
                    </header>

                    {/* Navigation Dropdown */}
                    <div className="relative z-50">
                        <DropdownMenu demos={DEMOS} />
                    </div>
                </div>
            </div>

            {/* Content */}
            <Routes>
                <Route path="/" element={<DemoPage activeCar={activeCar} isHome={true} />} />
                <Route path="/demo/:id" element={<DemoPage activeCar={activeCar} />} />
                <Route path="*" element={<Navigate to="/demo/spin" replace />} />
            </Routes>

            <Leva hidden />
        </div>
    );
}

function App() {
    return (
        <HashRouter>
            <Layout />
        </HashRouter>
    );
}

export default App;
