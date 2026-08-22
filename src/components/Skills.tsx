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
    <section id="skills" className="py-20 lg:py-28 bg-primary-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-primary-600 tracking-wider uppercase">Expertise</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-primary-900">Skills</h2>
            <div className="mt-4 w-20 h-1 bg-accent-500 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(grouped).map(([category, items]) => (
              <div key={category} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <Wrench className="w-5 h-5 text-primary-700" />
                  </div>
                  <h3 className="text-lg font-bold text-primary-900">{category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map(skill => (
                    <span key={skill.id}
                      className="px-3 py-1.5 bg-primary-50 text-primary-700 text-sm font-medium rounded-lg border border-primary-100 hover:bg-primary-100 transition-colors">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
