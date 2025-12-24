import { Container } from '@/components/ui/container';
import { Trophy, Globe, Twitter } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-black/40 border-t border-white/5 py-12 backdrop-blur-sm">
            <Container>
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Logo */}
                    <div className="flex items-center space-x-2 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                        <Trophy className="text-wts-green w-5 h-5" />
                        <span className="font-display font-bold text-lg italic text-white tracking-tight">WORKTHESPACE</span>
                    </div>

                    {/* Links */}
                    <div className="flex items-center space-x-8 text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                        <a href="#" className="hover:text-white transition-colors">PRODUCT</a>
                        <a href="#" className="hover:text-white transition-colors">TERMS</a>
                        <a href="#" className="hover:text-white transition-colors">PRICING</a>
                        <a href="#" className="hover:text-white transition-colors">CONTACT</a>
                    </div>

                    {/* Social */}
                    <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 transition-colors cursor-pointer">
                            <Globe size={14} />
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 transition-colors cursor-pointer">
                            <Twitter size={14} />
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center text-[10px] text-gray-800 font-mono">
                    © 2024 WORKTHESPACE SPORTS LTD. ALL RIGHTS RESERVED. BUILT FOR THE LOVE OF THE GAME.
                </div>
            </Container>
        </footer>
    );
}
