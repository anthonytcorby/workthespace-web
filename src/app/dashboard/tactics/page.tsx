'use client';

import { useState } from 'react';
import { TacticsBoard, Player } from '@/components/dashboard/tactics-board';
import { TacticsTable } from '@/components/dashboard/tactics-table';
import { SquadSelector } from '@/components/dashboard/squad-selector';
import { Save, CheckCircle2, ChevronDown, Users, Layout } from 'lucide-react';
import Image from 'next/image';
import { useLocalStorage } from '@/hooks/use-local-storage';

const FORMATIONS: Record<string, Omit<Player, 'id' | 'name' | 'number'>[]> = {
    "4-2-3-1 Gegenpress": [
        { x: 50, y: 90, role: 'GK' },
        { x: 15, y: 70, role: 'LB' },
        { x: 38, y: 75, role: 'CB' },
        { x: 62, y: 75, role: 'CB' },
        { x: 85, y: 70, role: 'RB' },
        { x: 38, y: 55, role: 'CDM' },
        { x: 62, y: 55, role: 'CDM' },
        { x: 15, y: 35, role: 'AML' },
        { x: 50, y: 35, role: 'CAM' },
        { x: 85, y: 35, role: 'AMR' },
        { x: 50, y: 15, role: 'ST' },
    ],
    "4-3-3 DM Wide": [
        { x: 50, y: 90, role: 'GK' },
        { x: 15, y: 70, role: 'LB' },
        { x: 38, y: 75, role: 'CB' },
        { x: 62, y: 75, role: 'CB' },
        { x: 85, y: 70, role: 'RB' },
        { x: 50, y: 60, role: 'CDM' },
        { x: 35, y: 45, role: 'CM' },
        { x: 65, y: 45, role: 'CM' },
        { x: 15, y: 25, role: 'LW' },
        { x: 85, y: 25, role: 'RW' },
        { x: 50, y: 15, role: 'ST' },
    ],
    "4-2-4 Wide": [
        { x: 50, y: 90, role: 'GK' },
        { x: 15, y: 70, role: 'LB' },
        { x: 38, y: 75, role: 'CB' },
        { x: 62, y: 75, role: 'CB' },
        { x: 85, y: 70, role: 'RB' },
        { x: 38, y: 50, role: 'CM' },
        { x: 62, y: 50, role: 'CM' },
        { x: 15, y: 30, role: 'LW' },
        { x: 85, y: 30, role: 'RW' },
        { x: 35, y: 15, role: 'ST' },
        { x: 65, y: 15, role: 'ST' },
    ],
    "5-3-2 Wing Back": [
        { x: 50, y: 90, role: 'GK' },
        { x: 10, y: 60, role: 'LWB' },
        { x: 30, y: 75, role: 'CB' },
        { x: 50, y: 75, role: 'CB' },
        { x: 70, y: 75, role: 'CB' },
        { x: 90, y: 60, role: 'RWB' },
        { x: 35, y: 45, role: 'CM' },
        { x: 50, y: 55, role: 'CDM' },
        { x: 65, y: 45, role: 'CM' },
        { x: 35, y: 15, role: 'ST' },
        { x: 65, y: 15, role: 'ST' },
    ],
    "4-4-2 Standard": [
        { x: 50, y: 90, role: 'GK' },
        { x: 15, y: 70, role: 'LB' },
        { x: 38, y: 75, role: 'CB' },
        { x: 62, y: 75, role: 'CB' },
        { x: 85, y: 70, role: 'RB' },
        { x: 15, y: 45, role: 'LM' },
        { x: 38, y: 50, role: 'CM' },
        { x: 62, y: 50, role: 'CM' },
        { x: 85, y: 45, role: 'RM' },
        { x: 40, y: 20, role: 'ST' },
        { x: 60, y: 20, role: 'ST' },
    ],
    "3-4-2-1 Tiki Taka": [
        { x: 50, y: 90, role: 'GK' },
        { x: 30, y: 75, role: 'CB' },
        { x: 50, y: 75, role: 'CB' },
        { x: 70, y: 75, role: 'CB' },
        { x: 15, y: 50, role: 'LM' },
        { x: 40, y: 55, role: 'CM' },
        { x: 60, y: 55, role: 'CM' },
        { x: 85, y: 50, role: 'RM' },
        { x: 35, y: 30, role: 'AM' },
        { x: 65, y: 30, role: 'AM' },
        { x: 50, y: 15, role: 'ST' },
    ],
    "4-2-2-2 Box": [
        { x: 50, y: 90, role: 'GK' },
        { x: 15, y: 70, role: 'LB' },
        { x: 38, y: 75, role: 'CB' },
        { x: 62, y: 75, role: 'CB' },
        { x: 85, y: 70, role: 'RB' },
        { x: 38, y: 55, role: 'CDM' },
        { x: 62, y: 55, role: 'CDM' },
        { x: 25, y: 35, role: 'CAM' },
        { x: 75, y: 35, role: 'CAM' },
        { x: 35, y: 15, role: 'ST' },
        { x: 65, y: 15, role: 'ST' },
    ]
};

// ... (imports remain the same, ensure TEAMSHEET is imported)
import { TEAMSHEET } from '@/lib/mock-data';

// ... (FORMATIONS remain the same)

export default function TacticsPage() {
    // State
    const [squad] = useState(TEAMSHEET);
    const [selectedTactic, setSelectedTactic] = useLocalStorage<string>('wts-tactics-formation', '4-4-2 Standard');

    // Lineup: Map of Formation Index (0-10) -> Player ID
    const [lineup, setLineup] = useLocalStorage<Record<number, number>>('wts-tactics-lineup', {
        0: 1, 1: 3, 2: 4, 3: 5, 4: 2, 5: 11, 6: 8, 7: 6, 8: 7, 9: 9, 10: 10
    });

    // Subs: Array of Player IDs (indices 0-6)
    const [subs, setSubs] = useLocalStorage<Record<number, number>>('wts-tactics-subs', {
        0: 13, 1: 14, 2: 15, 3: 16, 4: 17, 5: 18, 6: 19
    });

    // Set Pieces: Map of Role (e.g. 'cornerL') -> Player ID
    const [setPieces, setSetPieces] = useLocalStorage<Record<string, number>>('wts-tactics-set-pieces', {});

    // Penalties: Map of Order (1-5) -> Player ID
    const [penalties, setPenalties] = useLocalStorage<Record<number, number>>('wts-tactics-penalties', {});

    const [isSelectorOpen, setIsSelectorOpen] = useState(false);
    const [selectedNodeId, setSelectedNodeId] = useState<number | null>(null);
    const [currentRole, setCurrentRole] = useState<string>('');
    const [isSaved, setIsSaved] = useState(false);
    const [isTacticsOpen, setIsTacticsOpen] = useState(false);

    // Derived State
    const currentFormation = FORMATIONS[selectedTactic];

    const handleTacticChange = (tacticName: string) => {
        setSelectedTactic(tacticName);
        setIsTacticsOpen(false);
        setIsSaved(false);
    };

    const handleDrop = (playerId: number, targetType: 'pitch' | 'sub' | 'setPiece' | 'penalty', targetIndex: number | string) => {
        const newLineup = { ...lineup };
        const newSubs = { ...subs };
        const newSetPieces = { ...setPieces };
        const newPenalties = { ...penalties };

        // Clean up previous location if needed (Mock logic: allow duplicates for set pieces? usually yes. But lineup/subs should be unique)
        // For simplicity, we enforce uniqueness only on Lineup and Subs. A player can be in lineup AND take corners.

        if (targetType === 'pitch' || targetType === 'sub') {
            // Remove from lineup
            Object.keys(newLineup).forEach(key => { if (newLineup[parseInt(key)] === playerId) delete newLineup[parseInt(key)]; });
            // Remove from subs
            Object.keys(newSubs).forEach(key => { if (newSubs[parseInt(key)] === playerId) delete newSubs[parseInt(key)]; });
        }

        if (targetType === 'pitch') {
            newLineup[targetIndex as number] = playerId;
        } else if (targetType === 'sub') {
            newSubs[targetIndex as number] = playerId;
        } else if (targetType === 'setPiece') {
            newSetPieces[targetIndex as string] = playerId;
        } else if (targetType === 'penalty') {
            newPenalties[targetIndex as number] = playerId;
        }

        setLineup(newLineup);
        setSubs(newSubs);
        setSetPieces(newSetPieces);
        setPenalties(newPenalties);
        setIsSaved(false);
    };

    const handleNodeClick = (id: number, role: string) => {
        setSelectedNodeId(id);
        setCurrentRole(role);
        setIsSelectorOpen(true);
    };

    const handlePlayerSelect = (squadPlayer: any) => {
        // ... (Keep existing selection logic if needed, or remove if fully DnD)
        if (selectedNodeId === null) return;
        // Legacy selection logic... let's keep it minimal or remove if unused. 
        // Assuming DnD is primary now.
        setIsSelectorOpen(false);
    };

    const handleSave = () => {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    return (
        <div className="space-y-6 max-w-[1400px] mx-auto h-[calc(100vh-140px)] relative">

            {/* Content Content w/ Z-Index */}
            <div className="relative z-10 h-full flex flex-col space-y-6 p-1">
                {/* ... (SquadSelector & Header remain same) ... */}
                <SquadSelector
                    isOpen={isSelectorOpen}
                    onClose={() => setIsSelectorOpen(false)}
                    onSelect={handlePlayerSelect}
                    currentPosition={currentRole}
                />

                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 px-2">
                    <div>
                        <span className="text-wts-green text-sm font-bold tracking-[0.3em] uppercase block mb-1.5 font-mono">
                            STRATEGY & FORMATION
                        </span>
                        <h2 className="text-4xl md:text-5xl font-display font-bold italic uppercase tracking-tighter text-white">
                            TACTICS
                        </h2>
                    </div>
                    <div className="flex items-center space-x-3">
                        {/* Tactics Dropdown Button */}
                        <div className="relative">
                            <button
                                onClick={() => setIsTacticsOpen(!isTacticsOpen)}
                                className="bg-black/40 text-white border border-white/10 hover:bg-white/10 px-6 py-4 rounded-xl font-bold uppercase tracking-widest text-sm flex items-center space-x-3 shadow-lg transition-all min-w-[240px] justify-between group"
                            >
                                <div className="flex items-center space-x-3">
                                    <Layout size={18} className="text-gray-400 group-hover:text-wts-green transition-colors" />
                                    <div className="flex flex-col items-start">
                                        <span className="text-[10px] text-gray-500 font-bold leading-none mb-1">Selected Tactic</span>
                                        <span>{selectedTactic}</span>
                                    </div>
                                </div>
                                <ChevronDown size={16} className={`text-gray-500 transition-transform ${isTacticsOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {isTacticsOpen && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50 flex flex-col py-1">
                                    {Object.keys(FORMATIONS).map((tactic) => (
                                        <button
                                            key={tactic}
                                            onClick={() => handleTacticChange(tactic)}
                                            className={`px-4 py-3 text-left text-sm font-bold uppercase tracking-widest hover:bg-white/5 hover:text-wts-green transition-colors ${selectedTactic === tactic ? 'text-wts-green bg-white/5' : 'text-gray-400'}`}
                                        >
                                            {tactic}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Players Button */}
                        <div className="bg-black/40 text-white border border-white/10 px-6 py-4 rounded-xl font-bold uppercase tracking-widest text-sm flex items-center space-x-3 shadow-lg min-w-[160px]">
                            <Users size={18} className="text-gray-400" />
                            <div className="flex flex-col items-start">
                                <span className="text-[10px] text-gray-500 font-bold leading-none mb-1">Squad Size</span>
                                <span>{Object.keys(lineup).length} / 11 Playing</span>
                            </div>
                        </div>

                        <button
                            onClick={handleSave}
                            className={`px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm flex items-center space-x-2 transition-all duration-300 shadow-lg ${isSaved
                                ? 'bg-wts-green text-black shadow-wts-green/20'
                                : 'bg-black/40 text-white border border-white/10 hover:bg-white/10'
                                }`}
                        >
                            {isSaved ? (
                                <>
                                    <CheckCircle2 size={18} />
                                    <span>Saved</span>
                                </>
                            ) : (
                                <>
                                    <Save size={18} />
                                    <span>Save Tactic</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100%-100px)]">
                    {/* Left Column: Squad List */}
                    <div className="lg:col-span-1 h-full min-h-0">
                        <TacticsTable
                            squad={squad}
                            lineup={lineup}
                            subs={subs}
                        />
                    </div>

                    {/* Center Column: Tactics Board */}
                    <div className="lg:col-span-2 bg-black/40 backdrop-blur-sm border border-white/10 rounded-3xl p-6 shadow-2xl h-full flex flex-col overflow-hidden min-h-0">
                        <div className="flex-1 relative">
                            <TacticsBoard
                                formation={currentFormation}
                                lineup={lineup}
                                squad={squad}
                                onDrop={(playerId, index) => handleDrop(playerId, 'pitch', index)}
                                onNodeClick={handleNodeClick}
                            />
                        </div>
                    </div>

                    {/* Right Column: Instructions & Extras */}
                    <div className="lg:col-span-1 h-full min-h-0 flex flex-col gap-4 overflow-y-auto no-scrollbar">

                        {/* Substitutes */}
                        <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-3xl p-5 flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-bold text-white uppercase tracking-widest">Substitutes</h3>
                                <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-gray-400">Max 7</span>
                            </div>
                            <div className="space-y-2">
                                {Array.from({ length: 7 }).map((_, i) => {
                                    const subPlayerId = subs[i];
                                    const subPlayer = subPlayerId ? squad.find(p => p.id === subPlayerId) : null;

                                    return (
                                        <div
                                            key={i}
                                            onDragOver={handleDragOver}
                                            onDrop={(e) => {
                                                const playerId = parseInt(e.dataTransfer.getData('playerId'));
                                                if (playerId) handleDrop(playerId, 'sub', i);
                                            }}
                                            className={`flex items-center justify-between p-2 rounded-xl border transition-all cursor-pointer group ${subPlayer
                                                ? 'bg-white/5 border-white/5 hover:bg-white/10'
                                                : 'bg-black/20 border-dashed border-white/10 hover:border-white/30'
                                                }`}
                                        >
                                            {subPlayer ? (
                                                <>
                                                    <div className="flex items-center space-x-3">
                                                        <span className="text-xs font-mono text-gray-500 w-4">S{i + 1}</span>
                                                        <span className="text-xs font-bold text-gray-300 group-hover:text-white">{subPlayer.name}</span>
                                                    </div>
                                                    <span className="text-[9px] font-bold text-wts-green uppercase">{subPlayer.position}</span>
                                                </>
                                            ) : (
                                                <div className="flex items-center space-x-3 w-full py-1 opacity-50">
                                                    <span className="text-xs font-mono text-gray-600 w-4">S{i + 1}</span>
                                                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Empty Slot</span>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Set Pieces */}
                        <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-3xl p-5 flex flex-col gap-3">
                            <h3 className="text-sm font-bold text-white uppercase tracking-widest">Set Pieces</h3>
                            <div className="space-y-2">
                                {[
                                    { label: 'Corners (L)', key: 'corners_l' },
                                    { label: 'Corners (R)', key: 'corners_r' },
                                    { label: 'Free Kicks', key: 'free_kicks' },
                                ].map((type) => {
                                    const playerId = setPieces[type.key];
                                    const player = playerId ? squad.find(p => p.id === playerId) : null;

                                    return (
                                        <div
                                            key={type.key}
                                            onDragOver={handleDragOver}
                                            onDrop={(e) => {
                                                const pid = parseInt(e.dataTransfer.getData('playerId'));
                                                if (pid) handleDrop(pid, 'setPiece', type.key);
                                            }}
                                            className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${player ? 'bg-white/5 border-white/5' : 'bg-black/20 border-dashed border-white/10'}`}
                                        >
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">{type.label}</span>
                                            {player ? (
                                                <span className="text-xs font-bold text-white">{player.name}</span>
                                            ) : (
                                                <span className="text-[10px] text-gray-600 font-bold uppercase">Empty Slot</span>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Penalties */}
                        <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-3xl p-5 flex flex-col gap-3">
                            <h3 className="text-sm font-bold text-white uppercase tracking-widest">Penalties</h3>
                            <div className="space-y-2">
                                {[1, 2, 3].map((order) => {
                                    const playerId = penalties[order];
                                    const player = playerId ? squad.find(p => p.id === playerId) : null;

                                    return (
                                        <div
                                            key={order}
                                            onDragOver={handleDragOver}
                                            onDrop={(e) => {
                                                const pid = parseInt(e.dataTransfer.getData('playerId'));
                                                if (pid) handleDrop(pid, 'penalty', order);
                                            }}
                                            className={`flex items-center justify-between p-2 rounded-xl border transition-all ${player ? 'bg-white/5 border-white/5' : 'bg-black/20 border-dashed border-white/10'}`}
                                        >
                                            <div className="flex items-center space-x-3 w-full">
                                                <span className="w-5 h-5 flex items-center justify-center bg-wts-green/10 text-wts-green text-[10px] font-bold rounded-md">{order}</span>
                                                {player ? (
                                                    <span className="text-xs font-bold text-white">{player.name}</span>
                                                ) : (
                                                    <span className="text-[10px] text-gray-600 font-bold uppercase">Empty Slot</span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
