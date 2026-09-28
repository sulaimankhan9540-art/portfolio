import React from 'react';
import { Briefcase, Calendar, MapPin, FileText, CheckCircle2, FolderGit2, ExternalLink } from 'lucide-react';
import { Experience as ExperienceType } from '../types';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface ExperienceProps {
  experience: ExperienceType[];
  onViewCertificate?: (file: string, title: string) => void;
}

export const Experience: React.FC<ExperienceProps> = ({ experience, onViewCertificate }) => {
  const { ref, isVisible } = useScrollAnimation();
  if (experience.length === 0) return null;

  return (
    <section id="experience" className="py-20 lg:py-28 bg-slate-950 text-slate-100 relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-cyan-400 tracking-wider uppercase">Work History</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white">Experience</h2>
            <div className="mt-4 w-20 h-1 bg-cyan-400 mx-auto rounded-full" />
          </div>

          <div className="space-y-8 max-w-4xl mx-auto">
            {experience.map((exp) => (
              <div 
                key={exp.id} 
                className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-slate-800 hover:border-cyan-500/30 shadow-xl transition-all duration-300 group"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  
                  {/* Briefcase Icon Box */}
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl shrink-0 group-hover:border-cyan-500/40 text-cyan-400 transition-colors">
                    <Briefcase className="w-6 h-6" />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">{exp.title}</h3>
                        <p className="text-cyan-400 font-medium">{exp.company}</p>
                      </div>
                      <span className="inline-flex px-3 py-1 bg-cyan-950/80 text-cyan-300 text-xs font-semibold rounded-full border border-cyan-500/30 self-start sm:self-auto">
                        {exp.employmentType}
                      </span>
                    </div>

                    {/* Metadata */}
                    <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-cyan-400" />
                        <span>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                      </div>
                      {exp.location && (
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-cyan-400" />
                          <span>{exp.location}</span>
                        </div>
                      )}
                    </div>

                    {exp.description && (
                      <p className="mt-4 text-slate-300 text-sm leading-relaxed">{exp.description}</p>
                    )}

                    {/* Responsibilities List */}
                    {exp.responsibilities.length > 0 && (
                      <ul className="mt-4 space-y-2">
                        {exp.responsibilities.map((resp, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Skill Tags */}
                    {exp.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {exp.skills.map((skill, idx) => (
                          <span key={idx} className="px-2.5 py-1 bg-slate-950 text-slate-300 border border-slate-800 text-xs font-medium rounded-md">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {/* Project Navigation Link for MAK Pumps */}
                    {exp.company.toLowerCase().includes('mak pumps') && (
                      <div className="mt-5 pt-4 border-t border-slate-800">
                        <a
                          href="#projects"
                          className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-950 hover:bg-slate-800 text-cyan-300 hover:text-cyan-200 text-xs font-semibold rounded-lg transition-colors border border-slate-800 hover:border-cyan-500/40"
                        >
                          <FolderGit2 className="w-4 h-4 text-cyan-400" />
                          <span>View Project: Parametric Agrivoltaic Solar Mounting Structure</span>
                          <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                        </a>
                      </div>
                    )}

                    {/* Certificate Button */}
                    {exp.certificate && onViewCertificate && (
                      <button 
                        onClick={() => onViewCertificate(exp.certificate!, exp.title)}
                        className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-cyan-300 bg-slate-950 rounded-lg hover:bg-slate-800 transition-colors border border-slate-800 hover:border-cyan-500/40"
                      >
                        <FileText className="w-4 h-4 text-cyan-400" />
                        <span>View Certificate</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};