import React, { useEffect, useRef, useState } from 'react';
import { OrbitControls, Html } from '@react-three/drei';
import CarModel from '../components/CarModel';
import { Volume2, VolumeX } from 'lucide-react';

export default function HomeDemo({ activeCar }) {
    const [isMuted, setIsMuted] = useState(false);
    const widgetRef = useRef(null);

    useEffect(() => {
        // Load SoundCloud Widget API
        const script = document.createElement('script');
        script.src = 'https://w.soundcloud.com/player/api.js';
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            const iframe = document.getElementById('sc-widget');
            if (iframe && window.SC) {
                widgetRef.current = window.SC.Widget(iframe);

                widgetRef.current.bind(window.SC.Widget.Events.READY, () => {
                    // Auto-play when ready
                    widgetRef.current.play();
                    widgetRef.current.setVolume(100);
                });
            }
        };

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    const toggleMute = () => {
        if (widgetRef.current) {
            if (isMuted) {
                widgetRef.current.setVolume(100);
            } else {
                widgetRef.current.setVolume(0);
            }
            setIsMuted(!isMuted);
        }
    };

    return (
        <>
            <group position={[0, -0.5, 0]}>
                <CarModel activeCar={activeCar} />
            </group>

            <OrbitControls
                enablePan={false}
                enableZoom={true}
                minDistance={3}
                maxDistance={10}
                autoRotate
                autoRotateSpeed={0.5}
            />

            <Html fullscreen style={{ pointerEvents: 'none' }}>
                <div className="w-full h-full relative">
                    {/* Instructions - Positioned very high */}
                    <div className="absolute bottom-[28rem] left-1/2 transform -translate-x-1/2 flex flex-col items-center w-full">
                        <div className="text-xs text-gray-500 uppercase tracking-widest font-mono">
                            Scroll to interact • Drag to rotate
                        </div>
                    </div>

                    {/* Sound button and CTA Text */}
                    <div className="absolute bottom-60 left-1/2 transform -translate-x-1/2 flex flex-col items-center w-full gap-6">
                        {/* Mute/Unmute Button */}
                        <button
                            onClick={toggleMute}
                            className="pointer-events-auto bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-110 border-2 border-red-400"
                            aria-label={isMuted ? 'Unmute' : 'Mute'}
                        >
                            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                        </button>

                        <div className="text-2xl font-light tracking-[0.2em] uppercase text-center animate-shimmer whitespace-nowrap">
                            New Scroll Transitions added to Menu
                        </div>
                    </div>
                </div>

                {/* Hidden SoundCloud iframe */}
                <iframe
                    id="sc-widget"
                    width="100%"
                    height="166"
                    scrolling="no"
                    frameBorder="no"
                    allow="autoplay"
                    src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/holden-jones-402363783/magnum-p-i-extended-theme-song&color=%23ff5500&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false"
                    style={{ display: 'none' }}
                />
            </Html>
        </>
    );
}
