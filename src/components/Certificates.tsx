import React, { useState } from 'react';
import { Award, Calendar, Building2, FileText } from 'lucide-react';
import { Certificate as CertificateType } from '../types';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface CertificatesProps {
  certificates: CertificateType[];
  onViewCertificate: (file: string, title: string) => void;
}

export const Certificates: React.FC<CertificatesProps> = ({ certificates, onViewCertificate }) => {
  const { ref, isVisible } = useScrollAnimation();
  const [filter, setFilter] = useState('All');

  if (!certificates || certificates.length === 0) return null;

  const categories = ['All', ...Array.from(new Set(certificates.map(c => c.category).filter(Boolean)))];
  const filtered = filter === 'All' ? certificates : certificates.filter(c => c.category === filter);

  return (
    <section id="certificates" className="py-20 lg:py-28 bg-slate-950 text-slate-100 relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-cyan-400 tracking-wider uppercase">Credentials</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white">Certificates</h2>
            <div className="mt-4 w-20 h-1 bg-cyan-400 mx-auto rounded-full" />
          </div>

          {/* Filter Buttons */}
          {categories.length > 1 && (
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {categories.map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    filter === cat 
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20' 
                      : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Certificates Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((cert) => (
              <div 
                key={cert.id} 
                onClick={() => cert.file && onViewCertificate(cert.file, cert.title)}
                className="group bg-slate-900/80 backdrop-blur-md rounded-2xl overflow-hidden border border-slate-800 shadow-xl hover:border-cyan-500/40 hover:shadow-cyan-500/10 transition-all duration-300 cursor-pointer"
              >
                {/* Certificate Preview Header */}
                <div className="relative h-48 bg-slate-900 flex items-center justify-center overflow-hidden border-b border-slate-800">
                  {cert.file ? (
                    cert.file.startsWith('data:application/pdf') ? (
                      <div className="text-center p-4">
                        <FileText className="w-14 h-14 text-cyan-400 mx-auto" />
                        <p className="mt-2 text-sm text-cyan-200 font-medium">PDF Document</p>
                      </div>
                    ) : (
                      <img 
                        src={cert.file} 
                        alt={cert.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    )
                  ) : (
                    <Award className="w-16 h-16 text-slate-700" />
                  )}
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold rounded-lg shadow-md">
                      View Certificate
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {cert.title}
                  </h3>
                  
                  <div className="flex items-center gap-1.5 mt-2 text-sm text-slate-400">
                    <Building2 className="w-4 h-4 text-cyan-400/80" />
                    <span>{cert.organization}</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 mt-1 text-sm text-slate-400">
                    <Calendar className="w-4 h-4 text-cyan-400/80" />
                    <span>{cert.date}</span>
                  </div>
                  
                  {cert.credentialId && (
                    <p className="mt-3 text-xs font-mono text-cyan-400/70 bg-slate-950/60 px-2.5 py-1 rounded-md border border-slate-800 inline-block">
                      ID: {cert.credentialId}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};