'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Trophy, Home, Users, Calendar, Wallet, Settings, Menu, Bell, ClipboardList, Table, Tv, MessageSquare } from 'lucide-react';
import { useState } from 'react';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const pathname = usePathname();

    const menuItems = [
        { icon: Home, label: 'Dashboard', href: '/dashboard' },
        { icon: Tv, label: 'Matchday', href: '/dashboard/matchday' },
        { icon: Users, label: 'Squad', href: '/dashboard/squad' },
        { icon: ClipboardList, label: 'Tactics', href: '/dashboard/tactics' },
        { icon: Calendar, label: 'Fixtures', href: '/dashboard/fixtures' },
        { icon: Table, label: 'Leagues', href: '/dashboard/leagues' },
        { icon: Wallet, label: 'Fees', href: '/dashboard/fees' },
        { icon: MessageSquare, label: 'Comms', href: '/dashboard/comms' },
        { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
    ];

    return (
        <div className="flex h-screen bg-[#050D05] selection:bg-wts-green/30 overflow-hidden relative">
            {/* Background Image - Now Global */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Image
                    src={pathname === '/dashboard/tactics' ? "/tactics-bg.png" : "/dashboard-bg.png"}
                    alt="Dashboard Background"
                    fill
                    className={`object-cover ${pathname === '/dashboard/tactics' ? 'opacity-60' : 'opacity-50'}`}
                    priority
                    quality={90}
                />
                <div className={`absolute inset-0 ${pathname === '/dashboard/tactics'
                    ? 'bg-gradient-to-b from-black/80 via-black/50 to-black/80'
                    : 'bg-gradient-to-b from-black/20 via-black/10 to-black/60'
                    }`} />
            </div>

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-black/60 backdrop-blur-xl border-r border-white/5 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
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
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-bold tracking-widest uppercase transition-all group ${isActive
                                        ? 'bg-wts-green text-black'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <item.icon size={20} />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Bottom Profile */}
                    <div className="p-4 border-t border-white/5">
                        <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/5">
                            <div className="w-9 h-9 rounded-full bg-wts-green flex items-center justify-center text-black font-bold text-sm">
                                AC
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest font-mono">
                                    The Gaffer
                                </p>
                                <p className="text-xs font-bold text-white truncate">WORKTHESPACE</p>
                                <div className="mt-1 inline-block px-2 py-0.5 bg-wts-green/10 border border-wts-green/20 rounded text-[7px] font-bold text-wts-green uppercase tracking-widest">
                                    Premium Pro
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col relative overflow-hidden h-full z-10">

                {/* Dashboard Header */}
                <header className="h-16 border-b border-white/5 bg-black/50 backdrop-blur-xl flex items-center justify-between px-6 z-40 safe-top relative">
                    <div className="flex items-center space-x-4">
                        <button className="lg:hidden text-gray-400 p-2" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                            <Menu size={20} />
                        </button>
                        <h1 className="text-sm font-bold tracking-widest uppercase text-white font-outfit">SQUAD DASHBOARD</h1>
                    </div>

                    <div className="flex items-center space-x-3 relative">
                        <button
                            className="relative p-2 text-gray-400 hover:text-white transition-colors"
                            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                        >
                            <Bell size={18} />
                            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-wts-green rounded-full" />
                        </button>

                        {/* Notification Dropdown */}
                        {isNotificationsOpen && (
                            <div className="absolute top-12 right-0 w-80 bg-[#0A0A0A] border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 origin-top-right">
                                <div className="p-3 border-b border-white/5 flex items-center justify-between">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Notifications</h3>
                                    <button className="text-[10px] text-wts-green hover:underline">Mark all read</button>
                                </div>
                                <div className="max-h-64 overflow-y-auto">
                                    {[
                                        { title: 'Match Confirmed', desc: 'vs Tech United scheduled for Tuesday 19:30', time: '2m ago', unread: true },
                                        { title: 'Fee Payment', desc: 'Ryan Williams paid £5.00', time: '1h ago', unread: true },
                                        { title: 'Squad Update', desc: 'Daniel Vieri set status: Available', time: '3h ago', unread: false },
                                    ].map((notif, i) => (
                                        <div key={i} className={`p-3 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer ${notif.unread ? 'bg-white/[0.02]' : ''}`}>
                                            <div className="flex items-start justify-between mb-1">
                                                <span className={`text-xs font-bold ${notif.unread ? 'text-white' : 'text-gray-400'}`}>{notif.title}</span>
                                                <span className="text-[9px] text-gray-600">{notif.time}</span>
                                            </div>
                                            <p className="text-[10px] text-gray-500 leading-relaxed">{notif.desc}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-2 text-center border-t border-white/5">
                                    <button className="text-[10px] font-bold text-gray-500 hover:text-white uppercase tracking-widest transition-colors">
                                        View All Activity
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 no-scrollbar scroll-smooth relative z-10">
                    {children}
                </div>
            </main>
        </div>
    );
}
