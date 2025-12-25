import { Player } from './tactics-board';
import { Users } from 'lucide-react';
import { getPlayerDisplayNames } from '@/lib/utils';
import { setDragGhost } from '@/lib/drag-utils';

interface TacticsTableProps {
    squad: Array<{ id: number; name: string; number: number; position: string }>;
    lineup: Record<number, number>;
    subs: Record<number, number>;
}

export function TacticsTable({ squad, lineup, subs }: TacticsTableProps) {
    const isPicked = (playerId: number) => {
        return Object.values(lineup).includes(playerId) || Object.values(subs).includes(playerId);
    };

    return (
        <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-3xl p-6 shadow-2xl h-full flex flex-col overflow-hidden">
            <div className="flex items-center space-x-3 mb-6">
                <div className="p-2.5 bg-wts-green/10 rounded-lg">
                    <Users size={20} className="text-wts-green" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white uppercase tracking-widest">Squad</h3>
                    <p className="text-sm text-gray-500 uppercase font-mono">Drag to Pitch</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th className="py-4 pl-3 text-xs font-bold text-gray-500 uppercase tracking-widest w-14">No.</th>
                            <th className="py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Player</th>
                            <th className="py-4 pr-3 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Pos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {squad.map((player) => {
                            const picked = isPicked(player.id);
                            return (
                                <tr
                                    key={player.id}
                                    draggable={true}
                                    onDragStart={(e) => {
                                        e.dataTransfer.setData('playerId', player.id.toString());
                                        setDragGhost(e, player.number, player.position);
                                    }}
                                    className={`border-b border-white/5 last:border-0 transition-all cursor-grab active:cursor-grabbing group hover:bg-white/5 border-l-4 border-l-transparent hover:border-l-wts-green ${picked ? 'opacity-40 grayscale' : ''}`}
                                >
                                    <td className="py-4 pl-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${player.position === 'GK' ? 'bg-yellow-400 text-black' : 'bg-wts-green/20 text-wts-green border border-wts-green/50'}`}>
                                            {player.number}
                                        </div>
                                    </td>
                                    <td className="py-4">
                                        <span className="text-sm font-bold text-white group-hover:text-wts-green transition-colors">
                                            {player.name}
                                        </span>
                                    </td>
                                    <td className="py-4 pr-3 text-right">
                                        <span className={`text-xs font-mono font-bold px-3 py-1.5 rounded-md border text-gray-400 bg-white/5 border-white/5`}>
                                            {player.position}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
