import React, { useState } from 'react';
import { FolderGit2, Wrench, ExternalLink, Github, FileText, ChevronLeft, ChevronRight, Play } from 'lucide-react';
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
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

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

  const handleOpenModal = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    setIsVideoPlaying(false);
  };

  return (
    <section id="projects" className="py-20 lg:py-28 bg-slate-950 text-slate-100 relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-cyan-400 tracking-wider uppercase">Portfolio</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white">Projects</h2>
            <div className="mt-4 w-20 h-1 bg-cyan-400 mx-auto rounded-full" />
          </div>

          {/* Category Filter Pills */}
          {categories.length > 1 && (
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {categories.map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    filter === cat 
                      ? 'bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20 font-semibold' 
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Projects Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project) => (
              <div 
                key={project.id} 
                onClick={() => handleOpenModal(project)}
                className="group bg-slate-900/80 backdrop-blur-md rounded-2xl overflow-hidden border border-slate-800 hover:border-cyan-500/40 shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
              >
                <div className="relative h-52 bg-slate-950 flex items-center justify-center overflow-hidden">
                  {project.images.length > 0 ? (
                    <img 
                      src={project.images[0]} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  ) : project.videoUrl ? (
                    <video 
                      src={project.videoUrl} 
                      muted 
                      playsInline 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                    />
                  ) : (
                    <FolderGit2 className="w-16 h-16 text-slate-700" />
                  )}

                  {/* Photo Counter Badge */}
                  {project.images.length > 1 && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 bg-slate-950/80 backdrop-blur-md text-cyan-300 border border-cyan-500/30 text-xs rounded-full font-medium z-10">
                      {project.images.length} photos
                    </div>
                  )}

                  {/* Video Badge */}
                  {project.videoUrl && (
                    <div className="absolute bottom-3 left-3 p-2 bg-slate-950/80 backdrop-blur-md text-cyan-400 border border-cyan-500/30 rounded-full z-10">
                      <Play className="w-4 h-4 fill-cyan-400" />
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-slate-950/60 group-hover:bg-slate-950/40 transition-colors flex items-center justify-center z-10 opacity-0 group-hover:opacity-100">
                    <span className="text-white font-semibold px-4 py-2 bg-slate-900/90 rounded-lg border border-cyan-500/30 text-sm">View Details</span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">{project.category}</span>
                    <h3 className="text-lg font-bold text-white mt-1 group-hover:text-cyan-300 transition-colors">{project.title}</h3>
                    <p className="text-sm text-slate-400 mt-1 line-clamp-2">{project.shortDescription}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-slate-800/80">
                    {project.tools.slice(0, 3).map((tool, i) => (
                      <span key={i} className="px-2 py-1 bg-slate-950 text-slate-300 text-xs rounded-md border border-slate-800">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Modal Component */}
      <Modal 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
        title={selectedProject?.title || ''} 
        size="lg"
      >
        {selectedProject && (
          <div className="space-y-6 text-slate-200">
            
            {/* Interactive Video Player */}
            {selectedProject.videoUrl && (
              <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800 max-h-80 group">
                {!isVideoPlaying ? (
                  <div 
                    className="relative w-full h-80 cursor-pointer flex items-center justify-center"
                    onClick={() => setIsVideoPlaying(true)}
                  >
                    {selectedProject.images.length > 0 ? (
                      <img 
                        src={selectedProject.images[0]} 
                        alt={selectedProject.title} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-900 flex items-center justify-center text-slate-400">
                        Click to Play Video
                      </div>
                    )}
                    <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 flex items-center justify-center transition-all">
                      <div className="w-16 h-16 rounded-full bg-cyan-400 group-hover:scale-110 flex items-center justify-center shadow-lg shadow-cyan-500/30 transition-transform">
                        <Play className="w-8 h-8 text-slate-950 fill-slate-950 ml-1" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <video
                    src={selectedProject.videoUrl}
                    controls
                    autoPlay
                    loop
                    playsInline
                    className="w-full max-h-80 object-contain mx-auto"
                  />
                )}
              </div>
            )}

            {/* Image Gallery */}
            {!selectedProject.videoUrl && selectedProject.images.length > 0 && (
              <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                <img 
                  src={selectedProject.images[currentImageIndex]} 
                  alt={selectedProject.title} 
                  className="w-full h-64 sm:h-80 object-cover" 
                />
                {selectedProject.images.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage} 
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-slate-950/80 hover:bg-slate-900 text-cyan-400 rounded-full border border-slate-800 shadow-lg transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={nextImage} 
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-slate-950/80 hover:bg-slate-900 text-cyan-400 rounded-full border border-slate-800 shadow-lg transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-slate-950/80 border border-cyan-500/30 text-cyan-300 text-xs rounded-full font-medium">
                      {currentImageIndex + 1} / {selectedProject.images.length}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Gallery Thumbnails */}
            {!selectedProject.videoUrl && selectedProject.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {selectedProject.images.map((img, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      currentImageIndex === idx ? 'border-cyan-400 shadow-md shadow-cyan-500/20' : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            <div>
              <h4 className="font-semibold text-white mb-2 text-base">Description</h4>
              <p className="text-slate-300 text-sm leading-relaxed">{selectedProject.detailedDescription || selectedProject.shortDescription}</p>
            </div>

            {selectedProject.role && (
              <div>
                <h4 className="font-semibold text-white mb-1 text-base">My Role</h4>
                <p className="text-sm text-cyan-400">{selectedProject.role}</p>
              </div>
            )}

            <div>
              <h4 className="font-semibold text-white mb-2 text-base flex items-center gap-2">
                <Wrench className="w-4 h-4 text-cyan-400" /> Technologies & Tools
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tools.map((t, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-950 text-slate-300 border border-slate-800 text-xs rounded-lg font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Links Section */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-800">
              {selectedProject.githubUrl && (
                <a 
                  href={selectedProject.githubUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 rounded-lg text-sm transition-colors"
                >
                  <Github className="w-4 h-4 text-cyan-400" /> GitHub
                </a>
              )}
              {selectedProject.liveUrl && (
                <a 
                  href={selectedProject.liveUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-lg text-sm font-semibold transition-colors"
                >
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
              )}
              {selectedProject.documentation && (
                <a 
                  href={selectedProject.documentation} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-950 hover:bg-slate-800 text-cyan-300 border border-slate-800 rounded-lg text-sm transition-colors"
                >
                  <FileText className="w-4 h-4 text-cyan-400" /> Documentation
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};