'use client';

import { useState } from 'react';
import { Calendar, MapPin, Clock, Plus, X } from 'lucide-react';

interface Fixture {
    id: number;
    date: string;
    time: string;
    opponent: string;
    venue: string;
    type: 'LEAGUE' | 'CUP' | 'FRIENDLY';
    status: 'upcoming' | 'completed';
    result: string | null;
}

export default function FixturesPage() {
    const [fixtures, setFixtures] = useState<Fixture[]>([
        { id: 1, date: '2024-12-31', time: '19:30', opponent: 'Tech United', venue: 'Pitch 4, PL Central', type: 'LEAGUE', status: 'upcoming', result: null },
        { id: 2, date: '2024-12-24', time: '20:00', opponent: 'FC Developers', venue: 'Pitch 2, Goals', type: 'CUP', status: 'completed', result: '3-2' },
        { id: 3, date: '2024-12-17', time: '19:30', opponent: 'Code Rangers', venue: 'Pitch 4, PL Central', type: 'LEAGUE', status: 'completed', result: '2-2' },
        { id: 4, date: '2024-12-10', time: '20:00', opponent: 'Digital Warriors', venue: 'Pitch 1, Goals', type: 'FRIENDLY', status: 'completed', result: '4-1' },
        { id: 5, date: '2024-12-03', time: '19:30', opponent: 'Startup FC', venue: 'Pitch 3, PL Central', type: 'LEAGUE', status: 'completed', result: '1-3' },
        { id: 6, date: '2025-01-07', time: '19:30', opponent: 'API United', venue: 'Pitch 4, PL Central', type: 'LEAGUE', status: 'upcoming', result: null },
        { id: 7, date: '2025-01-14', time: '20:00', opponent: 'Backend Rovers', venue: 'Pitch 2, Goals', type: 'CUP', status: 'upcoming', result: null },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newFixture, setNewFixture] = useState<{ opponent: string; date: string; time: string; venue: string; type: 'LEAGUE' | 'CUP' | 'FRIENDLY' }>({
        opponent: '',
        date: '',
        time: '19:30',
        venue: '',
        type: 'LEAGUE'
    });

    const handleAddFixture = (e: React.FormEvent) => {
        e.preventDefault();
        const createdFixture: Fixture = {
            id: fixtures.length + 1,
            opponent: newFixture.opponent || 'TBD FC',
            date: newFixture.date || new Date().toISOString().split('T')[0],
            time: newFixture.time,
            venue: newFixture.venue || 'TBA',
            type: newFixture.type,
            status: 'upcoming',
            result: null
        };

        // Add to top of list if upcoming
        setFixtures([createdFixture, ...fixtures]);
        setIsModalOpen(false);
        setNewFixture({ opponent: '', date: '', time: '19:30', venue: '', type: 'LEAGUE' });
    };

    return (
        <div className="space-y-6 max-w-[1400px] mx-auto relative">
            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-[#0A0A0A] border border-white/10 rounded-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-white/5 flex items-center justify-between">
                            <h3 className="text-xl font-display font-bold italic text-white uppercase">Schedule Match</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleAddFixture} className="p-6 space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Type</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {['LEAGUE', 'CUP', 'FRIENDLY'].map((type) => (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => setNewFixture({ ...newFixture, type: type as any })}
                                            className={`py-2 px-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border transition-colors ${newFixture.type === type
                                                ? 'bg-wts-green text-black border-wts-green'
                                                : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'
                                                }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Opponent</label>
                                <input
                                    type="text"
                                    value={newFixture.opponent}
                                    onChange={(e) => setNewFixture({ ...newFixture, opponent: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-wts-green/50"
                                    placeholder="e.g. Athletic FC"
                                    autoFocus
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Date</label>
                                    <input
                                        type="date"
                                        value={newFixture.date}
                                        onChange={(e) => setNewFixture({ ...newFixture, date: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-wts-green/50 color-scheme-dark"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Time</label>
                                    <input
                                        type="time"
                                        value={newFixture.time}
                                        onChange={(e) => setNewFixture({ ...newFixture, time: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-wts-green/50 color-scheme-dark"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Venue</label>
                                <input
                                    type="text"
                                    value={newFixture.venue}
                                    onChange={(e) => setNewFixture({ ...newFixture, venue: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-wts-green/50"
                                    placeholder="e.g. Pitch 4, Central Park"
                                />
                            </div>
                            <div className="pt-4">
                                <button type="submit" className="w-full bg-wts-green text-black font-bold uppercase tracking-widest py-4 rounded-lg hover:bg-white transition-colors">
                                    Schedule Fixture
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
                <div>
                    <span className="text-wts-green text-[9px] font-bold tracking-[0.3em] uppercase block mb-1.5 font-mono">
                        FIXTURE MANAGEMENT
                    </span>
                    <h2 className="text-3xl md:text-4xl font-display font-bold italic uppercase tracking-tighter text-white">
                        MATCHES
                    </h2>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm flex items-center space-x-2 transition-all duration-300 shadow-lg bg-black/85 text-white border border-white/10 hover:bg-white/10"
                >
                    <Plus size={18} />
                    <span>Add Fixture</span>
                </button>
            </div>

            {/* Fixtures List */}
            <div className="space-y-3">
                {fixtures.map((fixture) => (
                    <div
                        key={fixture.id}
                        className="bg-black/40 border border-white/5 rounded-xl p-5 hover:border-white/10 transition-colors cursor-pointer"
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            {/* Left: Match Info */}
                            <div className="flex-1">
                                <div className="flex items-center space-x-4 mb-3">
                                    <div className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest border ${fixture.type === 'LEAGUE' ? 'bg-wts-green/10 text-wts-green border-wts-green/20' :
                                        fixture.type === 'CUP' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                                            'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                        }`}>
                                        {fixture.type}
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Calendar size={14} className="text-gray-500" />
                                        <span className="text-[10px] font-bold text-white">
                                            {new Date(fixture.date).toLocaleDateString('en-US', {
                                                weekday: 'short',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Clock size={14} className="text-gray-500" />
                                        <span className="text-[10px] font-bold text-white">{fixture.time}</span>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3 mb-2">
                                    <span className="text-lg font-display font-bold italic text-white">
                                        WORKTHESPACE
                                    </span>
                                    <span className="text-sm font-bold text-wts-green">vs</span>
                                    <span className="text-lg font-display font-bold italic text-white">
                                        {fixture.opponent}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <MapPin size={12} className="text-gray-600" />
                                    <span className="text-[9px] font-mono text-gray-500">{fixture.venue}</span>
                                </div>
                            </div>

                            {/* Right: Status/Result */}
                            <div className="flex items-center space-x-4">
                                {fixture.status === 'completed' && fixture.result ? (
                                    <div className="text-right">
                                        <p className="text-2xl font-display font-bold italic text-wts-green">
                                            {fixture.result}
                                        </p>
                                        <p className="text-[8px] font-bold text-gray-600 uppercase tracking-widest">
                                            Final
                                        </p>
                                    </div>
                                ) : (
                                    <div className="px-4 py-2 bg-wts-green/10 border border-wts-green/20 rounded-lg">
                                        <span className="text-[9px] font-bold text-wts-green uppercase tracking-widest">
                                            Upcoming
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
