'use client';

import { Container } from '@/components/ui/container';
import { Trophy, Users, Wallet, Calendar, AlertCircle, ArrowUpRight } from 'lucide-react';

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

            {/* Main Area: Next Match & Tactical Focus */}
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Next Match Card */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-black/40 border border-white/5 rounded-2xl overflow-hidden group hover:border-wts-green/30 transition-all">
                        <div className="p-6 md:p-8 flex items-center justify-between border-b border-white/5">
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-wts-green/10 rounded-xl">
                                    <Calendar className="text-wts-green w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg uppercase tracking-tight text-white">Next Fixture</h3>
                                    <p className="text-xs text-gray-500 font-mono tracking-widest uppercase">Premier League · Week 12</p>
                                </div>
                            </div>
                            <span className="px-3 py-1 bg-red-500/10 text-red-500 border border-red-500/20 rounded-full text-[10px] font-bold tracking-widest">URGENT INFO</span>
                        </div>

                        <div className="p-6 md:p-8">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
                                <div className="flex items-center space-x-4 text-center md:text-left">
                                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white font-bold text-2xl border border-white/10 italic">WTS</div>
                                    <div>
                                        <p className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-1">HOME</p>
                                        <h4 className="text-2xl font-display font-bold text-white italic">WORKTHESPACE FC</h4>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center">
                                    <span className="text-4xl font-display font-bold italic text-wts-green mb-1 animate-pulse">VS</span>
                                    <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold tracking-widest uppercase">19:30 KO</div>
                                </div>

                                <div className="flex items-center space-x-4 flex-row-reverse md:flex-row text-center md:text-right">
                                    <div className="md:text-right">
                                        <p className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-1">AWAY</p>
                                        <h4 className="text-2xl font-display font-bold text-white italic">TECH UNITED</h4>
                                    </div>
                                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white font-bold text-2xl border border-white/10 italic">TU</div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">VENUE</p>
                                    <p className="text-xs font-bold text-white">Powerleague Central, Pitch 4</p>
                                </div>
                                <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">ORGANISER</p>
                                    <p className="text-xs font-bold text-white">Anthony Corby (The Gaffer)</p>
                                </div>
                                <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">STATUS</p>
                                    <p className="text-xs font-bold text-wts-green flex items-center space-x-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-wts-green animate-pulse" />
                                        <span>CONFIRMED</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tactical Focus Area */}
                <div className="space-y-6">
                    <div className="bg-black/40 border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-blue-500/30 transition-all">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold uppercase tracking-widest text-sm text-gray-400">Tactical Setup</h3>
                            <button className="text-gray-600 hover:text-white transition-colors">
                                <ArrowUpRight size={18} />
                            </button>
                        </div>

                        {/* Mini Tactical Pitch */}
                        <div className="aspect-[3/4] bg-black/60 rounded-xl border border-white/10 p-4 relative mb-4">
                            <svg className="w-full h-full opacity-30" viewBox="0 0 100 140">
                                <rect x="5" y="5" width="90" height="130" rx="5" fill="none" stroke="white" strokeWidth="1" />
                                <circle cx="50" cy="70" r="10" fill="none" stroke="white" strokeWidth="1" />
                                <line x1="5" y1="70" x2="95" y2="70" stroke="white" strokeWidth="1" />
                                <g className="fill-blue-500">
                                    <circle cx="50" cy="125" r="4" className="fill-yellow-400" />
                                    <circle cx="30" cy="95" r="4" /> <circle cx="70" cy="95" r="4" />
                                    <circle cx="50" cy="65" r="4" />
                                    <circle cx="50" cy="35" r="4" className="animate-pulse" />
                                </g>
                            </svg>
                            <div className="absolute inset-x-0 bottom-4 text-center">
                                <p className="text-[10px] font-bold text-blue-400 font-mono tracking-widest">5-A-SIDE DIAMOND</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-gray-500 uppercase font-bold">Formation</span>
                                <span className="text-white font-bold">2-1-1</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-gray-500 uppercase font-bold">Style</span>
                                <span className="text-white font-bold">High Press</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ label, value, sub, icon: Icon, alert = false, color = "text-white" }) {
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
