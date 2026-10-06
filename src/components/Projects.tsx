import React, { useState } from 'react';
import { X, ChevronRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectsProps {
  projects: Project[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-20 bg-slate-950 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Featured <span className="text-cyan-400">Projects</span>
          </h2>
          <div className="mt-2 w-16 h-1 bg-cyan-500 mx-auto rounded-full"></div>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            A showcase of mechanical engineering designs, CAD modeling, and mechatronic systems.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => {
            const projectImg = Array.isArray(project.images) && project.images.length > 0 
              ? project.images[0] 
              : '';

            const toolsList = project.tools || [];

            return (
              <div 
                key={project.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1 shadow-xl flex flex-col"
              >
                <div className="relative h-48 overflow-hidden bg-slate-950">
                  {projectImg ? (
                    <img 
                      src={projectImg} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-600 bg-slate-900">
                      No Image Available
                    </div>
                  )}
                  <span className="absolute top-3 right-3 bg-cyan-500/90 text-slate-950 font-semibold text-xs px-3 py-1 rounded-full backdrop-blur-md">
                    {project.category}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                      {project.shortDescription}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {toolsList.slice(0, 3).map((tech: string, idx: number) => (
                        <span key={idx} className="text-xs bg-slate-800 text-cyan-300 px-2.5 py-1 rounded-md border border-slate-700">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <button 
                      onClick={() => setSelectedProject(project)}
                      className="w-full py-2.5 px-4 bg-slate-800 hover:bg-cyan-500 text-slate-200 hover:text-slate-950 font-semibold text-sm rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <span>View Details</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* High Contrast Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative text-slate-100">
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white rounded-full transition-colors border border-slate-600"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image/Video Header */}
            <div className="relative h-64 bg-slate-950 overflow-hidden">
              {selectedProject.images && selectedProject.images[0] ? (
                <img 
                  src={selectedProject.images[0]} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-6">
              
              <div>
                <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                  {selectedProject.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  {selectedProject.title}
                </h3>
                {selectedProject.role && (
                  <p className="text-cyan-300 font-medium text-sm mt-1">
                    Role: {selectedProject.role}
                  </p>
                )}
              </div>

              {/* Clear Dark Body Text */}
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <p className="text-slate-200 text-base leading-relaxed">
                  {selectedProject.detailedDescription}
                </p>
              </div>

              {/* Technologies / Tools */}
              {selectedProject.tools && selectedProject.tools.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold uppercase text-slate-300 tracking-wider mb-3">
                    Technologies & Tools
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tools.map((tech: string, idx: number) => (
                      <span 
                        key={idx} 
                        className="px-3 py-1 bg-slate-800 text-cyan-300 font-medium text-xs rounded-lg border border-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </section>
  );
};