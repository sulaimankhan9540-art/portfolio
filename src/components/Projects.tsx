import React, { useState } from 'react';
import { FolderGit2, Wrench, ExternalLink, Github, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '../types';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Modal } from './ui/Modal';

interface ProjectsProps {
  projects: Project[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const { ref, isVisible } = useScrollAnimation();
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (projects.length === 0) return null;

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category).filter(Boolean)))];
  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  const nextImage = () => {
    if (selectedProject && selectedProject.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProject.images.length);
    }
  };

  const prevImage = () => {
    if (selectedProject && selectedProject.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length);
    }
  };

  return (
    <section id="projects" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-primary-600 tracking-wider uppercase">Portfolio</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-primary-900">Projects</h2>
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
            {filtered.map((project) => (
              <div key={project.id} 
                onClick={() => { setSelectedProject(project); setCurrentImageIndex(0); }}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer">
                <div className="relative h-52 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center overflow-hidden">
                  {project.images.length > 0 ? (
                    <img src={project.images[0]} alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <FolderGit2 className="w-16 h-16 text-primary-300" />
                  )}
                  {project.images.length > 1 && (
                    <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 text-white text-xs rounded-full font-medium">
                      {project.images.length} photos
                    </div>
                  )}
                  <div className="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/40 transition-colors flex items-center justify-center">
                    <span className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-all">View Details</span>
                  </div>
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider">{project.category}</span>
                  <h3 className="text-lg font-bold text-primary-900 mt-1">{project.title}</h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{project.shortDescription}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.tools.slice(0, 3).map((tool, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">{tool}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} 
        title={selectedProject?.title || ''} size="lg">
        {selectedProject && (
          <div className="space-y-5">
            {/* Image Gallery */}
            {selectedProject.images.length > 0 && (
              <div className="relative rounded-xl overflow-hidden bg-gray-100">
                <img src={selectedProject.images[currentImageIndex]} alt={selectedProject.title} 
                  className="w-full h-64 sm:h-80 object-cover" />
                {selectedProject.images.length > 1 && (
                  <>
                    <button onClick={prevImage} 
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full hover:bg-white shadow-md transition-colors">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button onClick={nextImage} 
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full hover:bg-white shadow-md transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/60 text-white text-sm rounded-full font-medium">
                      {currentImageIndex + 1} / {selectedProject.images.length}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Thumbnails */}
            {selectedProject.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {selectedProject.images.map((img, idx) => (
                  <button key={idx} onClick={() => setCurrentImageIndex(idx)}
                    className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${currentImageIndex === idx ? 'border-primary-600' : 'border-transparent'}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{selectedProject.detailedDescription || selectedProject.shortDescription}</p>
            </div>

            {selectedProject.role && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">My Role</h4>
                <p className="text-sm text-gray-600">{selectedProject.role}</p>
              </div>
            )}

            <div>
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Wrench className="w-4 h-4" /> Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tools.map((t, i) => (
                  <span key={i} className="px-3 py-1 bg-primary-50 text-primary-700 text-sm rounded-lg font-medium">{t}</span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              {selectedProject.githubUrl && (
                <a href={selectedProject.githubUrl} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800 transition-colors">
                  <Github className="w-4 h-4" /> GitHub
                </a>
              )}
              {selectedProject.liveUrl && (
                <a href={selectedProject.liveUrl} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700 transition-colors">
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
              )}
              {selectedProject.documentation && (
                <a href={selectedProject.documentation} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-accent-100 text-accent-800 rounded-lg text-sm hover:bg-accent-200 transition-colors">
                  <FileText className="w-4 h-4" /> Documentation
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};
