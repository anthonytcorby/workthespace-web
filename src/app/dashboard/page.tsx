'use client';

import { useState } from 'react';
import { SummaryStrip } from '@/components/dashboard/summary-strip';
import { StaffBriefing } from '@/components/dashboard/staff-briefing';
import { TacticsBoard } from '@/components/dashboard/tactics-board';
import { MatchNotes } from '@/components/dashboard/match-notes';
import { PostMatch } from '@/components/dashboard/post-match';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { TEAMSHEET } from '@/lib/mock-data';
import { FORMATIONS } from '@/lib/formations';

export default function DashboardPage() {
    const [selectedTactic] = useLocalStorage<string>('wts-tactics-formation', '4-4-2 Standard');
    const [lineup] = useLocalStorage<Record<number, number>>('wts-tactics-lineup', {
        0: 1, 1: 3, 2: 4, 3: 5, 4: 2, 5: 11, 6: 8, 7: 6, 8: 7, 9: 9, 10: 10
    });

    const currentFormation = FORMATIONS[selectedTactic as keyof typeof FORMATIONS] || FORMATIONS['4-4-2 Standard'];

    return (
        <div className="space-y-6 max-w-[1800px] mx-auto">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
                <div>
                    <span className="text-wts-green text-xs font-bold tracking-[0.3em] uppercase block mb-1.5 font-mono">
                        MATCHDAY OPERATIONS
                    </span>
                    <h2 className="text-3xl md:text-4xl font-display font-bold italic uppercase tracking-tighter text-white">
                        DASHBOARD
                    </h2>
                </div>
            </div>

            {/* Top Summary Strip */}
            <SummaryStrip />

            {/* Main Dashboard Grid */}
            <div className="grid lg:grid-cols-12 gap-6 items-start">
                {/* Left Column: Staff Briefing */}
                <div className="lg:col-span-3 order-2 lg:order-1">
                    <StaffBriefing />
                </div>

                {/* Center Column: Tactical Arena */}
                <div className="lg:col-span-6 order-1 lg:order-2">
                    <div className="bg-black/40 border border-white/5 rounded-2xl p-5 shadow-xl flex flex-col h-[740px]">
                        {/* Widget Header - Restored Info */}
                        <div className="flex items-center justify-between mb-4 px-2">
                            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Active Tactic</span>
                            <div className="flex items-center space-x-4">
                                <span className="text-xs font-bold text-wts-green uppercase tracking-widest">{selectedTactic}</span>
                                <span className="text-xs font-bold text-white uppercase tracking-widest">{Object.keys(lineup).length}/11</span>
                            </div>
                        </div>

                        {/* Interactive Board */}
                        <div className="flex-1 relative">
                            <TacticsBoard
                                formation={currentFormation}
                                lineup={lineup}
                                squad={TEAMSHEET}
                                onDrop={() => { }} // Read-only on dashboard
                                onNodeClick={() => { }}
                            />
                        </div>
                    </div>
                </div>

                {/* Right Column: Secondary Panels */}
                <div className="lg:col-span-3 space-y-4 order-3">
                    <MatchNotes />
                    <PostMatch />
                </div>
            </div>
        </div>
    );
}
