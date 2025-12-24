'use client';

import { Container } from '@/components/ui/container';
import { Trophy, Users, Wallet, Calendar, AlertCircle, ArrowUpRight } from 'lucide-react';
import { TacticsBoard } from '@/components/dashboard/tactics-board';

export default function DashboardPage() {
    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <span className="text-wts-green text-xs font-bold tracking-[0.3em] uppercase block mb-2 font-outfit">TEAM MANAGEMENT</span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold italic uppercase tracking-tighter text-white">
                        SQUAD <span className="text-wts-green">LIVE</span>
                    </h2>
                </div>
                <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all">Export Report</button>
                    <button className="px-4 py-2 bg-wts-green text-black rounded-lg text-xs font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(0,255,65,0.3)] transition-all">Match Day</button>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    label="Squad Presence"
                    value="12 / 14"
                    sub="2 pending response"
                    icon={Users}
                    alert={true}
                />
                <StatCard
                    label="Fees Collected"
                    value="£125.00"
                    sub="£25.00 remaining"
                    icon={Wallet}
                />
                <StatCard
                    label="Next Match"
                    value="Tuesday"
                    sub="19:30 @ Powerleague"
                    icon={Calendar}
                />
                <StatCard
                    label="Team Rating"
                    value="4.8"
                    sub="Last 5 matches"
                    icon={Trophy}
                    color="text-yellow-400"
                />
            </div>

            {/* Dashboard Main View */}
            <div className="grid lg:grid-cols-4 gap-8 items-start">

                {/* Left Side: Stats & Details (1 Column) */}
                <div className="lg:col-span-1 space-y-6 order-2 lg:order-1">
                    <div className="bg-black/40 border border-white/5 rounded-2xl overflow-hidden p-6 group hover:border-wts-green/30 transition-all">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="p-2 bg-wts-green/10 rounded-lg">
                                <Calendar className="text-wts-green w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-sm uppercase tracking-widest text-white">NEXT FIXTURE</h3>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="text-center">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-xs font-bold italic mb-2">WTS</div>
                                    <p className="text-[8px] font-bold text-gray-500 uppercase tracking-widest leading-tight">WORKTHESPACE</p>
                                </div>
                                <span className="text-xs font-bold text-wts-green italic">VS</span>
                                <div className="text-center">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-xs font-bold italic mb-2">TU</div>
                                    <p className="text-[8px] font-bold text-gray-500 uppercase tracking-widest leading-tight">TECH UNITED</p>
                                </div>
                            </div>

                            <div className="space-y-3 pt-4 border-t border-white/5">
                                <div className="flex justify-between items-center">
                                    <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">Kick Off</span>
                                    <span className="text-[9px] font-bold text-white">19:30 Tuesday</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">Pitch</span>
                                    <span className="text-[9px] font-bold text-white">Pitch 4, PL Central</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">Status</span>
                                    <span className="text-[9px] font-bold text-wts-green animate-pulse">MATCH ON</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-black/40 border border-white/5 rounded-2xl p-6 hover:border-wts-green/30 transition-all">
                        <h3 className="font-bold text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-4 px-1">Squad Presence</h3>
                        <div className="space-y-3">
                            {[
                                { name: 'A. Corby', status: 'In', role: 'Captain' },
                                { name: 'M. Richards', status: 'In', role: 'CB' },
                                { name: 'J. Smith', status: 'Out', role: 'ST' },
                                { name: 'D. Vieri', status: 'Pending', role: 'LW' },
                            ].map((p, i) => (
                                <div key={i} className="flex items-center justify-between bg-white/5 rounded-lg p-2 px-3 border border-white/5">
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-1.5 h-1.5 rounded-full ${p.status === 'In' ? 'bg-wts-green' : p.status === 'Out' ? 'bg-red-500' : 'bg-yellow-500'}`} />
                                        <span className="text-[10px] font-bold text-white">{p.name}</span>
                                    </div>
                                    <span className="text-[8px] font-bold text-gray-600 uppercase tracking-widest">{p.role}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Center: Interactive Tactics Board (3 Columns) */}
                <div className="lg:col-span-3 h-[750px] order-1 lg:order-2">
                    <div className="h-full bg-black/40 border border-white/5 rounded-3xl p-4 md:p-6 shadow-2xl relative overflow-hidden">
                        <TacticsBoard />
                    </div>
                </div>

            </div>
        </div>
    );
}

interface StatCardProps {
    label: string;
    value: string;
    sub: string;
    icon: any;
    alert?: boolean;
    color?: string;
}

function StatCard({ label, value, sub, icon: Icon, alert = false, color = "text-white" }: StatCardProps) {
    return (
        <div className="bg-black/40 border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors group relative overflow-hidden">
            {alert && (
                <div className="absolute top-0 right-0 p-3">
                    <AlertCircle size={14} className="text-red-500 animate-pulse" />
                </div>
            )}
            <div className="flex items-center space-x-4 mb-3">
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-wts-green/10 transition-colors">
                    <Icon size={18} className="text-gray-400 group-hover:text-wts-green transition-colors" />
                </div>
                <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">{label}</span>
            </div>
            <div className="space-y-1">
                <p className={`text-2xl font-display font-bold italic tracking-tighter ${color}`}>{value}</p>
                <p className="text-[10px] text-gray-600 font-mono tracking-widest uppercase">{sub}</p>
            </div>
        </div>
    );
}
