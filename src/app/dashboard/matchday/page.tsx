'use client';

import { useState } from 'react';
import { Tv, Calendar, MapPin, Clock, Shield, Shirt, Wind, CloudRain, ChevronRight } from 'lucide-react';
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
                    <div className="relative bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 overflow-hidden">
                        {/* Background Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-r from-wts-green/5 to-transparent pointer-events-none" />

                        <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
                            {/* Home Team */}
                            <div className="text-center md:text-left">
                                <span className="text-wts-green text-xs font-bold tracking-[0.2em] uppercase block mb-1">Home</span>
                                <h1 className="text-4xl md:text-6xl font-display font-bold italic text-white tracking-tighter">
                                    WTS
                                </h1>
                            </div>

                            {/* VS / Info */}
                            <div className="flex flex-col items-center text-center space-y-2">
                                <div className="px-4 py-1.5 bg-wts-green text-black font-bold text-xs uppercase tracking-widest rounded-full">
                                    {MATCH_DATA.time} KO
                                </div>
                                <div className="text-xl font-display font-bold italic text-gray-500">VS</div>
                                <div className="flex items-center space-x-2 text-gray-400">
                                    <Calendar size={14} />
                                    <span className="text-xs font-bold uppercase tracking-wide">{MATCH_DATA.date}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-400">
                                    <MapPin size={14} />
                                    <span className="text-xs font-bold uppercase tracking-wide">{MATCH_DATA.venue}</span>
                                </div>
                            </div>

                            {/* Away Team */}
                            <div className="text-center md:text-right">
                                <span className="text-gray-500 text-xs font-bold tracking-[0.2em] uppercase block mb-1">Away</span>
                                <h1 className="text-4xl md:text-6xl font-display font-bold italic text-white tracking-tighter">
                                    TECH UTD
                                </h1>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left: Squad List */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-display font-bold italic text-white uppercase tracking-tighter">Starting XI</h3>
                                    <div className="px-3 py-1 bg-white/5 rounded text-[10px] font-bold text-wts-green uppercase tracking-widest border border-white/10">
                                        Confirmed
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {STARTING_XI.map((player) => (
                                        <div key={player.number} className="flex items-center space-x-4 p-3 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-colors group">
                                            <div className="w-8 h-8 flex items-center justify-center bg-black/50 rounded-lg text-white font-display font-bold italic text-lg border border-white/10 group-hover:border-wts-green/50 transition-colors">
                                                {player.number}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-bold text-white group-hover:text-wts-green transition-colors">{player.name}</p>
                                                <p className="text-[10px] text-gray-500 uppercase tracking-widest">{player.position}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Subs */}
                            <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-6">
                                <h3 className="text-xl font-display font-bold italic text-white uppercase tracking-tighter mb-4">Substitutes</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {SUBS.map((player) => (
                                        <div key={player.number} className="flex items-center space-x-3 p-3 bg-white/5 border border-white/5 rounded-xl opacity-60 hover:opacity-100 transition-opacity">
                                            <span className="text-xs font-mono text-gray-400">{player.number}</span>
                                            <span className="text-xs font-bold text-white">{player.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right: Match Info */}
                        <div className="space-y-6">
                            {/* Conditions Card */}
                            <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-6 space-y-4">
                                <h3 className="text-lg font-display font-bold italic text-white uppercase tracking-tighter mb-2">Conditions</h3>

                                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                                    <div className="flex items-center space-x-3">
                                        <CloudRain size={18} className="text-blue-400" />
                                        <span className="text-xs font-bold text-gray-300 uppercase tracking-wide">Weather</span>
                                    </div>
                                    <span className="text-xs font-bold text-white">{MATCH_DATA.weather}</span>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                                    <div className="flex items-center space-x-3">
                                        <Shirt size={18} className="text-wts-green" />
                                        <span className="text-xs font-bold text-gray-300 uppercase tracking-wide">Kit</span>
                                    </div>
                                    <span className="text-xs font-bold text-white">{MATCH_DATA.kit}</span>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                                    <div className="flex items-center space-x-3">
                                        <Shield size={18} className="text-yellow-500" />
                                        <span className="text-xs font-bold text-gray-300 uppercase tracking-wide">Referee</span>
                                    </div>
                                    <span className="text-xs font-bold text-white">{MATCH_DATA.referee}</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="bg-wts-green p-6 rounded-3xl text-center space-y-4">
                                <h3 className="text-2xl font-display font-bold italic text-black uppercase tracking-tighter">Ready?</h3>
                                <p className="text-black/70 text-xs font-bold uppercase tracking-widest">Confirm your attendance</p>
                                <button className="w-full py-4 bg-black text-white rounded-xl font-bold uppercase tracking-widest hover:bg-black/80 transition-colors shadow-xl">
                                    Check In Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
