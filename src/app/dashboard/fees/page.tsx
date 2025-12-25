'use client';

import { Wallet, DollarSign, Download, Check } from 'lucide-react';
import { useState } from 'react';

export default function FeesPage() {
    const playerBalances = [
        { name: 'A. Corby', paid: 50, owed: 0, total: 50, status: 'paid' },
        { name: 'M. Richards', paid: 50, owed: 0, total: 50, status: 'paid' },
        { name: 'J. Thompson', paid: 25, owed: 25, total: 50, status: 'partial' },
        { name: 'D. Vieri', paid: 50, owed: 0, total: 50, status: 'paid' },
        { name: 'P. Foster', paid: 50, owed: 0, total: 50, status: 'paid' },
        { name: 'J. Smith', paid: 0, owed: 0, total: 0, status: 'unpaid' },
        { name: 'R. Williams', paid: 50, owed: 0, total: 50, status: 'paid' },
        { name: 'K. Martinez', paid: 50, owed: 0, total: 50, status: 'paid' },
    ];

    const summary = {
        totalCollected: 325,
        totalOutstanding: 25,
        perMatchFee: 5,
        totalPlayers: 14,
    };

    const [isExporting, setIsExporting] = useState(false);
    const [exportSuccess, setExportSuccess] = useState(false);

    const handleExport = () => {
        setIsExporting(true);
        // Simulate generating CSV
        setTimeout(() => {
            setIsExporting(false);
            setExportSuccess(true);
            setTimeout(() => setExportSuccess(false), 3000);

            // In a real app, this would trigger a download
            console.log("Exported CSV");
        }, 1500);
    };

    return (
        <div className="space-y-6 max-w-[1400px] mx-auto">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
                <div>
                    <span className="text-wts-green text-[9px] font-bold tracking-[0.3em] uppercase block mb-1.5 font-mono">
                        FINANCIAL MANAGEMENT
                    </span>
                    <h2 className="text-3xl md:text-4xl font-display font-bold italic uppercase tracking-tighter text-white">
                        FEES & PAYMENTS
                    </h2>
                </div>
                <button
                    onClick={handleExport}
                    disabled={isExporting}
                    className={`px-6 py-4 border rounded-xl font-bold uppercase tracking-widest text-sm flex items-center space-x-3 shadow-lg transition-all ${exportSuccess
                        ? 'bg-wts-green border-wts-green text-black'
                        : 'bg-black/40 text-white border border-white/10 hover:bg-white/10'
                        }`}
                >
                    {exportSuccess ? <Check size={18} /> : <Download size={18} className={exportSuccess ? "" : "text-gray-400"} />}
                    <span>{isExporting ? 'Generating...' : exportSuccess ? 'Exported' : 'Export CSV'}</span>
                </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="bg-black/40 border border-white/5 rounded-lg p-4">
                    <p className="text-[9px] font-bold tracking-[0.2em] text-gray-600 uppercase font-mono mb-2">
                        Total Collected
                    </p>
                    <p className="text-2xl font-display font-bold italic text-wts-green">
                        £{summary.totalCollected}.00
                    </p>
                </div>
                <div className="bg-black/40 border border-white/5 rounded-lg p-4">
                    <p className="text-[9px] font-bold tracking-[0.2em] text-gray-600 uppercase font-mono mb-2">
                        Outstanding
                    </p>
                    <p className="text-2xl font-display font-bold italic text-red-500">
                        £{summary.totalOutstanding}.00
                    </p>
                </div>
                <div className="bg-black/40 border border-white/5 rounded-lg p-4">
                    <p className="text-[9px] font-bold tracking-[0.2em] text-gray-600 uppercase font-mono mb-2">
                        Per Match Fee
                    </p>
                    <p className="text-2xl font-display font-bold italic text-white">£{summary.perMatchFee}.00</p>
                </div>
                <div className="bg-black/40 border border-white/5 rounded-lg p-4">
                    <p className="text-[9px] font-bold tracking-[0.2em] text-gray-600 uppercase font-mono mb-2">
                        Active Players
                    </p>
                    <p className="text-2xl font-display font-bold italic text-white">{summary.totalPlayers}</p>
                </div>
            </div>

            {/* Player Balances */}
            <div className="bg-black/40 border border-white/5 rounded-xl overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/5 bg-white/5">
                    <div className="col-span-4 text-[8px] font-bold text-gray-600 uppercase tracking-widest">Player</div>
                    <div className="col-span-2 text-[8px] font-bold text-gray-600 uppercase tracking-widest">Paid</div>
                    <div className="col-span-2 text-[8px] font-bold text-gray-600 uppercase tracking-widest">Owed</div>
                    <div className="col-span-2 text-[8px] font-bold text-gray-600 uppercase tracking-widest">Total</div>
                    <div className="col-span-2 text-[8px] font-bold text-gray-600 uppercase tracking-widest">Status</div>
                </div>

                {/* Player Rows */}
                <div className="divide-y divide-white/5">
                    {playerBalances.map((player, i) => (
                        <div
                            key={i}
                            className="grid grid-cols-12 gap-4 p-4 hover:bg-white/5 transition-colors"
                        >
                            <div className="col-span-4 flex items-center">
                                <span className="text-sm font-bold text-white">{player.name}</span>
                            </div>
                            <div className="col-span-2 flex items-center">
                                <span className="text-sm font-bold text-wts-green">£{player.paid}.00</span>
                            </div>
                            <div className="col-span-2 flex items-center">
                                <span className={`text-sm font-bold ${player.owed > 0 ? 'text-red-500' : 'text-gray-600'}`}>
                                    £{player.owed}.00
                                </span>
                            </div>
                            <div className="col-span-2 flex items-center">
                                <span className="text-sm font-bold text-white">£{player.total}.00</span>
                            </div>
                            <div className="col-span-2 flex items-center">
                                {player.status === 'paid' && (
                                    <span className="px-2 py-1 bg-wts-green/10 border border-wts-green/20 rounded text-[8px] font-bold text-wts-green uppercase tracking-widest">
                                        Paid
                                    </span>
                                )}
                                {player.status === 'partial' && (
                                    <span className="px-2 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded text-[8px] font-bold text-yellow-500 uppercase tracking-widest">
                                        Partial
                                    </span>
                                )}
                                {player.status === 'unpaid' && (
                                    <span className="px-2 py-1 bg-red-500/10 border border-red-500/20 rounded text-[8px] font-bold text-red-500 uppercase tracking-widest">
                                        Unpaid
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
