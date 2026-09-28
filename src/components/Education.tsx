import React from 'react';
import { GraduationCap, Calendar, Building2, Award, FileText, ExternalLink } from 'lucide-react';
import { Education as EducationType } from '../types';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface EducationProps {
  education: EducationType[];
  onViewCertificate?: (file: string, title: string) => void;
}

export const Education: React.FC<EducationProps> = ({ education, onViewCertificate }) => {
  const { ref, isVisible } = useScrollAnimation();
  if (education.length === 0) return null;

  const handleCertificateClick = (certificateUrl: string, title: string) => {
    if (onViewCertificate) {
      onViewCertificate(certificateUrl, title);
    } else {
      window.open(certificateUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="education" className="py-20 lg:py-28 bg-slate-950 text-slate-100 relative overflow-hidden">
      
      {/* Background Glow Overlay */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-cyan-400 tracking-wider uppercase">Academic Background</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white">Education</h2>
            <div className="mt-4 w-20 h-1 bg-cyan-400 mx-auto rounded-full" />
          </div>

          <div className="relative">
            {/* Central Timeline Line */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-slate-800" />
            
            <div className="space-y-12">
              {education.map((edu, index) => (
                <div key={edu.id} className={`relative flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  
                  {/* Timeline Center Node */}
                  <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-cyan-400 rounded-full border-4 border-slate-950 shadow-lg shadow-cyan-500/50 z-10" />
                  
                  <div className={`w-full lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                    <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-slate-800 hover:border-cyan-500/30 shadow-xl transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl shrink-0 text-cyan-400">
                          <GraduationCap className="w-6 h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                          <p className="text-cyan-400 font-medium mt-1">{edu.field}</p>
                          
                          <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-slate-400">
                            <div className="flex items-center gap-1.5">
                              <Building2 className="w-4 h-4 text-cyan-400" />
                              <span>{edu.institution}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-4 h-4 text-cyan-400" />
                              <span>{edu.startYear} - {edu.endYear}</span>
                            </div>
                          </div>

                          {edu.grade && (
                            <div className="flex items-center gap-1.5 mt-2 text-sm">
                              <Award className="w-4 h-4 text-emerald-400" />
                              <span className="font-semibold text-emerald-400">{edu.grade}</span>
                            </div>
                          )}

                          {edu.description && (
                            <p className="mt-3 text-slate-300 text-sm leading-relaxed">{edu.description}</p>
                          )}

                          {edu.certificate && (
                            <button 
                              onClick={() => handleCertificateClick(edu.certificate!, edu.degree)}
                              className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-cyan-300 bg-slate-950 rounded-lg hover:bg-slate-800 transition-colors border border-slate-800 hover:border-cyan-500/30"
                            >
                              <FileText className="w-4 h-4 text-cyan-400" />
                              <span>View Certificate</span>
                              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="hidden lg:block lg:w-1/2" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};