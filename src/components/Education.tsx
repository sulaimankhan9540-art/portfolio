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
    <section id="education" className="py-20 lg:py-28 bg-primary-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-primary-600 tracking-wider uppercase">Academic Background</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-primary-900">Education</h2>
            <div className="mt-4 w-20 h-1 bg-accent-500 mx-auto rounded-full" />
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-primary-200" />
            <div className="space-y-12">
              {education.map((edu, index) => (
                <div key={edu.id} className={`relative flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-accent-500 rounded-full border-4 border-white shadow-md z-10" />
                  <div className={`w-full lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary-100 rounded-xl shrink-0">
                          <GraduationCap className="w-6 h-6 text-primary-700" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-bold text-primary-900">{edu.degree}</h3>
                          <p className="text-primary-600 font-medium mt-1">{edu.field}</p>
                          <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
                            <div className="flex items-center gap-1.5"><Building2 className="w-4 h-4" /><span>{edu.institution}</span></div>
                            <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /><span>{edu.startYear} - {edu.endYear}</span></div>
                          </div>
                          {edu.grade && (
                            <div className="flex items-center gap-1.5 mt-2 text-sm">
                              <Award className="w-4 h-4 text-accent-600" />
                              <span className="font-semibold text-accent-700">{edu.grade}</span>
                            </div>
                          )}
                          {edu.description && <p className="mt-3 text-gray-600 text-sm leading-relaxed">{edu.description}</p>}
                          {edu.certificate && (
                            <button 
                              onClick={() => handleCertificateClick(edu.certificate!, edu.degree)}
                              className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-700 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors border border-primary-100"
                            >
                              <FileText className="w-4 h-4" />
                              <span>View Certificate</span>
                              <ExternalLink className="w-3.5 h-3.5 text-primary-500" />
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