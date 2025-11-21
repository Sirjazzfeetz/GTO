import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function DropdownMenu({ demos }) {
    const [isOpen, setIsOpen] = useState(false);
    const { id } = useParams();
    const activeId = id || 'home';
    const activeDemo = demos.find(d => d.id === activeId) || demos[0];

    return (
        <div className="relative pointer-events-auto z-50">
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 bg-black/60 backdrop-blur-md border border-white/20 px-6 py-3 rounded-lg text-white hover:bg-red-600/80 hover:border-red-500 transition-all group shadow-lg"
            >
                <span className="font-['Alfa_Slab_One'] uppercase tracking-wider text-sm">
                    {activeDemo.name}
                </span>
                <ChevronDown
                    size={18}
                    className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {/* Dropdown List */}
            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                    <div className="max-h-[60vh] overflow-y-auto py-2 custom-scrollbar">
                        {demos.map((demo) => (
                            <Link
                                key={demo.id}
                                to={demo.id === 'home' ? '/' : `/demo/${demo.id}`}
                                onClick={() => setIsOpen(false)}
                                className={`block px-6 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${activeId === demo.id
                                        ? 'bg-red-600 text-white'
                                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                {demo.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
