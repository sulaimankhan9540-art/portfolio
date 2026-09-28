import React from 'react';
import { Heart } from 'lucide-react';
import { Profile } from '../types';

interface FooterProps {
  profile: Profile;
}

export const Footer: React.FC<FooterProps> = ({ profile }) => (
  <footer className="bg-slate-950 text-slate-100 py-12 border-t border-slate-900 relative">
    
    {/* Subtle top ambient lighting bar */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h3 className="text-2xl font-bold mb-1 text-white tracking-tight">{profile.name}</h3>
      <p className="text-cyan-400 text-sm font-medium mb-6">{profile.title}</p>

      <div className="flex justify-center items-center gap-6 mb-8 text-sm font-medium">
        {profile.linkedin && (
          <a 
            href={profile.linkedin.startsWith('http') ? profile.linkedin : `https://${profile.linkedin}`}
            target="_blank" 
            rel="noreferrer" 
            className="text-slate-400 hover:text-cyan-400 transition-colors"
          >
            LinkedIn
          </a>
        )}
        {profile.github && (
          <a 
            href={profile.github.startsWith('http') ? profile.github : `https://${profile.github}`} 
            target="_blank" 
            rel="noreferrer" 
            className="text-slate-400 hover:text-cyan-400 transition-colors"
          >
            GitHub
          </a>
        )}
        {profile.email && (
          <a 
            href={`mailto:${profile.email}`} 
            className="text-slate-400 hover:text-cyan-400 transition-colors"
          >
            Email
          </a>
        )}
      </div>

      <div className="pt-8 border-t border-slate-900 text-xs text-slate-500 flex items-center justify-center gap-1.5 flex-wrap">
        <span>&copy; {new Date().getFullYear()} {profile.name}. Built with</span>
        <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
        <span>All rights reserved.</span>
      </div>
    </div>
  </footer>
);