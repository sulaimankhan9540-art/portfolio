import React, { useRef, useEffect } from 'react';
import { Printer } from 'lucide-react';
import { PortfolioData } from '../types';

interface CVGeneratorProps {
  data: PortfolioData;
}

export const CVGenerator: React.FC<CVGeneratorProps> = ({ data }) => {
  const cvRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (!cvRef.current) return;

    const printContent = cvRef.current.innerHTML;
    const printWindow = window.open('', '_blank', 'width=800,height=900');

    if (!printWindow) {
      alert('Please allow popups to print/save your CV.');
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${data.profile.name || 'CV'}</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            @page {
              size: A4 portrait;
              margin: 0; /* Removes browser top date/time & bottom URL footers */
            }
            body {
              background: #ffffff;
              font-family: 'Inter', sans-serif;
              color: #000000;
              margin: 0;
              padding: 12mm 15mm;
            }
            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            section, div, li {
              break-inside: avoid;
              page-break-inside: avoid;
            }
          </style>
        </head>
        <body>
          <div class="max-w-[210mm] mx-auto bg-white">
            ${printContent}
          </div>
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
                window.close();
              }, 300);
            };
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
  };

  // Listens for print events sent from Navbar or Hero buttons
  useEffect(() => {
    const handleTrigger = () => handlePrint();
    window.addEventListener('trigger-cv-print', handleTrigger);
    return () => window.removeEventListener('trigger-cv-print', handleTrigger);
  }, [data]);

  const clean = (v: string) => {
    if (!v) return '';
    if (v.includes('[') && v.includes(']')) return '';
    return v;
  };

  return (
    <div className="space-y-4">
      {/* Print Button Header */}
      <div className="flex gap-3 no-print">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 bg-primary-800 text-white rounded-lg hover:bg-primary-900 text-sm font-medium transition-colors"
        >
          <Printer className="w-4 h-4" /> Print / Save as PDF
        </button>
        <p className="text-xs text-gray-500 self-center">
          Tip: Disable "Headers and footers" in print settings if URLs still appear.
        </p>
      </div>

      {/* CV Target Container */}
      <div className="bg-white">
        <div ref={cvRef} className="cv-print bg-white p-6 max-w-[210mm] mx-auto shadow-sm">
          {/* Header */}
          <div className="flex items-start gap-5 mb-4 pb-3 border-b-2 border-primary-800">
            {data.profile.photo && clean(data.profile.photo) && (
              <img
                src={data.profile.photo}
                alt=""
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-200 shrink-0"
              />
            )}
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-primary-900 leading-tight">
                {data.profile.name}
              </h1>
              <p className="text-sm text-primary-700 font-medium mt-0.5 leading-snug">
                {data.profile.title}
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-2 text-xs text-gray-600">
                {clean(data.profile.email) && <span>{data.profile.email}</span>}
                {clean(data.profile.phone) && <span>{data.profile.phone}</span>}
                {clean(data.profile.linkedin) && <span>{data.profile.linkedin}</span>}
                {clean(data.profile.location) && <span>{data.profile.location}</span>}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* Summary */}
            {clean(data.profile.summary) && (
              <section>
                <h2 className="text-sm font-bold text-primary-900 uppercase tracking-wide border-b border-gray-300 pb-0.5 mb-1.5">
                  Professional Summary
                </h2>
                <p className="text-xs text-gray-700 leading-relaxed text-justify">
                  {data.profile.summary}
                </p>
              </section>
            )}

            {/* Education */}
            {data.education.length > 0 && (
              <section>
                <h2 className="text-sm font-bold text-primary-900 uppercase tracking-wide border-b border-gray-300 pb-0.5 mb-2">
                  Education
                </h2>
                <div className="space-y-2">
                  {data.education.map((edu) => (
                    <div key={edu.id}>
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-xs font-bold text-gray-900">
                          {edu.degree}
                          {edu.field ? ` - ${edu.field}` : ''}
                        </h3>
                        <span className="text-[10px] text-gray-500 shrink-0 ml-2">
                          {edu.startYear} - {edu.endYear}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-700">{edu.institution}</p>
                      {edu.grade && <p className="text-[10px] text-gray-500">{edu.grade}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Experience */}
            {data.experience.length > 0 && (
              <section>
                <h2 className="text-sm font-bold text-primary-900 uppercase tracking-wide border-b border-gray-300 pb-0.5 mb-2">
                  Experience
                </h2>
                <div className="space-y-2.5">
                  {data.experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-xs font-bold text-gray-900">{exp.title}</h3>
                        <span className="text-[10px] text-gray-500 shrink-0 ml-2">
                          {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-700">
                        {exp.company}
                        {exp.employmentType ? ` | ${exp.employmentType}` : ''}
                      </p>
                      {clean(exp.description) && (
                        <p className="text-[10px] text-gray-700 mt-0.5 leading-relaxed">
                          {exp.description}
                        </p>
                      )}
                      {exp.responsibilities.length > 0 && (
                        <ul className="mt-1 space-y-0">
                          {exp.responsibilities.map((resp, i) => (
                            <li key={i} className="text-[10px] text-gray-600 pl-3 relative">
                              <span className="absolute left-0 top-0">-</span>
                              {resp}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Skills */}
            {data.skills.length > 0 && (
              <section>
                <h2 className="text-sm font-bold text-primary-900 uppercase tracking-wide border-b border-gray-300 pb-0.5 mb-1.5">
                  Skills
                </h2>
                <p className="text-[11px] text-gray-700">
                  {data.skills.map((s) => s.name).join(', ')}
                </p>
              </section>
            )}

            {/* Projects */}
            {data.projects.length > 0 && (
              <section>
                <h2 className="text-sm font-bold text-primary-900 uppercase tracking-wide border-b border-gray-300 pb-0.5 mb-2">
                  Projects
                </h2>
                <div className="space-y-1.5">
                  {data.projects.map((p) => (
                    <div key={p.id}>
                      <h3 className="text-xs font-bold text-gray-900">{p.title}</h3>
                      <p className="text-[10px] text-gray-600 leading-relaxed">
                        {p.shortDescription || p.detailedDescription}
                      </p>
                      {p.tools.length > 0 && (
                        <p className="text-[10px] text-gray-500 mt-0.5">
                          Tools: {p.tools.join(', ')}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certificates */}
            {data.certificates.length > 0 && (
              <section>
                <h2 className="text-sm font-bold text-primary-900 uppercase tracking-wide border-b border-gray-300 pb-0.5 mb-1.5">
                  Certifications
                </h2>
                <div className="space-y-1">
                  {data.certificates.map((c) => (
                    <div key={c.id} className="flex justify-between items-baseline">
                      <span className="text-[11px] font-medium text-gray-800">{c.title}</span>
                      <span className="text-[10px] text-gray-500 shrink-0 ml-2">
                        {c.organization}, {c.date}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};