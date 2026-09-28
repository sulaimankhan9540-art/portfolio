import React from 'react';
import { Target, Lightbulb, Award } from 'lucide-react';
import { Profile } from '../types';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface AboutProps {
  profile: Profile;
}

export const About: React.FC<AboutProps> = ({ profile }) => {
  const { ref, isVisible } = useScrollAnimation();
  const initials = profile.name.split(' ').map(n => n[0]).join('').slice(0, 2);

  return (
    <section id="about" className="py-20 lg:py-28 bg-slate-950 text-slate-100 relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-cyan-400 tracking-wider uppercase">Get To Know Me</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white">About Me</h2>
            <div className="mt-4 w-20 h-1 bg-cyan-400 mx-auto rounded-full" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column: Photo Frame with Cyan/Blue Halo */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-3xl blur opacity-40 group-hover:opacity-75 transition duration-500" />
                <div className="relative w-72 h-80 sm:w-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-700/60 bg-slate-900 shadow-2xl">
                  {profile.photo ? (
                    <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-blue-950">
                      <span className="text-7xl font-bold text-cyan-300">{initials}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Information Cards */}
            <div className="space-y-6">
              
              {/* Career Objective */}
              <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-6 border border-slate-800 shadow-xl hover:border-cyan-500/30 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <Target className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-lg font-bold text-white">Career Objective</h3>
                </div>
                <p className="text-slate-300 leading-relaxed">{profile.careerObjective}</p>
              </div>

              {/* Professional Summary */}
              <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-6 border border-slate-800 shadow-xl hover:border-cyan-500/30 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <Lightbulb className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-lg font-bold text-white">Professional Summary</h3>
                </div>
                <p className="text-slate-300 leading-relaxed">{profile.summary}</p>
              </div>

              {/* Areas of Interest */}
              {profile.interests && profile.interests.length > 0 && (
                <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-6 border border-slate-800 shadow-xl hover:border-cyan-500/30 transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <Award className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-lg font-bold text-white">Areas of Interest</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profile.interests.map((interest, idx) => (
                      <span 
                        key={idx} 
                        className="px-3 py-1.5 bg-blue-950/80 border border-cyan-400/30 rounded-lg text-sm font-medium text-cyan-200 shadow-sm"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};