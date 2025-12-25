'use client';

import { useState } from 'react';
import {
    MessageSquare, Pin, Search, Filter, Check, CheckCheck,
    Bell, Calendar, Shield, Info, Plus, ChevronRight, User, MoreHorizontal
} from 'lucide-react';

// --- Types ---

type MessageType = 'announcement' | 'fixture' | 'system' | 'dm';
type MessageStatus = 'read' | 'unread';

interface Message {
    id: string;
    type: MessageType;
    status: MessageStatus;
    sender: {
        name: string;
        role: string;
        avatar?: string;
    };
    subject: string;
    preview: string;
    content: string; // HTML or rich text for now just string
    timestamp: string;
    isPinned?: boolean;
    meta?: {
        fixtureId?: string;
        location?: string;
        weather?: string;
        matchFee?: number;
    };
    readCount?: number;
    total?: number;
}

// --- Mock Data ---

const MOCK_MESSAGES: Message[] = [
    {
        id: '1',
        type: 'fixture',
        status: 'unread',
        sender: { name: 'Fixture Bot', role: 'System' },
        subject: 'MATCHDAY: vs Red Star FC',
        preview: 'Kickoff 14:00 • Hackney Marshes',
        content: '', // Content rendered by component based on type
        timestamp: '10:30 AM',
        isPinned: true,
        meta: {
            location: 'Hackney Marshes',
            weather: 'Rain likely',
            matchFee: 5
        }
    },
    {
        id: '2',
        type: 'announcement',
        status: 'read',
        sender: { name: 'Anthony Corby', role: 'Manager' },
        subject: 'Training Cancelled - Waterlogged Pitch',
        preview: 'Guys, pitch is completely flooded. No training tonight.',
        content: 'Guys, pitch is completely flooded. No training tonight. Rest up and we go again on Sunday. Please confirm availability for the weekend by tomorrow 5pm.',
        timestamp: 'Yesterday',
        readCount: 12,
        total: 15
    },
    {
        id: '3',
        type: 'system',
        status: 'unread',
        sender: { name: 'Automated System', role: 'Admin' },
        subject: 'Match Fees Overdue',
        preview: 'You have 2 outstanding match fees.',
        content: 'Please settle your outstanding balance of £10.00 immediately to remain available for selection.',
        timestamp: 'Yesterday'
    },
    {
        id: '4',
        type: 'dm',
        status: 'read',
        sender: { name: 'Marcus Richards', role: 'Player' },
        subject: 'Weekend Availability',
        preview: 'I might be late for kickoff, working...',
        content: 'I might be late for kickoff, working a morning shift. Should be there by 1:30 latest.',
        timestamp: 'Tue'
    },
    {
        id: '5',
        type: 'announcement',
        status: 'read',
        sender: { name: 'Anthony Corby', role: 'Manager' },
        subject: 'Squad Selection vs Athletic FC',
        preview: 'Starting XI has been posted. Check the...',
        content: 'Starting XI has been posted. Check the Matchday tab for details. Big game, need everyone focused.',
        timestamp: 'Mon',
        readCount: 14,
        total: 15
    }
];

export default function CommsPage() {
    const [activeFilter, setActiveFilter] = useState<MessageType | 'all'>('all');
    const [selectedMessageId, setSelectedMessageId] = useState<string | null>(MOCK_MESSAGES[0].id);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredMessages = MOCK_MESSAGES.filter(msg => {
        const matchesFilter = activeFilter === 'all' || msg.type === activeFilter;
        const matchesSearch = msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
            msg.sender.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const selectedMessage = MOCK_MESSAGES.find(m => m.id === selectedMessageId);

    return (
        <div className="flex h-[calc(100vh-140px)] gap-6 max-w-[1600px] mx-auto">
            {/* Sidebar - Message List */}
            <div className="w-[480px] flex flex-col bg-black/40 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">

                {/* Sidebar Header */}
                <div className="p-4 border-b border-white/5 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-display font-bold italic text-white uppercase tracking-tighter">Inbox</h2>
                        <button className="p-2 hover:bg-white/10 rounded-lg text-white transition-colors">
                            <Plus size={20} />
                        </button>
                    </div>

                    {/* Search */}
                    <div className="relative">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search messages..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-9 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-wts-green/50"
                        />
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex p-1 bg-white/5 rounded-lg">
                        {['all', 'announcement', 'fixture', 'dm'].map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter as any)}
                                className={`flex-1 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded transition-all ${activeFilter === filter
                                    ? 'bg-wts-green text-black shadow-sm'
                                    : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                {filter === 'dm' ? 'DMs' : filter === 'all' ? 'All' : filter.charAt(0).toUpperCase() + filter.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Message List */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {filteredMessages.map((msg) => (
                        <div
                            key={msg.id}
                            onClick={() => setSelectedMessageId(msg.id)}
                            className={`p-4 border-b border-white/5 cursor-pointer transition-colors hover:bg-white/5 ${selectedMessageId === msg.id ? 'bg-white/5 border-l-2 border-l-wts-green' : 'border-l-2 border-l-transparent'
                                }`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <div className="flex items-center space-x-2">
                                    {msg.type === 'announcement' && <Bell size={12} className="text-wts-green" />}
                                    {msg.type === 'fixture' && <Calendar size={12} className="text-blue-400" />}
                                    {msg.type === 'system' && <Shield size={12} className="text-red-400" />}
                                    {msg.type === 'dm' && <User size={12} className="text-yellow-400" />}
                                    <span className={`text-xs font-bold ${msg.status === 'unread' ? 'text-white' : 'text-gray-400'}`}>
                                        {msg.sender.name}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    {msg.isPinned && <Pin size={10} className="text-gray-500 rotate-45" />}
                                    <span className="text-[10px] text-gray-600 font-mono uppercase">{msg.timestamp}</span>
                                </div>
                            </div>
                            <h4 className={`text-sm mb-1 ${msg.status === 'unread' ? 'text-white font-bold' : 'text-gray-300 font-medium'}`}>
                                {msg.subject}
                            </h4>
                            <p className="text-xs text-gray-500 line-clamp-1">{msg.preview}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content Panel */}
            <div className="flex-1 bg-black/40 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm flex flex-col">
                {selectedMessage ? (
                    <>
                        {/* Header */}
                        <div className="p-6 border-b border-white/5 flex justify-between items-start bg-gradient-to-r from-white/5 to-transparent">
                            <div>
                                <div className="flex items-center space-x-3 mb-4">
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest border ${selectedMessage.type === 'announcement' ? 'bg-wts-green/10 text-wts-green border-wts-green/20' :
                                        selectedMessage.type === 'fixture' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                            selectedMessage.type === 'system' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                                'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                        }`}>
                                        {selectedMessage.type.toUpperCase()}
                                    </span>
                                    <span className="text-xs text-gray-500 font-mono uppercase tracking-widest">{selectedMessage.timestamp}</span>
                                </div>
                                <h1 className="text-2xl font-display font-bold italic text-white uppercase tracking-tighter mb-2">
                                    {selectedMessage.subject}
                                </h1>
                                <div className="flex items-center space-x-2">
                                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-gray-400">
                                        {selectedMessage.sender.name.charAt(0)}
                                    </div>
                                    <span className="text-sm font-bold text-gray-300">{selectedMessage.sender.name}</span>
                                    <span className="text-xs text-gray-600">•</span>
                                    <span className="text-xs text-gray-500 uppercase tracking-widest">{selectedMessage.sender.role}</span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
                                    <MoreHorizontal size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Content Body */}
                        <div className="flex-1 p-8 overflow-y-auto">
                            {selectedMessage.type === 'fixture' ? (
                                <div className="space-y-6">
                                    {/* Fixture Card */}
                                    <div className="bg-gradient-to-br from-blue-900/20 to-black border border-blue-500/20 rounded-xl p-6 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4 opacity-10">
                                            <Calendar size={120} />
                                        </div>
                                        <div className="relative z-10 space-y-6">
                                            <div className="grid grid-cols-2 gap-8">
                                                <div>
                                                    <label className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1 block">Opponent</label>
                                                    <p className="text-xl font-bold text-white">Red Star FC</p>
                                                </div>
                                                <div>
                                                    <label className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1 block">Venue</label>
                                                    <p className="text-xl font-bold text-white">Hackney Marshes</p>
                                                </div>
                                                <div>
                                                    <label className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1 block">Kickoff</label>
                                                    <p className="text-xl font-bold text-white">14:00</p>
                                                </div>
                                                <div>
                                                    <label className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1 block">Match Fee</label>
                                                    <p className="text-xl font-bold text-white">£5.00</p>
                                                </div>
                                            </div>
                                            <div className="pt-4 border-t border-blue-500/20">
                                                <button className="w-full py-3 bg-blue-500 hover:bg-blue-400 text-black font-bold uppercase tracking-widest rounded-lg transition-colors">
                                                    Acknowledge Details
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3 p-4 bg-blue-500/5 border border-blue-500/10 rounded-lg">
                                        <Info size={16} className="text-blue-400 mt-1" />
                                        <p className="text-sm text-gray-300 leading-relaxed">
                                            Please arrive 45 minutes before kickoff for warm-up. Black shorts and socks required.
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="prose prose-invert max-w-none">
                                    <p className="text-gray-300 leading-relaxed text-base">
                                        {selectedMessage.content}
                                    </p>

                                    {selectedMessage.type === 'announcement' && selectedMessage.readCount && (
                                        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-xs text-gray-500">
                                            <div className="flex items-center space-x-2">
                                                <CheckCheck size={14} className="text-wts-green" />
                                                <span>Read by {selectedMessage.readCount} of {selectedMessage.total} recipients</span>
                                            </div>
                                            <button className="text-gray-400 hover:text-white uppercase tracking-widest font-bold">
                                                View Receipt Log
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Filtered Footer Action (No reply for fixture/system) */}
                        {selectedMessage.type === 'dm' && (
                            <div className="p-4 border-t border-white/5 bg-white/5">
                                <div className="flex gap-4">
                                    <input
                                        type="text"
                                        placeholder="Type a reply..."
                                        className="flex-1 bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30"
                                    />
                                    <button className="px-6 py-2 bg-white text-black font-bold uppercase tracking-widest rounded-lg text-xs hover:bg-gray-200 transition-colors">
                                        Send
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                        <MessageSquare size={48} className="mb-4 opacity-20" />
                        <p className="uppercase tracking-widest text-xs font-bold">Select a message</p>
                    </div>
                )}
            </div>
        </div>
    );
}
