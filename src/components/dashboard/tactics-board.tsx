'use client';

import React, { useState, useRef } from 'react';
import { MousePointer2, Settings2, RotateCcw, Trash2 } from 'lucide-react';
import { getPlayerDisplayNames } from '@/lib/utils';
import { setDragGhost } from '@/lib/drag-utils';
import Image from 'next/image';

export interface Player {
    id: number;
    x: number;
    y: number;
    name: string;
    number: number;
    role: string;
    nationality?: string;
}

interface TacticsBoardProps {
    formation: { x: number; y: number; role: string }[];
    lineup: Record<number, number>;
    squad: Array<{ id: number; name: string; number: number; position: string; nationality?: string }>;
    onDrop: (playerId: number, index: number) => void;
    onNodeClick: (playerId: number, currentRole: string) => void;
    onReset?: () => void;
    onClear?: () => void;
}

export function TacticsBoard({ formation, lineup, squad, onDrop, onNodeClick, onReset, onClear }: TacticsBoardProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const displayNames = React.useMemo(() => getPlayerDisplayNames(squad), [squad]);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        const playerId = e.dataTransfer.getData('playerId');
        if (playerId) {
            onDrop(parseInt(playerId), index);
        }
    };

    return (
        <div className="flex flex-col h-full space-y-4">
            {/* Header / Controls */}
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center space-x-3">
                    <div className="p-2.5 bg-wts-green/10 rounded-lg">
                        <MousePointer2 size={20} className="text-wts-green" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white uppercase tracking-widest">Tactics</h3>
                        <p className="text-sm text-gray-500 uppercase font-mono">11 v 11</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={onClear}
                        className="p-2.5 hover:bg-white/5 rounded-lg text-gray-500 hover:text-white transition-all flex items-center space-x-2"
                    >
                        <Trash2 size={18} />
                        <span className="text-xs font-bold uppercase tracking-widest">Clear Team</span>
                    </button>
                    <button
                        onClick={onReset}
                        className="p-2.5 hover:bg-white/5 rounded-lg text-gray-500 hover:text-white transition-all flex items-center space-x-2"
                    >
                        <RotateCcw size={18} />
                        <span className="text-xs font-bold uppercase tracking-widest">Reset</span>
                    </button>
                    <button className="p-2.5 hover:bg-white/5 rounded-lg text-gray-500 hover:text-white transition-all">
                        <Settings2 size={18} />
                    </button>
                </div>
            </div>

            {/* The Pitch Container */}
            <div className="flex-1 flex items-center justify-center min-h-0 relative">
                <div
                    ref={containerRef}
                    className="relative h-full aspect-[68/105] bg-[#0A120A] rounded-2xl border border-white/5 overflow-hidden shadow-2xl touch-none select-none group/pitch"
                >
                    {/* Global Pitch Texture */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:32px_32px]" />

                    {/* SVG Pitch Markings */}
                    <svg className="absolute inset-0 w-full h-full p-4 pointer-events-none stroke-white/20 fill-none" viewBox="0 0 68 105" preserveAspectRatio="none">
                        {/* Pitch Boundary */}
                        <rect x="2" y="2" width="64" height="101" rx="2" strokeWidth="0.5" />

                        {/* Halfway Line & Circle */}
                        <line x1="2" y1="52.5" x2="66" y2="52.5" strokeWidth="0.5" />
                        <circle cx="34" cy="52.5" r="9.15" strokeWidth="0.5" />
                        <circle cx="34" cy="52.5" r="0.5" fill="currentColor" />

                        {/* Penalty Areas (Top) */}
                        <rect x="13.8" y="2" width="40.4" height="16.5" strokeWidth="0.5" />
                        <rect x="24.8" y="2" width="18.4" height="5.5" strokeWidth="0.5" />
                        <path d="M27.5,18.5 Q34,25 40.5,18.5" strokeWidth="0.5" />
                        <circle cx="34" cy="11" r="0.5" fill="currentColor" />

                        {/* Penalty Areas (Bottom) */}
                        <rect x="13.8" y="86.5" width="40.4" height="16.5" strokeWidth="0.5" />
                        <rect x="24.8" y="97.5" width="18.4" height="5.5" strokeWidth="0.5" />
                        <path d="M27.5,86.5 Q34,80 40.5,86.5" strokeWidth="0.5" />
                        <circle cx="34" cy="94" r="0.5" fill="currentColor" />

                        {/* Corner Arcs */}
                        <path d="M2,3 Q3,3 3,2" strokeWidth="0.5" />
                        <path d="M66,3 Q65,3 65,2" strokeWidth="0.5" />
                        <path d="M2,102 Q3,102 3,103" strokeWidth="0.5" />
                        <path d="M66,102 Q65,102 65,103" strokeWidth="0.5" />
                    </svg>

                    {/* Formation Nodes */}
                    {formation && formation.map((pos, index) => {
                        const playerId = lineup[index];
                        const player = playerId ? squad.find(p => p.id === playerId) : null;

                        return (
                            <div
                                key={index}
                                className={`absolute w-10 h-10 -ml-5 -mt-5 flex items-center justify-center transition-all duration-300 z-20 group/node ${player ? 'cursor-grab active:cursor-grabbing' : ''}`}
                                style={{
                                    left: `${pos.x}%`,
                                    top: `${pos.y}%`,
                                }}
                                draggable={!!player}
                                onDragStart={(e) => {
                                    if (player) {
                                        e.dataTransfer.setData('playerId', player.id.toString());
                                        setDragGhost(e, player.number, player.position);
                                        e.stopPropagation();
                                    }
                                }}
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, index)}
                            >
                                {player ? (
                                    <>
                                        {/* Player Glow */}
                                        <div className={`absolute inset-0 rounded-full blur-[8px] opacity-40 ${player.position === 'GK' ? 'bg-yellow-400' : 'bg-wts-green'}`} />

                                        {/* Player Number Circle */}
                                        <div className={`relative w-9 h-9 rounded-full border-2 border-black flex items-center justify-center shadow-lg transition-transform ${player.position === 'GK' ? 'bg-yellow-400 text-black' : 'bg-wts-green text-black'}`}>
                                            <span className="text-sm font-black">{player.number}</span>
                                        </div>

                                        {/* Player Name Tag */}
                                        <div className="absolute -bottom-10 whitespace-nowrap px-3 py-1.5 bg-black/90 backdrop-blur-xl rounded-md border border-white/10 shadow-2xl pointer-events-none flex flex-col items-center z-[100] scale-90 transition-transform origin-top">
                                            <div className="flex items-center space-x-1.5 mb-0.5">
                                                {player.nationality && (
                                                    <div className="relative w-3.5 h-2.5 rounded-[1px] overflow-hidden opacity-80">
                                                        <Image
                                                            src={`https://flagcdn.com/w20/${player.nationality}.png`}
                                                            alt={player.nationality}
                                                            fill
                                                            className="object-cover"
                                                            unoptimized
                                                        />
                                                    </div>
                                                )}
                                                <span className="text-xs font-black text-white uppercase tracking-[0.1em] leading-none">
                                                    {displayNames[player.id]}
                                                </span>
                                            </div>
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">{pos.role}</span>
                                        </div>
                                    </>
                                ) : (
                                    /* Empty Slot Placeholder */
                                    <div className="relative w-8 h-8 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center bg-black/40 hover:border-wts-green/50 hover:bg-wts-green/10 transition-colors">
                                        <span className="text-[8px] font-bold text-gray-500 uppercase">{pos.role}</span>
                                    </div>
                                )}
                            </div>
                        );
                    })}


                </div>
            </div>
        </div>
    );
}
