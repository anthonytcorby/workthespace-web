'use client';

import { useState } from 'react';
import { Tv, Calendar, MapPin, ChevronRight, Share2, Info } from 'lucide-react';
import Image from 'next/image';

// Mock Data for Matchday
const MATCH_DATA = {
    opponent: 'Tech United',
    competition: 'Premier Division',
    venue: 'The Code Arena',
    date: 'Tuesday 24 Oct',
    time: '19:45',
    weather: 'Rainy, 12°C',
    kit: 'Home (Green)',
    referee: 'M. Dean'
};

const STARTING_XI = [
    { number: 1, name: 'G. Keeper', position: 'GK' },
    { number: 2, name: 'R. Back', position: 'RB' },
    { number: 5, name: 'C. Back', position: 'CB' },
    { number: 6, name: 'C. Back', position: 'CB' },
    { number: 3, name: 'L. Back', position: 'LB' },
    { number: 4, name: 'D. Rice', position: 'CDM' },
    { number: 8, name: 'T. Kroos', position: 'CM' },
    { number: 10, name: 'L. Messi', position: 'CAM' },
    { number: 7, name: 'C. Ronaldo', position: 'RW' },
    { number: 11, name: 'N. Neymar', position: 'LW' },
    { number: 9, name: 'E. Haaland', position: 'ST' },
];

// Static coordinates for 4-2-3-1 / 4-3-3 hybrid
const FORMATION_COORDS = [
    { x: 50, y: 88 }, // GK
    { x: 85, y: 70 }, // RB
    { x: 62, y: 75 }, // RCB
    { x: 38, y: 75 }, // LCB
    { x: 15, y: 70 }, // LB
    { x: 50, y: 60 }, // CDM
    { x: 65, y: 45 }, // RCM
    { x: 35, y: 45 }, // LCM
    { x: 85, y: 25 }, // RW
    { x: 15, y: 25 }, // LW
    { x: 50, y: 15 }, // ST
];

const SUBS = [
    { number: 12, name: 'A. Becker', position: 'GK' },
    { number: 14, name: 'V. Dijk', position: 'CB' },
    { number: 17, name: 'K. De Bruyne', position: 'CM' },
    { number: 19, name: 'K. Mbappe', position: 'ST' },
    { number: 23, name: 'L. Shaw', position: 'LB' },
];

export default function MatchdayPage() {
    const [hasMatch, setHasMatch] = useState(false);

    return (
        <div className="space-y-6 max-w-[1400px] mx-auto min-h-[calc(100vh-140px)] relative">

            {/* Dev Toggle */}
            <div className="absolute top-0 right-0 z-50">
                <button
                    onClick={() => setHasMatch(!hasMatch)}
                    className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-[10px] font-mono text-gray-400 uppercase border border-white/5"
                >
                    Toggle: {hasMatch ? 'Squad Announced' : 'No Game'}
                </button>
            </div>

            {!hasMatch ? (
                // NO GAME STATE
                <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] text-center space-y-6 animate-in fade-in zoom-in duration-500">
                    <div className="p-8 bg-black/40 backdrop-blur-sm rounded-full border border-white/10 shadow-2xl">
                        <Tv size={64} className="text-gray-600" />
                    </div>
                    <div>
                        <h2 className="text-4xl font-display font-bold italic text-white uppercase tracking-tighter mb-3">
                            NO UPCOMING MATCH
                        </h2>
                        <p className="text-gray-400 max-w-md mx-auto text-sm leading-relaxed">
                            There are no fixtures scheduled for the next 48 hours. Enjoy the rest day, gaffer.
                        </p>
                    </div>
                    <div className="pt-4">
                        <button className="px-8 py-4 bg-wts-green/10 hover:bg-wts-green/20 border border-wts-green/20 rounded-xl text-xs font-bold uppercase tracking-widest text-wts-green transition-all flex items-center space-x-2">
                            <span>View Fixture List</span>
                            <ChevronRight size={14} />
                        </button>
                    </div>
                </div>
            ) : (
                // MATCHDAY DASHBOARD STATE
                <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">

                    {/* Header / Hero */}
                    <div className="p-6 bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl flex flex-col md:flex-row items-center justify-between">
                        <div className="flex items-center space-x-4 mb-4 md:mb-0">
                            <div className="w-12 h-12 bg-wts-green flex items-center justify-center rounded-xl text-black font-bold">
                                VS
                            </div>
                            <div>
                                <h1 className="text-2xl font-display font-bold italic text-white uppercase tracking-tighter">
                                    Match Day Live
                                </h1>
                                <div className="flex items-center space-x-3 text-xs font-bold text-gray-400 uppercase tracking-widest">
                                    <span className="flex items-center space-x-1"><Calendar size={12} /><span>{MATCH_DATA.date}</span></span>
                                    <span className="flex items-center space-x-1"><MapPin size={12} /><span>{MATCH_DATA.venue}</span></span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold text-white uppercase tracking-widest flex items-center space-x-2 transition-all">
                                <Share2 size={14} />
                                <span>Share Lineup</span>
                            </button>
                            <button className="px-4 py-2 bg-wts-green text-black rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-wts-green/90 transition-all">
                                Match Centre
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Left: Squad List (4 cols) */}
                        <div className="lg:col-span-4 space-y-8">
                            {/* Starting XI List */}
                            <div>
                                <div className="flex items-center justify-between mb-4 px-2">
                                    <h3 className="text-xl font-display font-bold italic text-white uppercase tracking-tighter">Starting XI</h3>
                                    <span className="text-xs font-bold text-wts-green uppercase tracking-widest">4-3-3 Attacking</span>
                                </div>
                                <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden">
                                    {STARTING_XI.map((player, i) => (
                                        <div key={player.number} className="flex items-center p-3 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group">
                                            <div className="w-8 font-mono text-sm text-gray-500 font-bold group-hover:text-wts-green transition-colors">{player.number}</div>
                                            <div className="flex-1">
                                                <span className="text-sm font-bold text-white uppercase tracking-wide">{player.name}</span>
                                            </div>
                                            <div className="text-[10px] font-bold text-gray-600 uppercase tracking-widest group-hover:text-gray-400">{player.position}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Subs List */}
                            <div>
                                <h3 className="text-xl font-display font-bold italic text-white uppercase tracking-tighter mb-4 px-2">Substitutes</h3>
                                <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden">
                                    {SUBS.map((player, i) => (
                                        <div key={player.number} className="flex items-center p-3 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors opacity-70 hover:opacity-100">
                                            <div className="w-8 font-mono text-xs text-gray-500 font-bold">{player.number}</div>
                                            <div className="flex-1">
                                                <span className="text-xs font-bold text-white uppercase tracking-wide">{player.name}</span>
                                            </div>
                                            <div className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">{player.position}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right: Pitch Visual (8 cols) */}
                        <div className="lg:col-span-8 flex flex-col">
                            <div className="flex-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-6 relative overflow-hidden flex items-center justify-center min-h-[600px]">
                                {/* Pitch Texture */}
                                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:24px_24px]" />

                                {/* PITCH SVG */}
                                <div className="relative w-full max-w-[500px] aspect-[68/105]">
                                    <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-white/20 fill-none" viewBox="0 0 68 105" preserveAspectRatio="none">
                                        {/* Pitch Boundary */}
                                        <rect x="0.5" y="0.5" width="67" height="104" rx="2" strokeWidth="0.5" />
                                        {/* Halfway */}
                                        <line x1="0.5" y1="52.5" x2="67.5" y2="52.5" strokeWidth="0.5" />
                                        <circle cx="34" cy="52.5" r="9.15" strokeWidth="0.5" />
                                        <circle cx="34" cy="52.5" r="0.5" fill="currentColor" />
                                        {/* Top Box */}
                                        <rect x="13.8" y="0.5" width="40.4" height="16.5" strokeWidth="0.5" />
                                        <rect x="24.8" y="0.5" width="18.4" height="5.5" strokeWidth="0.5" />
                                        <path d="M27.5,17 Q34,23 40.5,17" strokeWidth="0.5" />
                                        {/* Bottom Box */}
                                        <rect x="13.8" y="87.5" width="40.4" height="16.5" strokeWidth="0.5" />
                                        <rect x="24.8" y="98.5" width="18.4" height="5.5" strokeWidth="0.5" />
                                        <path d="M27.5,87.5 Q34,81.5 40.5,87.5" strokeWidth="0.5" />
                                    </svg>

                                    {/* PLayers */}
                                    {STARTING_XI.map((player, index) => {
                                        const coords = FORMATION_COORDS[index] || { x: 50, y: 50 };
                                        return (
                                            <div
                                                key={player.number}
                                                className="absolute w-12 h-12 -ml-6 -mt-6 flex flex-col items-center justify-center z-10"
                                                style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
                                            >
                                                {/* Node */}
                                                <div className={`w-10 h-10 rounded-full border-2 border-black shadow-lg flex items-center justify-center ${player.position === 'GK' ? 'bg-yellow-400 text-black' : 'bg-wts-green text-black'}`}>
                                                    <span className="font-display font-bold text-sm tracking-tight">{player.number}</span>
                                                </div>
                                                {/* Name Tag */}
                                                <div className="absolute -bottom-6 whitespace-nowrap px-2 py-0.5 bg-black/80 rounded border border-white/10 backdrop-blur-sm">
                                                    <span className="text-[10px] font-bold text-white uppercase tracking-widest block leading-none">{player.name.split(' ').pop()}</span>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>

                                {/* Team Logo Overlay in Center */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                                    <div className="w-64 h-64 border-[20px] border-white rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
