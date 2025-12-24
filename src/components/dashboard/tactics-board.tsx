'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MousePointer2, Settings2, RotateCcw } from 'lucide-react';

interface Player {
    id: number;
    x: number;
    y: number;
    name: string;
    number: number;
    role: string;
}

const INITIAL_442: Player[] = [
    { id: 1, x: 50, y: 90, name: 'G. Keeper', number: 1, role: 'GK' },
    { id: 2, x: 15, y: 70, name: 'L. Back', number: 3, role: 'LB' },
    { id: 3, x: 38, y: 75, name: 'C. Back', number: 4, role: 'CB' },
    { id: 4, x: 62, y: 75, name: 'C. Back', number: 5, role: 'CB' },
    { id: 5, x: 85, y: 70, name: 'R. Back', number: 2, role: 'RB' },
    { id: 6, x: 15, y: 45, name: 'L. Mid', number: 11, role: 'LM' },
    { id: 7, x: 38, y: 50, name: 'C. Mid', number: 8, role: 'CM' },
    { id: 8, x: 62, y: 50, name: 'C. Mid', number: 6, role: 'CM' },
    { id: 9, x: 85, y: 45, name: 'R. Mid', number: 7, role: 'RM' },
    { id: 10, x: 40, y: 20, name: 'Forward', number: 9, role: 'ST' },
    { id: 11, x: 60, y: 20, name: 'Forward', number: 10, role: 'ST' },
];

export function TacticsBoard() {
    const [players, setPlayers] = useState<Player[]>(INITIAL_442);
    const [draggingId, setDraggingId] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const handlePointerDown = (id: number) => {
        setDraggingId(id);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (draggingId === null || !containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        // Clamp values between 0 and 100
        const clampedX = Math.max(2, Math.min(98, x));
        const clampedY = Math.max(2, Math.min(98, y));

        setPlayers(prev => prev.map(p =>
            p.id === draggingId ? { ...p, x: clampedX, y: clampedY } : p
        ));
    };

    const handlePointerUp = () => {
        setDraggingId(null);
    };

    const resetFormation = () => {
        setPlayers(INITIAL_442);
    };

    return (
        <div className="flex flex-col h-full space-y-4">
            {/* Header / Controls */}
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-wts-green/10 rounded-lg">
                        <MousePointer2 size={18} className="text-wts-green" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest">Tactical Arena</h3>
                        <p className="text-[10px] text-gray-500 uppercase font-mono">11 v 11 · Interactive Board</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={resetFormation}
                        className="p-2 hover:bg-white/5 rounded-lg text-gray-500 hover:text-white transition-all flex items-center space-x-2"
                    >
                        <RotateCcw size={16} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Reset</span>
                    </button>
                    <button className="p-2 hover:bg-white/5 rounded-lg text-gray-500 hover:text-white transition-all">
                        <Settings2 size={16} />
                    </button>
                </div>
            </div>

            {/* The Pitch Container */}
            <div
                ref={containerRef}
                className="relative flex-1 bg-[#0A120A] rounded-2xl border border-white/5 overflow-hidden shadow-2xl touch-none select-none group/pitch"
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
            >
                {/* Global Pitch Texture */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:32px_32px]" />

                {/* SVG Pitch Markings */}
                <svg className="absolute inset-0 w-full h-full p-4 pointer-events-none stroke-white/20 fill-none" viewBox="0 0 100 140" preserveAspectRatio="none">
                    {/* Pitch Boundary */}
                    <rect x="2" y="2" width="96" height="136" rx="2" strokeWidth="0.5" />

                    {/* Halfway Line & Circle */}
                    <line x1="2" y1="70" x2="98" y2="70" strokeWidth="0.5" />
                    <circle cx="50" cy="70" r="10" strokeWidth="0.5" />
                    <circle cx="50" cy="70" r="0.5" fill="currentColor" />

                    {/* Penalty Areas (Top) */}
                    <path d="M25,2 L25,22 L75,22 L75,2" strokeWidth="0.5" />
                    <path d="M38,2 L38,8 L62,8 L62,2" strokeWidth="0.5" />
                    <path d="M40,22 Q50,30 60,22" strokeWidth="0.5" />
                    <circle cx="50" cy="15" r="0.5" fill="currentColor" />

                    {/* Penalty Areas (Bottom) */}
                    <path d="M25,138 L25,118 L75,118 L75,138" strokeWidth="0.5" />
                    <path d="M38,138 L38,132 L62,132 L62,138" strokeWidth="0.5" />
                    <path d="M40,118 Q50,110 60,118" strokeWidth="0.5" />
                    <circle cx="50" cy="125" r="0.5" fill="currentColor" />

                    {/* Corner Arcs */}
                    <path d="M2,5 Q5,5 5,2" strokeWidth="0.5" />
                    <path d="M98,5 Q95,5 95,2" strokeWidth="0.5" />
                    <path d="M2,135 Q5,135 5,138" strokeWidth="0.5" />
                    <path d="M98,135 Q95,135 95,138" strokeWidth="0.5" />
                </svg>

                {/* Player Nodes */}
                {players.map((player) => (
                    <div
                        key={player.id}
                        className={`absolute w-10 h-10 -ml-5 -mt-5 flex items-center justify-center cursor-grab active:cursor-grabbing transition-transform duration-75 ${draggingId === player.id ? 'z-50 scale-125' : 'z-20'}`}
                        style={{
                            left: `${player.x}%`,
                            top: `${player.y}%`,
                            touchAction: 'none'
                        }}
                        onPointerDown={() => handlePointerDown(player.id)}
                    >
                        {/* Player Glow */}
                        <div className={`absolute inset-0 rounded-full blur-[8px] opacity-40 ${player.role === 'GK' ? 'bg-yellow-400' : 'bg-wts-green'}`} />

                        {/* Player Circle */}
                        <div className={`relative w-8 h-8 rounded-full border-2 border-black flex items-center justify-center shadow-lg transition-colors ${player.role === 'GK' ? 'bg-yellow-400 text-black' : 'bg-wts-green text-black'} ${draggingId === player.id ? 'ring-2 ring-white border-none' : ''}`}>
                            <span className="text-[10px] font-black">{player.number}</span>
                        </div>

                        {/* Player Name Tag */}
                        <div className="absolute -bottom-6 whitespace-nowrap px-2 py-0.5 bg-black/80 backdrop-blur-md rounded border border-white/10 shadow-xl pointer-events-none transition-opacity opacity-0 group-hover/pitch:opacity-100">
                            <span className="text-[8px] font-bold text-white uppercase tracking-widest">{player.name}</span>
                        </div>
                    </div>
                ))}

                {/* Tactics Ticker / Info Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <div className="bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full">
                        <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Formation: </span>
                        <span className="text-[8px] font-bold text-wts-green uppercase tracking-widest">Custom 4-4-2</span>
                    </div>
                    <div className="bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full">
                        <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Active Players: </span>
                        <span className="text-[8px] font-bold text-white uppercase tracking-widest">11 / 11</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
