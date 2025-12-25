'use client';

import { useState } from 'react';
import { Users, Star, Clock, Shield, ArrowUpDown, ArrowUp, ArrowDown, X, Plus } from 'lucide-react';
import { PlayerModal } from '@/components/dashboard/player-modal';

import { TEAMSHEET } from '@/lib/mock-data';

type SortKey = 'number' | 'name' | 'role' | 'attendance' | 'reliability';
type SortDirection = 'asc' | 'desc';

interface Player {
    id: number;
    name: string;
    role: string;
    number: number;
    captain: boolean;
    attendance: number;
    reliability: number;
    preferred: boolean;
    preferredFoot?: 'Left' | 'Right' | 'Both';
    username?: string;
}

export default function SquadPage() {
    const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: SortDirection }>({
        key: 'number',
        direction: 'asc',
    });

    const [players, setPlayers] = useState<Player[]>(TEAMSHEET);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);

    // New Player Form State
    const [newPlayerName, setNewPlayerName] = useState('');
    const [newPlayerNumber, setNewPlayerNumber] = useState('');
    const [newPlayerRole, setNewPlayerRole] = useState('CM');

    const handleAddPlayer = (e: React.FormEvent) => {
        e.preventDefault();
        const newPlayer: Player = {
            id: players.length + 1,
            name: newPlayerName || 'New Player',
            number: parseInt(newPlayerNumber) || 99,
            role: newPlayerRole,
            captain: false,
            attendance: 100,
            reliability: 100,
            preferred: false,
            preferredFoot: 'Right',
            username: '@newplayer'
        };
        setPlayers([...players, newPlayer]);
        setIsAddModalOpen(false);
        setNewPlayerName('');
        setNewPlayerNumber('');
    };

    const handleUpdatePlayer = (updatedPlayer: Player) => {
        setPlayers(players.map(p => p.id === updatedPlayer.id ? updatedPlayer : p));
    };

    const handleReleasePlayer = (id: number) => {
        setPlayers(players.filter(p => p.id !== id));
    };

    const sortedPlayers = [...players].sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });

    const handleSort = (key: SortKey) => {
        setSortConfig((current) => ({
            key,
            direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
        }));
    };

    const SortIcon = ({ column }: { column: SortKey }) => {
        if (sortConfig.key !== column) return <ArrowUpDown size={12} className="text-gray-600 opacity-50 group-hover:opacity-100" />;
        return sortConfig.direction === 'asc'
            ? <ArrowUp size={12} className="text-wts-green" />
            : <ArrowDown size={12} className="text-wts-green" />;
    };

    return (
        <div className="space-y-6 max-w-[1400px] mx-auto relative">

            {/* Edit Player Modal */}
            <PlayerModal
                isOpen={!!editingPlayer}
                onClose={() => setEditingPlayer(null)}
                player={editingPlayer}
                onSave={handleUpdatePlayer}
                onRelease={handleReleasePlayer}
            />

            {/* Add Player Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-[#0A0A0A] border border-white/10 rounded-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-white/5 flex items-center justify-between">
                            <h3 className="text-xl font-display font-bold italic text-white uppercase">Add New Player</h3>
                            <button onClick={() => setIsAddModalOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleAddPlayer} className="p-6 space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Player Name</label>
                                <input
                                    type="text"
                                    value={newPlayerName}
                                    onChange={(e) => setNewPlayerName(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-wts-green/50"
                                    placeholder="e.g. Harry Kane"
                                    autoFocus
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Kit Number</label>
                                    <input
                                        type="number"
                                        value={newPlayerNumber}
                                        onChange={(e) => setNewPlayerNumber(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-wts-green/50"
                                        placeholder="9"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Position</label>
                                    <select
                                        value={newPlayerRole}
                                        onChange={(e) => setNewPlayerRole(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-wts-green/50"
                                    >
                                        {['GK', 'CB', 'LB', 'RB', 'CDM', 'CM', 'CAM', 'LM', 'RM', 'LW', 'RW', 'ST'].map(role => (
                                            <option key={role} value={role}>{role}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="pt-4">
                                <button type="submit" className="w-full bg-wts-green text-black font-bold uppercase tracking-widest py-4 rounded-lg hover:bg-white transition-colors">
                                    Create Player
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
                <div>
                    <span className="text-wts-green text-xs font-bold tracking-[0.3em] uppercase block mb-1.5 font-mono">
                        SQUAD MANAGEMENT
                    </span>
                    <h2 className="text-3xl md:text-4xl font-display font-bold italic uppercase tracking-tighter text-white">
                        PLAYER ROSTER
                    </h2>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-black/40 text-white border border-white/10 hover:bg-white/10 px-6 py-4 rounded-xl font-bold uppercase tracking-widest text-sm flex items-center space-x-3 shadow-lg transition-all"
                >
                    <Plus size={18} className="text-wts-green" />
                    <span>Add Player</span>
                </button>
            </div>

            {/* Squad List */}
            <div className="bg-black/40 border border-white/5 rounded-xl overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/5 bg-white/5">
                    <button
                        onClick={() => handleSort('number')}
                        className="col-span-1 flex items-center space-x-1 group"
                    >
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-white transition-colors">#</span>
                        <SortIcon column="number" />
                    </button>
                    <button
                        onClick={() => handleSort('name')}
                        className="col-span-3 flex items-center space-x-1 group"
                    >
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-white transition-colors">Player</span>
                        <SortIcon column="name" />
                    </button>
                    <button
                        onClick={() => handleSort('role')}
                        className="col-span-1 flex items-center space-x-1 group"
                    >
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-white transition-colors">Role</span>
                        <SortIcon column="role" />
                    </button>
                    <div className="col-span-2 text-[10px] font-bold text-gray-600 uppercase tracking-widest">Pref. Foot</div>
                    <div className="col-span-2 text-[10px] font-bold text-gray-600 uppercase tracking-widest">Attendance</div>
                    <button
                        onClick={() => handleSort('reliability')}
                        className="col-span-2 flex items-center space-x-1 group"
                    >
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-white transition-colors">Reliability</span>
                        <SortIcon column="reliability" />
                    </button>
                    <div className="col-span-1 text-[10px] font-bold text-gray-600 uppercase tracking-widest">Status</div>
                </div>

                {/* Player Rows */}
                <div className="divide-y divide-white/5">
                    {sortedPlayers.map((player) => (
                        <div
                            key={player.id}
                            onClick={() => setEditingPlayer(player)}
                            className="grid grid-cols-12 gap-4 p-4 hover:bg-white/5 transition-colors cursor-pointer group"
                        >
                            <div className="col-span-1 flex items-center">
                                <span className="text-sm font-bold text-white font-mono group-hover:text-wts-green transition-colors">{player.number}</span>
                            </div>
                            <div className="col-span-3 flex items-center space-x-2">
                                <span className="text-sm font-bold text-white">{player.name}</span>
                                {player.captain && (
                                    <Shield size={12} className="text-wts-green" />
                                )}
                            </div>
                            <div className="col-span-1 flex items-center">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded">
                                    {player.role}
                                </span>
                            </div>
                            <div className="col-span-2 flex items-center">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                    {player.preferredFoot || '-'}
                                </span>
                            </div>
                            <div className="col-span-2 flex items-center">
                                <div className="flex items-center space-x-2">
                                    <div className="flex-1 bg-white/5 rounded-full h-1.5 w-16">
                                        <div
                                            className={`h-full rounded-full ${player.attendance >= 90 ? 'bg-wts-green' : player.attendance >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                                                }`}
                                            style={{ width: `${player.attendance}%` }}
                                        />
                                    </div>
                                    <span className="text-[10px] font-bold text-white">{player.attendance}%</span>
                                </div>
                            </div>
                            <div className="col-span-2 flex items-center">
                                <div className="flex items-center space-x-1">
                                    <Star size={12} className="text-yellow-400" />
                                    <span className="text-[10px] font-bold text-white">
                                        {(player.reliability / 20).toFixed(1)}
                                    </span>
                                </div>
                            </div>
                            <div className="col-span-1 flex items-center">
                                {player.preferred && (
                                    <span className="px-2 py-1 bg-wts-green/10 border border-wts-green/20 rounded text-[8px] font-bold text-wts-green uppercase tracking-widest">
                                        Pref
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
