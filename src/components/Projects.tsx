import React, { useState } from 'react';
import { ExternalLink, Github, Layers, Wrench, X, Play, Tag, ChevronRight } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: string;
  role: string;
  period: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  videoUrl?: string;
  technologies: string[];
  keyFeatures: string[];
  cadHighlights?: string[];
  githubUrl?: string;
  liveUrl?: string;
}

const projectsData: Project[] = [
  {
    id: 'agrivoltaic-stand',
    title: 'Agrivoltaic Solar Mounting Structure',
    category: 'CAD & Structural Design',
    role: 'Lead CAD & Structural Engineer',
    period: '2026',
    shortDescription: 'Parametric CAD design and aerodynamic simulation of an elevated solar panel mounting structure for dual-use agricultural lands.',
    fullDescription: 'Engineered a full parametric 3D CAD model in PTC Creo for an agrivoltaic panel mounting system. Optimized ground clearance for farm machinery while evaluating wind loading pressure distributions to prevent structural failure.',
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&q=80&w=1200',
    videoUrl: '/solar-demo.mp4',
    technologies: ['PTC Creo', 'ANSYS Workbench', 'SimScale', 'Structural Analysis'],
    keyFeatures: [
      'Elevated ground clearance for tractor navigation',
      'Structural integrity tested against high wind speeds',
      'Modular assembly for fast site deployment'
    ]
  },
  {
    id: 'auto-water-tap',
    title: 'Automatic Water Tap System',
    category: 'Mechatronics & Embedded Systems',
    role: 'Mechanical & Control Systems Designer',
    period: '2026',
    shortDescription: 'Developed an automated water tap system for the Mechatronics Lab at UET Peshawar using Arduino and IR proximity sensor.',
    fullDescription: 'Developed an automated water tap system for the Mechatronics Lab at UET Peshawar using an Arduino Uno, IR proximity sensor, and SG90 servo motor. The system detects hand presence within 2–8 cm to automatically actuate the water valve in under 0.5 seconds, eliminating manual contact and curbing unnecessary water flow. Includes circuit design, embedded C++ control logic, and a physical prototype assembly built for under PKR 4,000.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1200',
    technologies: ['Arduino', 'Embedded C++', 'IR Proximity Sensor', 'SG90 Servo Motor', 'SolidWorks'],
    keyFeatures: [
      'Hands-free infrared sensor trigger',
      'Fast valve actuation in under 0.5s',
      'Low-cost prototype built under PKR 4,000'
    ]
  }
];

export const Projects: React.FC = () => {
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
          {projectsData.map((project) => (
            <div 
              key={project.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1 shadow-xl flex flex-col"
            >
              <div className="relative h-48 overflow-hidden bg-slate-950">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
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
                    {project.technologies.slice(0, 3).map((tech, idx) => (
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
          ))}
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
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title} 
                className="w-full h-full object-cover"
              />
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
                <p className="text-cyan-300 font-medium text-sm mt-1">
                  Role: {selectedProject.role}
                </p>
              </div>

              {/* Clear Dark Body Text */}
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <p className="text-slate-200 text-base leading-relaxed">
                  {selectedProject.fullDescription}
                </p>
              </div>

              {/* Key Features */}
              {selectedProject.keyFeatures.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold uppercase text-slate-300 tracking-wider mb-3">
                    Key Deliverables & Highlights
                  </h4>
                  <ul className="space-y-2">
                    {selectedProject.keyFeatures.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-200 text-sm">
                        <span className="text-cyan-400 font-bold">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technologies */}
              <div>
                <h4 className="text-sm font-bold uppercase text-slate-300 tracking-wider mb-3">
                  Technologies & Tools
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech, idx) => (
                    <span 
                      key={idx} 
                      className="px-3 py-1 bg-slate-800 text-cyan-300 font-medium text-xs rounded-lg border border-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
};