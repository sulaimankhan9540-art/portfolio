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

  if (certificates.length === 0) return null;

  const categories = ['All', ...Array.from(new Set(certificates.map(c => c.category).filter(Boolean)))];
  const filtered = filter === 'All' ? certificates : certificates.filter(c => c.category === filter);

  return (
    <section id="certificates" className="py-20 lg:py-28 bg-primary-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-primary-600 tracking-wider uppercase">Credentials</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-primary-900">Certificates</h2>
            <div className="mt-4 w-20 h-1 bg-accent-500 mx-auto rounded-full" />
          </div>

          {categories.length > 1 && (
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {categories.map(cat => (
                <button key={cat} onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === cat ? 'bg-primary-800 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}>
                  {cat}
                </button>
              ))}
            </div>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((cert) => (
              <div key={cert.id} onClick={() => cert.file && onViewCertificate(cert.file, cert.title)}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer">
                <div className="relative h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center overflow-hidden">
                  {cert.file ? (
                    cert.file.startsWith('data:application/pdf') ? (
                      <div className="text-center">
                        <FileText className="w-16 h-16 text-primary-400 mx-auto" />
                        <p className="mt-2 text-sm text-primary-600 font-medium">PDF Document</p>
                      </div>
                    ) : (
                      <img src={cert.file} alt={cert.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    )
                  ) : (
                    <Award className="w-16 h-16 text-primary-300" />
                  )}
                  <div className="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/40 transition-colors flex items-center justify-center">
                    <span className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-all">View Certificate</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-primary-900 group-hover:text-primary-700 transition-colors">{cert.title}</h3>
                  <div className="flex items-center gap-1.5 mt-2 text-sm text-gray-500">
                    <Building2 className="w-4 h-4" /><span>{cert.organization}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" /><span>{cert.date}</span>
                  </div>
                  {cert.credentialId && <p className="mt-2 text-xs text-gray-400">ID: {cert.credentialId}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
