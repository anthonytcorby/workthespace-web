import { useState, useEffect } from 'react';
import { X, Shield, Trash2, Save } from 'lucide-react';
import { Player } from '@/lib/mock-data';

interface PlayerModalProps {
    isOpen: boolean;
    onClose: () => void;
    player: Player | null;
    onSave: (updatedPlayer: Player) => void;
    onRelease: (playerId: number) => void;
}

export function PlayerModal({ isOpen, onClose, player, onSave, onRelease }: PlayerModalProps) {
    const [formData, setFormData] = useState<Player | null>(null);

    useEffect(() => {
        setFormData(player);
    }, [player]);

    if (!isOpen || !formData) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-display font-bold italic text-white uppercase tracking-tighter">Edit Player</h3>
                        <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">ID: {formData.id}</p>
                    </div>
                    <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        {/* Account Name */}
                        <div className="col-span-2 space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Account Name</label>
                            <input
                                type="text"
                                value={formData.username || ''}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-wts-green/50 font-mono text-sm"
                                placeholder="@username"
                            />
                        </div>

                        {/* Name */}
                        <div className="col-span-2 space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Full Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-wts-green/50 font-bold"
                            />
                        </div>

                        {/* Number */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Squad Number</label>
                            <input
                                type="number"
                                value={formData.number}
                                onChange={(e) => setFormData({ ...formData, number: parseInt(e.target.value) || 0 })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-wts-green/50 font-mono"
                            />
                        </div>

                        {/* Position */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Position</label>
                            <select
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-wts-green/50"
                            >
                                {['GK', 'CB', 'LB', 'RB', 'CDM', 'CM', 'CAM', 'LM', 'RM', 'LW', 'RW', 'ST'].map(role => (
                                    <option key={role} value={role}>{role}</option>
                                ))}
                            </select>
                        </div>

                        {/* Preferred Foot */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Preferred Foot</label>
                            <div className="grid grid-cols-3 gap-2">
                                {['Left', 'Right', 'Both'].map((foot) => (
                                    <button
                                        key={foot}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, preferredFoot: foot as any })}
                                        className={`py-2 px-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border transition-colors ${formData.preferredFoot === foot
                                            ? 'bg-wts-green text-black border-wts-green'
                                            : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'
                                            }`}
                                    >
                                        {foot}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Captain Status */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Leadership</label>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, captain: !formData.captain })}
                                className={`w-full py-3 px-4 rounded-lg border flex items-center justify-center space-x-2 transition-all ${formData.captain
                                    ? 'bg-yellow-500/10 border-yellow-500 text-yellow-500'
                                    : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                                    }`}
                            >
                                <Shield size={16} className={formData.captain ? 'fill-current' : ''} />
                                <span className="text-xs font-bold uppercase tracking-widest">
                                    {formData.captain ? 'Team Captain' : 'Make Captain'}
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-6 border-t border-white/5 flex items-center justify-between gap-4">
                        <button
                            type="button"
                            onClick={() => {
                                if (confirm('Are you sure you want to release this player? This action cannot be undone.')) {
                                    onRelease(formData.id);
                                    onClose();
                                }
                            }}
                            className="px-6 py-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors flex items-center space-x-2"
                        >
                            <Trash2 size={16} />
                            <span>Release</span>
                        </button>

                        <button
                            type="submit"
                            className="flex-1 px-6 py-4 bg-wts-green hover:bg-white text-black rounded-xl text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center space-x-2"
                        >
                            <Save size={16} />
                            <span>Save Changes</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
