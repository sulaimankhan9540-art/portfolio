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
    <section id="home" className="relative min-h-screen flex items-center bg-gradient-to-br from-primary-50 via-white to-primary-100/60 overflow-hidden">
      
      {/* Embedded Keyframes for Guaranteed Animations */}
      <style>{`
        @keyframes floatAnimation {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes orbGlow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        .animate-hero-float {
          animation: floatAnimation 4s ease-in-out infinite;
        }
        .animate-hero-orb {
          animation: orbGlow 6s ease-in-out infinite;
        }
      `}</style>

      {/* Animated Ambient Background Blur Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-16 left-10 w-80 h-80 bg-primary-300/40 rounded-full mix-blend-multiply filter blur-3xl animate-hero-orb" 
        />
        <div 
          className="absolute bottom-16 right-10 w-96 h-96 bg-accent-300/40 rounded-full mix-blend-multiply filter blur-3xl animate-hero-orb" 
          style={{ animationDelay: '3s' }} 
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full shadow-sm border border-emerald-100 mb-6 transition-transform hover:scale-105">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
              <span className="text-sm font-semibold text-emerald-800">Available for opportunities</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary-900 leading-tight mb-4 tracking-tight">
              {profile.name}
            </h1>
            <p className="text-xl sm:text-2xl text-primary-600 font-semibold mb-4 bg-gradient-to-r from-primary-700 to-primary-900 bg-clip-text text-transparent">
              {profile.title}
            </p>
            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {profile.tagline}
            </p>

            {/* Main Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
              <button 
                onClick={onDownloadCV}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-primary-900/20 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 group border border-primary-800"
              >
                <Download className="w-5 h-5 group-hover:scale-110 transition-transform text-accent-400" />
                <span>Download CV</span>
              </button>
              
              <button 
                onClick={scrollToContact}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-white text-primary-900 font-semibold rounded-xl border-2 border-primary-200 hover:border-primary-400 hover:bg-primary-50/80 shadow-sm transition-all duration-300 transform hover:-translate-y-1"
              >
                <Mail className="w-5 h-5 text-primary-600" />
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
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#0077b5] text-white rounded-lg hover:bg-[#005885] shadow-sm hover:-translate-y-0.5 transition-all text-sm font-medium"
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
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded-lg hover:bg-[#128C7E] shadow-sm hover:-translate-y-0.5 transition-all text-sm font-medium"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              )}
            </div>
          </div>

          {/* Right Image Container with Floating Halo */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative group animate-hero-float">
              {/* Outer Glowing Gradient Ring */}
              <div className="absolute -inset-2 bg-gradient-to-r from-accent-400 via-primary-500 to-accent-500 rounded-full blur-xl opacity-50 group-hover:opacity-80 transition duration-500 animate-hero-orb" />
              
              {/* Photo Circular Frame */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-gray-100 transition-transform duration-500 group-hover:scale-105">
                {profile.photo ? (
                  <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200">
                    <span className="text-6xl sm:text-8xl font-bold text-primary-300">{initials}</span>
                  </div>
                )}
              </div>

              {/* Floating Location Badge */}
              {profile.location && (
                <div className="absolute -bottom-2 -right-2 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl px-4 py-2.5 border border-gray-100 flex items-center gap-2 text-xs sm:text-sm font-semibold text-primary-900 transition-transform hover:scale-105">
                  <MapPin className="w-4 h-4 text-primary-600" />
                  <span>{profile.location}</span>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Scroll Indicator */}
        <button 
          onClick={scrollToAbout} 
          className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce text-primary-400 hover:text-primary-700 transition-colors p-2" 
          aria-label="Scroll down"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </div>
    </section>
  );
};