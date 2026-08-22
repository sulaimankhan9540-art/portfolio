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
    <section id="about" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-primary-600 tracking-wider uppercase">Get To Know Me</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-primary-900">About Me</h2>
            <div className="mt-4 w-20 h-1 bg-accent-500 mx-auto rounded-full" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-primary-200 to-accent-200 rounded-2xl transform rotate-3 opacity-50" />
                <div className="relative w-72 h-80 sm:w-80 sm:h-96 rounded-2xl overflow-hidden shadow-xl bg-gray-100">
                  {profile.photo ? (
                    <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200">
                      <span className="text-7xl font-bold text-primary-300">{initials}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-primary-50 rounded-2xl p-6 border border-primary-100">
                <div className="flex items-center gap-3 mb-3">
                  <Target className="w-5 h-5 text-primary-700" />
                  <h3 className="text-lg font-bold text-primary-900">Career Objective</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{profile.careerObjective}</p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Lightbulb className="w-5 h-5 text-accent-600" />
                  <h3 className="text-lg font-bold text-primary-900">Professional Summary</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{profile.summary}</p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Award className="w-5 h-5 text-accent-600" />
                  <h3 className="text-lg font-bold text-primary-900">Areas of Interest</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-primary-300 hover:shadow-sm transition-all">{interest}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
