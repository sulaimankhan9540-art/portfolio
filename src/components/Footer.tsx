import React from 'react';
import { Heart } from 'lucide-react';
import { Profile } from '../types';

interface FooterProps {
  profile: Profile;
}

export const Footer: React.FC<FooterProps> = ({ profile }) => (
  <footer className="bg-primary-900 text-white py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h3 className="text-2xl font-bold mb-2">{profile.name}</h3>
      <p className="text-primary-300 mb-6">{profile.title}</p>
      <div className="flex justify-center gap-6 mb-8">
        {profile.linkedin && (
          <a href={profile.linkedin.startsWith('http') ? profile.linkedin : `https://${profile.linkedin}`}
            target="_blank" rel="noreferrer" className="text-primary-300 hover:text-white transition-colors">LinkedIn</a>
        )}
        {profile.github && (
          <a href={profile.github} target="_blank" rel="noreferrer" className="text-primary-300 hover:text-white transition-colors">GitHub</a>
        )}
        {profile.email && (
          <a href={`mailto:${profile.email}`} className="text-primary-300 hover:text-white transition-colors">Email</a>
        )}
      </div>
      <div className="pt-8 border-t border-primary-800 text-sm text-primary-400 flex items-center justify-center gap-1">
        &copy; {new Date().getFullYear()} {profile.name}. Built with <Heart className="w-4 h-4 text-red-400 fill-red-400" /> All rights reserved.
      </div>
    </div>
  </footer>
);
