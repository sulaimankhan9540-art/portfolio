import React from 'react';
import { Wrench } from 'lucide-react';
import { Skill } from '../types';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface SkillsProps {
  skills: Skill[];
}

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const { ref, isVisible } = useScrollAnimation();
  if (skills.length === 0) return null;

  const grouped = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <section id="skills" className="py-20 lg:py-28 bg-slate-950 text-slate-100 relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-cyan-400 tracking-wider uppercase">Expertise</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white">Skills</h2>
            <div className="mt-4 w-20 h-1 bg-cyan-400 mx-auto rounded-full" />
          </div>

          {/* Skill Category Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(grouped).map(([category, items]) => (
              <div 
                key={category} 
                className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-6 border border-slate-800 hover:border-cyan-500/30 shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-cyan-400 group-hover:border-cyan-500/40 transition-colors">
                      <Wrench className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">{category}</h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <span 
                        key={skill.id}
                        className="px-3 py-1.5 bg-slate-950 text-slate-300 text-sm font-medium rounded-lg border border-slate-800 hover:border-cyan-500/40 hover:text-cyan-300 transition-all duration-200"
                      >
                        {skill.name}
                      </span>
                    ))}
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