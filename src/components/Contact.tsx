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
    <section id="contact" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-primary-600 tracking-wider uppercase">Get In Touch</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-primary-900">Contact Me</h2>
            <div className="mt-4 w-20 h-1 bg-accent-500 mx-auto rounded-full" />
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {[
                { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
                { icon: Phone, label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
                { icon: MessageCircle, label: 'WhatsApp', value: profile.whatsapp, href: `https://wa.me/${profile.whatsapp.replace(/\D/g, '')}` },
                { icon: MapPin, label: 'Location', value: profile.location, href: null },
              ].map((item, i) => (
                item.value && !isPlaceholder(item.value) ? (
                  <div key={i} className="flex items-center gap-4 p-4 bg-primary-50 rounded-xl">
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      <item.icon className="w-5 h-5 text-primary-700" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} target={item.label === 'WhatsApp' ? '_blank' : undefined} rel="noreferrer"
                          className="font-medium text-gray-900 hover:text-primary-700 transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-medium text-gray-900">{item.value}</p>
                      )}
                    </div>
                  </div>
                ) : null
              ))}
            </div>

            <div className="flex flex-col gap-3 justify-center">
              {!isPlaceholder(profile.whatsapp) && profile.whatsapp && (
                <a href={`https://wa.me/${profile.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-xl font-semibold hover:bg-[#128C7E] transition-colors shadow-sm">
                  <MessageCircle className="w-5 h-5" /> WhatsApp Me
                </a>
              )}
              {!isPlaceholder(profile.phone) && profile.phone && (
                <a href={`tel:${profile.phone.replace(/\s/g, '')}`}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-primary-800 text-white rounded-xl font-semibold hover:bg-primary-900 transition-colors shadow-sm">
                  <Phone className="w-5 h-5" /> Call Me
                </a>
              )}
              {!isPlaceholder(profile.email) && profile.email && (
                <a href={`mailto:${profile.email}`}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-accent-500 text-white rounded-xl font-semibold hover:bg-accent-600 transition-colors shadow-sm">
                  <Mail className="w-5 h-5" /> Email Me
                </a>
              )}
              {!isPlaceholder(profile.linkedin) && profile.linkedin && (
                <a href={profile.linkedin.startsWith('http') ? profile.linkedin : `https://${profile.linkedin}`} target="_blank" rel="noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-[#0077b5] text-white rounded-xl font-semibold hover:bg-[#005885] transition-colors shadow-sm">
                  <Linkedin className="w-5 h-5" /> LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
