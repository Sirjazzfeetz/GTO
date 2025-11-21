import React from 'react';
import { Scroll } from '@react-three/drei';

export default function LandingOverlay({ activeCar, activeDemo, isHome }) {
    const isModern = activeCar === 'modern';

    if (isHome || activeDemo === 'home') return null;

    return (
        <Scroll html style={{ width: '100%', height: '100%' }}>
            <div className="w-screen h-full relative">

                {/* Section 1: Hero Title */}
                {activeDemo !== 'home' && (
                    <section className="h-screen flex flex-col items-start justify-center pl-20 pointer-events-none">
                        <h1 className="text-8xl font-black text-white tracking-tighter leading-none mix-blend-difference">
                            {isModern ? 'FUTURE' : 'LEGEND'}<br />
                            {isModern ? 'DEFINED' : 'REBORN'}
                        </h1>
                        <p className="text-xl text-red-500 font-bold tracking-widest mt-4 uppercase">
                            {isModern ? 'The Ferrari Modern Concept' : 'The OG, Magnum P.I. Ferrari'}
                        </p>
                    </section>
                )}



                {/* Section 3: Design Details */}
                <section className="h-screen flex items-center justify-start pl-20 pointer-events-none">
                    <div className="text-left">
                        <h2 className="text-6xl font-bold text-white mb-4">
                            {isModern ? 'DIGITAL COCKPIT' : 'TIMELESS DESIGN'}
                        </h2>
                        <p className="text-gray-400 text-lg max-w-md">
                            {isModern
                                ? 'Advanced avionics and a driver-focused interface for the digital age.'
                                : 'Aggressive lines, functional aerodynamics, and that iconic silhouette. Every curve serves a purpose.'}
                        </p>
                    </div>
                </section>

                {/* Section 4: CTA */}
                <section className="h-screen flex flex-col items-center justify-center pointer-events-none">
                    <h2 className="text-5xl font-bold text-white mb-8">
                        {isModern ? 'DRIVE THE FUTURE' : 'EXPERIENCE THE LEGEND'}
                    </h2>
                    <button className="pointer-events-auto bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-12 rounded-full text-xl transition-all transform hover:scale-105 shadow-lg shadow-red-600/50">
                        CONFIGURE YOURS
                    </button>
                </section>
            </div>
        </Scroll>
    );
}
