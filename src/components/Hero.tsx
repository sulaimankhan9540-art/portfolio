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
    <section id="home" className="relative min-h-screen flex items-center bg-gradient-to-br from-primary-50 via-white to-primary-100 overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-primary-100 mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-primary-700">Available for opportunities</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-900 leading-tight mb-4">{profile.name}</h1>
            <p className="text-xl sm:text-2xl text-primary-600 font-medium mb-4">{profile.title}</p>
            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">{profile.tagline}</p>

            <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
              <button onClick={onDownloadCV}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-800 text-white font-semibold rounded-xl hover:bg-primary-900 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                <Download className="w-5 h-5" />Download CV
              </button>
              <button onClick={scrollToContact}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-800 font-semibold rounded-xl border-2 border-primary-200 hover:border-primary-400 hover:bg-primary-50 transition-all">
                <Mail className="w-5 h-5" />Contact Me
              </button>
            </div>

            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {!isPlaceholder(profile.linkedin) && (
                <a href={profile.linkedin.startsWith('http') ? profile.linkedin : 'https://' + profile.linkedin} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#0077b5] text-white rounded-lg hover:bg-[#005885] transition-colors text-sm font-medium">
                  <Linkedin className="w-4 h-4" />LinkedIn
                </a>
              )}
              {!isPlaceholder(profile.whatsapp) && (
                <a href={'https://wa.me/' + profile.whatsapp.replace(/\D/g, '')} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded-lg hover:bg-[#128C7E] transition-colors text-sm font-medium">
                  <MessageCircle className="w-4 h-4" />WhatsApp
                </a>
              )}
            </div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full blur-2xl opacity-30 scale-110" />
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-gray-100">
                {profile.photo ? (
                  <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200">
                    <span className="text-6xl sm:text-8xl font-bold text-primary-300">{initials}</span>
                  </div>
                )}
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg px-4 py-3 border border-gray-100">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary-600" />
                  <span className="text-sm font-medium text-gray-700">{profile.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button onClick={scrollToAbout} className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-gray-400 hover:text-primary-600 transition-colors" aria-label="Scroll down">
          <ChevronDown className="w-8 h-8" />
        </button>
      </div>
    </section>
  );
};
