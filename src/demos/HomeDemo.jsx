import React, { useEffect, useRef, useState } from 'react';
import { OrbitControls, Html } from '@react-three/drei';
import CarModel from '../components/CarModel';
import { Volume2, VolumeX, Hand } from 'lucide-react';

export default function HomeDemo({ activeCar }) {
    const [isMuted, setIsMuted] = useState(false);
    const widgetRef = useRef(null);

    useEffect(() => {
        // Load SoundCloud Widget API
        const script = document.createElement('script');
        script.src = 'https://w.soundcloud.com/player/api.js';
    }
