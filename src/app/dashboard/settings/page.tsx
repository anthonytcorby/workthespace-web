'use client';

import { Settings as SettingsIcon, Bell, Wallet, Shield, Users } from 'lucide-react';

export default function SettingsPage() {
    return (
        <div className="space-y-6 max-w-[1000px] mx-auto">
            {/* Page Header */}
            <div>
                <span className="text-wts-green text-[9px] font-bold tracking-[0.3em] uppercase block mb-1.5 font-mono">
                    SYSTEM CONFIGURATION
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-bold italic uppercase tracking-tighter text-white">
                    SETTINGS
                </h2>
            </div>

            {/* Team Configuration */}
            <div className="bg-black/40 border border-white/5 rounded-xl p-6">
                <div className="flex items-center space-x-2 mb-5">
                    <div className="p-1.5 bg-white/5 rounded-md">
                        <Users className="text-gray-400 w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-[10px] uppercase tracking-[0.15em] text-white">
                        Team Configuration
                    </h3>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="text-[9px] font-bold text-gray-600 uppercase tracking-widest block mb-2">
                            Team Name
                        </label>
                        <input
                            type="text"
                            defaultValue="WORKTHESPACE"
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-wts-green/50"
                        />
                    </div>
                    <div>
                        <label className="text-[9px] font-bold text-gray-600 uppercase tracking-widest block mb-2">
                            Default Formation
                        </label>
                        <select className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-wts-green/50">
                            <option>4-4-2</option>
                            <option>4-3-3</option>
                            <option>3-5-2</option>
                            <option>4-2-3-1</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-black/40 border border-white/5 rounded-xl p-6">
                <div className="flex items-center space-x-2 mb-5">
                    <div className="p-1.5 bg-white/5 rounded-md">
                        <Bell className="text-gray-400 w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-[10px] uppercase tracking-[0.15em] text-white">
                        Notification Rules
                    </h3>
                </div>
                <div className="space-y-3">
                    <label className="flex items-center justify-between p-3 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
                        <span className="text-[10px] font-bold text-white">Fixture Reminders (24h before)</span>
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                    </label>
                    <label className="flex items-center justify-between p-3 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
                        <span className="text-[10px] font-bold text-white">Availability Notifications</span>
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                    </label>
                    <label className="flex items-center justify-between p-3 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
                        <span className="text-[10px] font-bold text-white">Payment Reminders</span>
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                    </label>
                </div>
            </div>

            {/* Payment Setup */}
            <div className="bg-black/40 border border-white/5 rounded-xl p-6">
                <div className="flex items-center space-x-2 mb-5">
                    <div className="p-1.5 bg-white/5 rounded-md">
                        <Wallet className="text-gray-400 w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-[10px] uppercase tracking-[0.15em] text-white">
                        Payment Setup
                    </h3>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="text-[9px] font-bold text-gray-600 uppercase tracking-widest block mb-2">
                            Per-Match Fee (£)
                        </label>
                        <input
                            type="number"
                            defaultValue="5"
                            step="0.50"
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-wts-green/50"
                        />
                    </div>
                    <div>
                        <label className="text-[9px] font-bold text-gray-600 uppercase tracking-widest block mb-2">
                            Payment Method
                        </label>
                        <select className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-wts-green/50">
                            <option>Cash</option>
                            <option>Bank Transfer</option>
                            <option>PayPal</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Subscription */}
            <div className="bg-black/40 border border-wts-green/20 rounded-xl p-6">
                <div className="flex items-center space-x-2 mb-5">
                    <div className="p-1.5 bg-wts-green/10 rounded-md">
                        <Shield className="text-wts-green w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-[10px] uppercase tracking-[0.15em] text-white">
                        Subscription Management
                    </h3>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-bold text-white">Current Plan</p>
                            <p className="text-[9px] text-gray-500 font-mono">Active since Dec 2024</p>
                        </div>
                        <div className="px-3 py-1.5 bg-wts-green/10 border border-wts-green/20 rounded">
                            <span className="text-[9px] font-bold text-wts-green uppercase tracking-widest">
                                Premium Pro
                            </span>
                        </div>
                    </div>
                    <button className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold uppercase tracking-widest text-white hover:bg-white/10 transition-colors">
                        Manage Subscription
                    </button>
                </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
                <button className="px-6 py-3 bg-wts-green/10 border border-wts-green/20 rounded-lg text-[10px] font-bold uppercase tracking-widest text-wts-green hover:bg-wts-green/20 transition-colors">
                    Save Changes
                </button>
            </div>
        </div>
    );
}
