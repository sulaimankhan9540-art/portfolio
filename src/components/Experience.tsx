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
    <section id="experience" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-primary-600 tracking-wider uppercase">Work History</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-primary-900">Experience</h2>
            <div className="mt-4 w-20 h-1 bg-accent-500 mx-auto rounded-full" />
          </div>

          <div className="space-y-8 max-w-4xl mx-auto">
            {experience.map((exp) => (
              <div key={exp.id} className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="p-3 bg-primary-100 rounded-xl shrink-0 group-hover:bg-primary-200 transition-colors">
                    <Briefcase className="w-6 h-6 text-primary-700" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <h3 className="text-xl font-bold text-primary-900">{exp.title}</h3>
                        <p className="text-primary-600 font-medium">{exp.company}</p>
                      </div>
                      <span className="inline-flex px-3 py-1 bg-primary-50 text-primary-700 text-xs font-semibold rounded-full border border-primary-100">{exp.employmentType}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
                      <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /><span>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span></div>
                      {exp.location && <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /><span>{exp.location}</span></div>}
                    </div>
                    {exp.description && <p className="mt-4 text-gray-600 leading-relaxed">{exp.description}</p>}
                    {exp.responsibilities.length > 0 && (
                      <ul className="mt-4 space-y-2">
                        {exp.responsibilities.map((resp, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                            <CheckCircle2 className="w-4 h-4 text-accent-500 mt-0.5 shrink-0" /><span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {exp.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {exp.skills.map((skill, idx) => <span key={idx} className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md">{skill}</span>)}
                      </div>
                    )}
                    
                    {/* Project Navigation Link for MAK Pumps */}
                    {exp.company.toLowerCase().includes('mak pumps') && (
                      <div className="mt-5 pt-4 border-t border-gray-100">
                        <a
                          href="#projects"
                          className="inline-flex items-center gap-2 px-3.5 py-2 bg-primary-50 hover:bg-primary-100 text-primary-700 text-xs font-semibold rounded-lg transition-colors border border-primary-200"
                        >
                          <FolderGit2 className="w-4 h-4 text-primary-600" />
                          <span>View Related Project: Parametric Agrivoltaic Solar Mounting Structure</span>
                          <ExternalLink className="w-3.5 h-3.5 text-primary-500" />
                        </a>
                      </div>
                    )}

                    {exp.certificate && onViewCertificate && (
                      <button onClick={() => onViewCertificate(exp.certificate, exp.title)}
                        className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-700 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors">
                        <FileText className="w-4 h-4" />View Certificate
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