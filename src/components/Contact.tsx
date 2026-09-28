import React from 'react';
import { Mail, Phone, MessageCircle, MapPin, Linkedin } from 'lucide-react';
import { Profile } from '../types';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface ContactProps {
  profile: Profile;
}

export const Contact: React.FC<ContactProps> = ({ profile }) => {
  const { ref, isVisible } = useScrollAnimation();
  const isPlaceholder = (v: string) => !v || (v.includes('[') && v.includes(']'));

  return (
    <section id="contact" className="py-20 lg:py-28 bg-slate-950 text-slate-100 relative overflow-hidden">
      
      {/* Ambient Blue Background Glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-cyan-400 tracking-wider uppercase">Get In Touch</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white">Contact Me</h2>
            <div className="mt-4 w-20 h-1 bg-cyan-400 mx-auto rounded-full" />
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center">
            
            {/* Info Cards Column */}
            <div className="space-y-4">
              {[
                { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
                { icon: Phone, label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
                { icon: MessageCircle, label: 'WhatsApp', value: profile.whatsapp, href: `https://wa.me/${profile.whatsapp.replace(/\D/g, '')}` },
                { icon: MapPin, label: 'Location', value: profile.location, href: null },
              ].map((item, i) => (
                item.value && !isPlaceholder(item.value) ? (
                  <div key={i} className="flex items-center gap-4 p-4 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl hover:border-cyan-500/30 transition-all">
                    <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl shadow-inner text-cyan-400">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-cyan-400/80 uppercase tracking-wider">{item.label}</p>
                      {item.href ? (
                        <a 
                          href={item.href} 
                          target={item.label === 'WhatsApp' ? '_blank' : undefined} 
                          rel="noreferrer"
                          className="font-medium text-slate-200 hover:text-cyan-300 transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-medium text-slate-200">{item.value}</p>
                      )}
                    </div>
                  </div>
                ) : null
              ))}
            </div>

            {/* Quick Action Buttons Column */}
            <div className="flex flex-col gap-3 justify-center">
              {!isPlaceholder(profile.whatsapp) && profile.whatsapp && (
                <a 
                  href={`https://wa.me/${profile.whatsapp.replace(/\D/g, '')}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] text-white rounded-xl font-semibold hover:bg-[#128C7E] transition-all shadow-lg hover:scale-105 active:scale-100 border border-emerald-400/20"
                >
                  <MessageCircle className="w-5 h-5" /> WhatsApp Me
                </a>
              )}

              {!isPlaceholder(profile.phone) && profile.phone && (
                <a 
                  href={`tel:${profile.phone.replace(/\s/g, '')}`}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900/90 text-white rounded-xl font-semibold hover:bg-slate-800 border border-slate-700 hover:border-cyan-400/50 transition-all shadow-lg hover:scale-105 active:scale-100"
                >
                  <Phone className="w-5 h-5 text-cyan-400" /> Call Me
                </a>
              )}

              {!isPlaceholder(profile.email) && profile.email && (
                <a 
                  href={`mailto:${profile.email}`}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-cyan-500/20 transition-all shadow-lg hover:scale-105 active:scale-100 border border-cyan-300/30"
                >
                  <Mail className="w-5 h-5 text-cyan-100" /> Email Me
                </a>
              )}

              {!isPlaceholder(profile.linkedin) && profile.linkedin && (
                <a 
                  href={profile.linkedin.startsWith('http') ? profile.linkedin : `https://${profile.linkedin}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0077b5] text-white rounded-xl font-semibold hover:bg-[#005885] transition-all shadow-lg hover:scale-105 active:scale-100 border border-blue-400/20"
                >
                  <Linkedin className="w-5 h-5" /> LinkedIn Profile
                </a>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};