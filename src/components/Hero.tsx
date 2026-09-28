import React from 'react';
import { Download, Mail, Linkedin, MessageCircle, MapPin, ChevronDown } from 'lucide-react';
import { Profile } from '../types';

interface HeroProps {
  profile: Profile;
  onDownloadCV: () => void;
}

export const Hero: React.FC<HeroProps> = ({ profile, onDownloadCV }) => {
  const scrollToContact = () => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  const scrollToAbout = () => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  const isPlaceholder = (v: string) => !v || (v.includes('[') && v.includes(']'));
  const initials = profile.name.split(' ').map(n => n[0]).join('').slice(0, 2);

  return (
    <section id="home" className="relative min-h-screen flex items-center bg-slate-950 text-white overflow-hidden pt-16">
      
      {/* Embedded Keyframes for Animations */}
      <style>{`
        @keyframes floatAnimation {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes orbGlow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.15); }
        }
        .animate-hero-float {
          animation: floatAnimation 4s ease-in-out infinite;
        }
        .animate-hero-orb {
          animation: orbGlow 6s ease-in-out infinite;
        }
      `}</style>

      {/* Ambient Blue/Cyan Glow Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-10 left-10 w-96 h-96 bg-cyan-500/15 rounded-full filter blur-[120px] animate-hero-orb" 
        />
        <div 
          className="absolute bottom-10 right-10 w-[30rem] h-[30rem] bg-blue-600/15 rounded-full filter blur-[140px] animate-hero-orb" 
          style={{ animationDelay: '3s' }} 
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/80 backdrop-blur-md rounded-full shadow-lg border border-cyan-400/30 mb-6 transition-transform hover:scale-105">
              <span className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-ping" />
              <span className="text-sm font-semibold text-cyan-200">Available for opportunities</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4 tracking-tight drop-shadow-md">
              {profile.name}
            </h1>
            <p className="text-xl sm:text-2xl font-semibold mb-4 bg-gradient-to-r from-cyan-300 via-sky-200 to-blue-200 bg-clip-text text-transparent">
              {profile.title}
            </p>
            <p className="text-lg text-slate-300 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {profile.tagline}
            </p>

            {/* Main Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
              <button 
                onClick={onDownloadCV}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-105 transition-all duration-300 active:scale-100 group border border-cyan-300/30"
              >
                <Download className="w-5 h-5 group-hover:scale-110 transition-transform text-cyan-100" />
                <span>Download CV</span>
              </button>
              
              <button 
                onClick={scrollToContact}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-slate-900/80 text-white font-semibold rounded-xl border border-slate-700 hover:border-cyan-400/50 hover:bg-slate-800 shadow-md backdrop-blur-md transition-all duration-300 transform hover:-translate-y-1"
              >
                <Mail className="w-5 h-5 text-cyan-300" />
                <span>Contact Me</span>
              </button>
            </div>

            {/* Social Link Badges */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {!isPlaceholder(profile.linkedin) && (
                <a 
                  href={profile.linkedin.startsWith('http') ? profile.linkedin : 'https://' + profile.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#0077b5] text-white rounded-lg hover:bg-[#005885] shadow-md hover:-translate-y-0.5 transition-all text-sm font-medium border border-blue-400/20"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              )}
              {!isPlaceholder(profile.whatsapp) && (
                <a 
                  href={'https://wa.me/' + profile.whatsapp.replace(/\D/g, '')} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded-lg hover:bg-[#128C7E] shadow-md hover:-translate-y-0.5 transition-all text-sm font-medium border border-emerald-400/20"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              )}
            </div>
          </div>

          {/* Right Image Container */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative group animate-hero-float">
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-600 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition duration-500 animate-hero-orb" />
              
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-cyan-300/80 shadow-2xl bg-slate-900 transition-transform duration-500 group-hover:scale-105">
                {profile.photo ? (
                  <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-blue-950">
                    <span className="text-6xl sm:text-8xl font-bold text-cyan-300">{initials}</span>
                  </div>
                )}
              </div>

              {profile.location && (
                <div className="absolute -bottom-2 -right-2 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-xl px-4 py-2.5 border border-cyan-400/30 flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-100 transition-transform hover:scale-105">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span>{profile.location}</span>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Scroll Indicator */}
        <button 
          onClick={scrollToAbout} 
          className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce text-cyan-400/70 hover:text-cyan-300 transition-colors p-2" 
          aria-label="Scroll down"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </div>
    </section>
  );
};