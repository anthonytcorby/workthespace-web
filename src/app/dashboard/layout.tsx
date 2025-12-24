'use client';

import Link from 'next/link';
import { Trophy, Home, Users, Calendar, Wallet, Settings, Menu, Bell } from 'lucide-react';
import { useState } from 'react';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const menuItems = [
        { icon: Home, label: 'Dashboard', href: '/dashboard' },
        { icon: Users, label: 'Squad', href: '#' },
        { icon: Calendar, label: 'Fixtures', href: '#' },
        { icon: Wallet, label: 'Fees', href: '#' },
        { icon: Settings, label: 'Settings', href: '#' },
    ];

    return (
        <div className="flex h-screen bg-[#050D05] selection:bg-wts-green/30 overflow-hidden">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-black border-r border-white/5 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-col h-full safe-top">
                    {/* Sidebar Logo */}
                    <div className="p-6">
                        <Link href="/" className="flex items-center space-x-3 group">
                            <div className="w-8 h-8 rounded-full bg-wts-green flex items-center justify-center text-black">
                                <Trophy size={16} strokeWidth={3} />
                            </div>
                            <span className="font-display font-bold text-xl tracking-tighter italic text-white group-hover:text-wts-green transition-colors">
                                WTS
                            </span>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 space-y-2 py-4">
                        {menuItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold tracking-widest uppercase transition-all group ${item.href === '/dashboard' ? 'bg-wts-green text-black' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                            >
                                <item.icon size={18} />
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </nav>

                    {/* Bottom Profile */}
                    <div className="p-4 border-t border-white/5">
                        <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/5">
                            <div className="w-10 h-10 rounded-full bg-wts-green flex items-center justify-center text-black font-bold">
                                AC
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-white truncate">The Gaffer</p>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Premium FC</p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col relative overflow-hidden h-full">
                {/* Dashboard Header */}
                <header className="h-16 border-b border-white/5 bg-black/50 backdrop-blur-xl flex items-center justify-between px-6 z-40 safe-top">
                    <div className="flex items-center space-x-4">
                        <button className="lg:hidden text-gray-400 p-2" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                            <Menu size={20} />
                        </button>
                        <h1 className="text-sm font-bold tracking-widest uppercase text-white font-outfit">SQUAD DASHBOARD</h1>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-wts-green rounded-full shadow-[0_0_10px_rgba(0,255,65,0.5)]" />
                        </button>
                        <div className="h-6 w-px bg-white/10 mx-2" />
                        <span className="text-[10px] font-bold tracking-[0.2em] text-wts-green uppercase px-3 py-1 bg-wts-green/10 rounded-full border border-wts-green/20">PREMIUM PRO</span>
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 no-scrollbar scroll-smooth">
                    {children}
                </div>
            </main>
        </div>
    );
}
