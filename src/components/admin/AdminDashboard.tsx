import React, { useState } from 'react';
import { X, User, GraduationCap, Briefcase, Award, FolderGit2, Wrench, Save, Trash2, Plus, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';
import { PortfolioData, Profile } from '../../types';
import { FileUploader, MultiImageUploader } from './FileUploader';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
  onSave: (data: PortfolioData) => void;
}

type TabType = 'profile' | 'education' | 'experience' | 'certificates' | 'projects' | 'skills';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose, data, onSave }) => {
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [localData, setLocalData] = useState<PortfolioData>(JSON.parse(JSON.stringify(data)));
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<{section: keyof Omit<PortfolioData, 'profile'>; id: string; name: string} | null>(null);
  const [savedMsg, setSavedMsg] = useState('');

  if (!isOpen) return null;

  const updateProfile = (field: keyof Profile, value: string | string[]) => {
    setLocalData(prev => ({ ...prev, profile: { ...prev.profile, [field]: value } }));
  };

  const addItem = <K extends keyof Omit<PortfolioData, 'profile'>>(
    section: K,
    item: PortfolioData[K] extends (infer U)[] ? U : never
  ) => {
    setLocalData(prev => ({
      ...prev,
      [section]: [...(prev[section] as unknown[]), item] as PortfolioData[K]
    }));
    if (typeof item === 'object' && item !== null && 'id' in item) {
      setExpandedId((item as { id: string }).id);
    }
  };

  const updateItem = <
    K extends keyof Omit<PortfolioData, 'profile'>,
    U extends PortfolioData[K] extends (infer T)[] ? T : never
  >(
    section: K,
    id: string,
    updates: Partial<U>
  ) => {
    setLocalData(prev => {
      const list = prev[section];
      if (!Array.isArray(list)) return prev;

      return {
        ...prev,
        [section]: list.map((item: any) =>
          item.id === id ? { ...item, ...updates } : item
        ) as PortfolioData[K]
      };
    });
  };

  const executeDelete = () => {
    if (showDeleteConfirm) {
      setLocalData(prev => {
        const list = prev[showDeleteConfirm.section];
        if (!Array.isArray(list)) return prev;

        return {
          ...prev,
          [showDeleteConfirm.section]: list.filter((item: any) => item.id !== showDeleteConfirm.id) as PortfolioData[typeof showDeleteConfirm.section]
        };
      });
      setShowDeleteConfirm(null);
    }
  };

  const handleSave = () => {
    onSave(localData);
    setSavedMsg('Changes saved successfully!');
    setTimeout(() => setSavedMsg(''), 2000);
  };

  const tabs: { id: TabType; label: string; icon: React.ElementType; count: number }[] = [
    { id: 'profile', label: 'Profile', icon: User, count: 0 },
    { id: 'education', label: 'Education', icon: GraduationCap, count: localData.education.length },
    { id: 'experience', label: 'Experience', icon: Briefcase, count: localData.experience.length },
    { id: 'certificates', label: 'Certificates', icon: Award, count: localData.certificates.length },
    { id: 'projects', label: 'Projects', icon: FolderGit2, count: localData.projects.length },
    { id: 'skills', label: 'Skills', icon: Wrench, count: localData.skills.length },
  ];

  const inputClass = "w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-primary-400 outline-none text-sm transition-all bg-white";
  const labelClass = "block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5";

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
      <div className="bg-gray-50 w-full max-w-3xl h-full overflow-y-auto shadow-2xl flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-xl font-bold text-primary-900">Edit Portfolio</h2>
            <p className="text-xs text-gray-500 mt-0.5">Click items to expand and edit</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 overflow-x-auto bg-white">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${
                activeTab === tab.id ? 'border-primary-600 text-primary-700 bg-primary-50/50' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}>
              <tab.icon className="w-4 h-4" /> 
              {tab.label}
              {tab.count > 0 && <span className="ml-1 px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">{tab.count}</span>}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-5 flex-1 space-y-5">
          {savedMsg && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              {savedMsg}
            </div>
          )}

          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="space-y-5">
              <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm space-y-4">
                <h3 className="font-bold text-primary-900 flex items-center gap-2"><User className="w-5 h-5 text-primary-600" /> Personal Information</h3>
                <FileUploader value={localData.profile.photo} onChange={v => updateProfile('photo', v)} label="Profile Photo" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2"><label className={labelClass}>Full Name</label><input value={localData.profile.name} onChange={e => updateProfile('name', e.target.value)} className={inputClass} placeholder="e.g., Sulaiman Khan" /></div>
                  <div className="sm:col-span-2"><label className={labelClass}>Professional Title</label><input value={localData.profile.title} onChange={e => updateProfile('title', e.target.value)} className={inputClass} placeholder="e.g., Mechanical Engineering Student" /></div>
                  <div className="sm:col-span-2"><label className={labelClass}>Tagline</label><input value={localData.profile.tagline} onChange={e => updateProfile('tagline', e.target.value)} className={inputClass} placeholder="Short professional tagline" /></div>
                  <div className="sm:col-span-2"><label className={labelClass}>About Me</label><textarea value={localData.profile.about} onChange={e => updateProfile('about', e.target.value)} rows={3} className={inputClass} placeholder="Write about yourself..." /></div>
                  <div className="sm:col-span-2"><label className={labelClass}>Career Objective</label><textarea value={localData.profile.careerObjective} onChange={e => updateProfile('careerObjective', e.target.value)} rows={2} className={inputClass} /></div>
                  <div className="sm:col-span-2"><label className={labelClass}>Professional Summary</label><textarea value={localData.profile.summary} onChange={e => updateProfile('summary', e.target.value)} rows={2} className={inputClass} /></div>
                  <div><label className={labelClass}>Location</label><input value={localData.profile.location} onChange={e => updateProfile('location', e.target.value)} className={inputClass} placeholder="City, Country" /></div>
                  <div><label className={labelClass}>Email</label><input value={localData.profile.email} onChange={e => updateProfile('email', e.target.value)} className={inputClass} placeholder="your@email.com" /></div>
                  <div><label className={labelClass}>Phone</label><input value={localData.profile.phone} onChange={e => updateProfile('phone', e.target.value)} className={inputClass} placeholder="+1234567890" /></div>
                  <div><label className={labelClass}>WhatsApp</label><input value={localData.profile.whatsapp} onChange={e => updateProfile('whatsapp', e.target.value)} className={inputClass} placeholder="+1234567890" /></div>
                  <div><label className={labelClass}>LinkedIn URL</label><input value={localData.profile.linkedin} onChange={e => updateProfile('linkedin', e.target.value)} className={inputClass} placeholder="https://linkedin.com/in/..." /></div>
                  <div><label className={labelClass}>GitHub URL</label><input value={localData.profile.github} onChange={e => updateProfile('github', e.target.value)} className={inputClass} placeholder="https://github.com/..." /></div>
                  <div className="sm:col-span-2"><label className={labelClass}>Areas of Interest (comma separated)</label><input value={localData.profile.interests.join(', ')} onChange={e => updateProfile('interests', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} className={inputClass} placeholder="Mechanical Design, CAD, Robotics..." /></div>
                </div>
              </div>
            </div>
          )}

          {/* EDUCATION TAB */}
          {activeTab === 'education' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-primary-900 flex items-center gap-2"><GraduationCap className="w-5 h-5 text-primary-600" /> Education Records</h3>
                <span className="text-xs text-gray-500">{localData.education.length} record(s)</span>
              </div>
              {localData.education.map(edu => {
                const isOpen = expandedId === edu.id;
                return (
                  <div key={edu.id} className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                    <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => setExpandedId(isOpen ? null : edu.id)}>
                      <div className="min-w-0">
                        <p className="font-semibold text-primary-900 truncate">{edu.degree || '(Untitled)'}</p>
                        <p className="text-xs text-gray-500 truncate">{edu.institution} | {edu.startYear}-{edu.endYear}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 ml-3">
                        <button onClick={(e) => { e.stopPropagation(); setShowDeleteConfirm({ section: 'education', id: edu.id, name: edu.degree }); }} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                      </div>
                    </div>
                    {isOpen && (
                      <div className="p-4 pt-0 border-t border-gray-100 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="sm:col-span-2"><label className={labelClass}>Degree / Qualification</label><input value={edu.degree} onChange={e => updateItem('education', edu.id, { degree: e.target.value })} className={inputClass} placeholder="e.g., BSc Mechanical Engineering" /></div>
                          <div className="sm:col-span-2"><label className={labelClass}>Field / Major</label><input value={edu.field} onChange={e => updateItem('education', edu.id, { field: e.target.value })} className={inputClass} placeholder="e.g., Mechanical Engineering" /></div>
                          <div className="sm:col-span-2"><label className={labelClass}>Institution</label><input value={edu.institution} onChange={e => updateItem('education', edu.id, { institution: e.target.value })} className={inputClass} placeholder="University name" /></div>
                          <div><label className={labelClass}>Start Year</label><input value={edu.startYear} onChange={e => updateItem('education', edu.id, { startYear: e.target.value })} className={inputClass} placeholder="2022" /></div>
                          <div><label className={labelClass}>End Year</label><input value={edu.endYear} onChange={e => updateItem('education', edu.id, { endYear: e.target.value })} className={inputClass} placeholder="2026" /></div>
                          <div className="sm:col-span-2"><label className={labelClass}>Grade / CGPA</label><input value={edu.grade} onChange={e => updateItem('education', edu.id, { grade: e.target.value })} className={inputClass} placeholder="e.g., CGPA: 3.3/4.0" /></div>
                          <div className="sm:col-span-2"><label className={labelClass}>Description</label><textarea value={edu.description} onChange={e => updateItem('education', edu.id, { description: e.target.value })} className={inputClass} rows={2} /></div>
                        </div>
                        <FileUploader value={edu.certificate} onChange={v => updateItem('education', edu.id, { certificate: v })} label="Certificate (optional)" />
                      </div>
                    )}
                  </div>
                );
              })}
              <button onClick={() => addItem('education', { id: 'edu-' + Date.now(), degree: '', field: '', institution: '', startYear: '', endYear: '', grade: '', description: '', logo: '', certificate: '' })}
                className="w-full py-3 border-2 border-dashed border-primary-300 rounded-xl text-primary-600 hover:border-primary-500 hover:bg-primary-50 font-medium transition-all flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" /> Add Education
              </button>
            </div>
          )}

          {/* EXPERIENCE TAB */}
          {activeTab === 'experience' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-primary-900 flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary-600" /> Work Experience</h3>
                <span className="text-xs text-gray-500">{localData.experience.length} record(s)</span>
              </div>
              {localData.experience.map(exp => {
                const isOpen = expandedId === exp.id;
                return (
                  <div key={exp.id} className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                    <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => setExpandedId(isOpen ? null : exp.id)}>
                      <div className="min-w-0">
                        <p className="font-semibold text-primary-900 truncate">{exp.title || '(Untitled)'}</p>
                        <p className="text-xs text-gray-500 truncate">{exp.company} | {exp.startDate}-{exp.current ? 'Present' : exp.endDate}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 ml-3">
                        <button onClick={(e) => { e.stopPropagation(); setShowDeleteConfirm({ section: 'experience', id: exp.id, name: exp.title }); }} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                      </div>
                    </div>
                    {isOpen && (
                      <div className="p-4 pt-0 border-t border-gray-100 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="sm:col-span-2"><label className={labelClass}>Job Title</label><input value={exp.title} onChange={e => updateItem('experience', exp.id, { title: e.target.value })} className={inputClass} placeholder="e.g., Mechanical Engineering Intern" /></div>
                          <div className="sm:col-span-2"><label className={labelClass}>Company / Organization</label><input value={exp.company} onChange={e => updateItem('experience', exp.id, { company: e.target.value })} className={inputClass} placeholder="Company name" /></div>
                          <div><label className={labelClass}>Employment Type</label><input value={exp.employmentType} onChange={e => updateItem('experience', exp.id, { employmentType: e.target.value })} className={inputClass} placeholder="e.g., Internship, Full-time" /></div>
                          <div><label className={labelClass}>Location</label><input value={exp.location} onChange={e => updateItem('experience', exp.id, { location: e.target.value })} className={inputClass} placeholder="City, Country" /></div>
                          <div><label className={labelClass}>Start Date</label><input value={exp.startDate} onChange={e => updateItem('experience', exp.id, { startDate: e.target.value })} className={inputClass} placeholder="YYYY-MM" /></div>
                          <div><label className={labelClass}>End Date</label><input value={exp.endDate} onChange={e => updateItem('experience', exp.id, { endDate: e.target.value })} className={inputClass} placeholder="YYYY-MM or leave blank" /></div>
                          <label className="flex items-center gap-2 sm:col-span-2 bg-primary-50 p-3 rounded-lg">
                            <input type="checkbox" checked={exp.current} onChange={e => updateItem('experience', exp.id, { current: e.target.checked })} className="w-4 h-4 text-primary-600 rounded" />
                            <span className="text-sm text-gray-700 font-medium">I currently work here</span>
                          </label>
                          <div className="sm:col-span-2"><label className={labelClass}>Description</label><textarea value={exp.description} onChange={e => updateItem('experience', exp.id, { description: e.target.value })} className={inputClass} rows={2} placeholder="Describe your role..." /></div>
                          <div className="sm:col-span-2"><label className={labelClass}>Responsibilities (comma separated)</label><input value={exp.responsibilities.join(', ')} onChange={e => updateItem('experience', exp.id, { responsibilities: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} className={inputClass} placeholder="Designed CAD models, Conducted analysis, ..." /></div>
                          <div className="sm:col-span-2"><label className={labelClass}>Skills Used (comma separated)</label><input value={exp.skills.join(', ')} onChange={e => updateItem('experience', exp.id, { skills: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} className={inputClass} placeholder="SolidWorks, AutoCAD, etc." /></div>
                        </div>
                        <MultiImageUploader images={exp.images || []} onChange={imgs => updateItem('experience', exp.id, { images: imgs })} label="Experience Images" />
                        <FileUploader value={exp.certificate} onChange={v => updateItem('experience', exp.id, { certificate: v })} label="Experience Certificate (optional)" />
                      </div>
                    )}
                  </div>
                );
              })}
              <button onClick={() => addItem('experience', { id: 'exp-' + Date.now(), title: '', company: '', employmentType: '', location: '', startDate: '', endDate: '', current: false, description: '', responsibilities: [], skills: [], images: [], certificate: '' })}
                className="w-full py-3 border-2 border-dashed border-primary-300 rounded-xl text-primary-600 hover:border-primary-500 hover:bg-primary-50 font-medium transition-all flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" /> Add Experience
              </button>
            </div>
          )}

          {/* CERTIFICATES TAB */}
          {activeTab === 'certificates' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-primary-900 flex items-center gap-2"><Award className="w-5 h-5 text-primary-600" /> Certificates</h3>
                <span className="text-xs text-gray-500">{localData.certificates.length} record(s)</span>
              </div>
              {localData.certificates.map(cert => {
                const isOpen = expandedId === cert.id;
                return (
                  <div key={cert.id} className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                    <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => setExpandedId(isOpen ? null : cert.id)}>
                      <div className="min-w-0">
                        <p className="font-semibold text-primary-900 truncate">{cert.title || '(Untitled)'}</p>
                        <p className="text-xs text-gray-500 truncate">{cert.organization} | {cert.date}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 ml-3">
                        <button onClick={(e) => { e.stopPropagation(); setShowDeleteConfirm({ section: 'certificates', id: cert.id, name: cert.title }); }} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                      </div>
                    </div>
                    {isOpen && (
                      <div className="p-4 pt-0 border-t border-gray-100 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="sm:col-span-2"><label className={labelClass}>Certificate Name</label><input value={cert.title} onChange={e => updateItem('certificates', cert.id, { title: e.target.value })} className={inputClass} placeholder="e.g., AutoCAD Professional" /></div>
                          <div className="sm:col-span-2"><label className={labelClass}>Issuing Organization</label><input value={cert.organization} onChange={e => updateItem('certificates', cert.id, { organization: e.target.value })} className={inputClass} placeholder="e.g., Autodesk" /></div>
                          <div><label className={labelClass}>Issue Date</label><input value={cert.date} onChange={e => updateItem('certificates', cert.id, { date: e.target.value })} className={inputClass} placeholder="YYYY-MM" /></div>
                          <div><label className={labelClass}>Category</label><input value={cert.category} onChange={e => updateItem('certificates', cert.id, { category: e.target.value })} className={inputClass} placeholder="e.g., Technical, Academic" /></div>
                          <div><label className={labelClass}>Credential ID (optional)</label><input value={cert.credentialId} onChange={e => updateItem('certificates', cert.id, { credentialId: e.target.value })} className={inputClass} /></div>
                          <div><label className={labelClass}>Certificate URL (optional)</label><input value={cert.url} onChange={e => updateItem('certificates', cert.id, { url: e.target.value })} className={inputClass} placeholder="https://..." /></div>
                          <div className="sm:col-span-2"><label className={labelClass}>Description (optional)</label><textarea value={cert.description} onChange={e => updateItem('certificates', cert.id, { description: e.target.value })} className={inputClass} rows={2} /></div>
                        </div>
                        <FileUploader value={cert.file} onChange={v => updateItem('certificates', cert.id, { file: v })} label="Certificate File (JPG, PNG, PDF)" />
                      </div>
                    )}
                  </div>
                );
              })}
              <button onClick={() => addItem('certificates', { id: 'cert-' + Date.now(), title: '', organization: '', date: '', category: '', credentialId: '', description: '', file: '', url: '' })}
                className="w-full py-3 border-2 border-dashed border-primary-300 rounded-xl text-primary-600 hover:border-primary-500 hover:bg-primary-50 font-medium transition-all flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" /> Add Certificate
              </button>
            </div>
          )}

          {/* PROJECTS TAB */}
          {activeTab === 'projects' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-primary-900 flex items-center gap-2"><FolderGit2 className="w-5 h-5 text-primary-600" /> Projects</h3>
                <span className="text-xs text-gray-500">{localData.projects.length} record(s)</span>
              </div>
              {localData.projects.map(proj => {
                const isOpen = expandedId === proj.id;
                return (
                  <div key={proj.id} className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                    <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => setExpandedId(isOpen ? null : proj.id)}>
                      <div className="min-w-0">
                        <p className="font-semibold text-primary-900 truncate">{proj.title || '(Untitled)'}</p>
                        <p className="text-xs text-gray-500 truncate">{proj.category} | {proj.date}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 ml-3">
                        <button onClick={(e) => { e.stopPropagation(); setShowDeleteConfirm({ section: 'projects', id: proj.id, name: proj.title }); }} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                      </div>
                    </div>
                    {isOpen && (
                      <div className="p-4 pt-0 border-t border-gray-100 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="sm:col-span-2"><label className={labelClass}>Project Name</label><input value={proj.title} onChange={e => updateItem('projects', proj.id, { title: e.target.value })} className={inputClass} placeholder="e.g., Automated Conveyor System" /></div>
                          <div><label className={labelClass}>Category</label><input value={proj.category} onChange={e => updateItem('projects', proj.id, { category: e.target.value })} className={inputClass} placeholder="e.g., Mechanical, CAD" /></div>
                          <div><label className={labelClass}>Date / Year</label><input value={proj.date} onChange={e => updateItem('projects', proj.id, { date: e.target.value })} className={inputClass} placeholder="2024" /></div>
                          <div className="sm:col-span-2"><label className={labelClass}>Short Description</label><input value={proj.shortDescription} onChange={e => updateItem('projects', proj.id, { shortDescription: e.target.value })} className={inputClass} placeholder="One-line summary" /></div>
                          <div className="sm:col-span-2"><label className={labelClass}>Detailed Description</label><textarea value={proj.detailedDescription} onChange={e => updateItem('projects', proj.id, { detailedDescription: e.target.value })} className={inputClass} rows={3} placeholder="Full project description..." /></div>
                          <div className="sm:col-span-2"><label className={labelClass}>Technologies / Tools (comma separated)</label><input value={proj.tools.join(', ')} onChange={e => updateItem('projects', proj.id, { tools: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} className={inputClass} placeholder="SolidWorks, Arduino, etc." /></div>
                          <div><label className={labelClass}>My Role</label><input value={proj.role} onChange={e => updateItem('projects', proj.id, { role: e.target.value })} className={inputClass} placeholder="e.g., Lead Designer" /></div>
                          <div><label className={labelClass}>GitHub URL</label><input value={proj.githubUrl} onChange={e => updateItem('projects', proj.id, { githubUrl: e.target.value })} className={inputClass} placeholder="https://github.com/..." /></div>
                          <div><label className={labelClass}>Live URL</label><input value={proj.liveUrl} onChange={e => updateItem('projects', proj.id, { liveUrl: e.target.value })} className={inputClass} placeholder="https://..." /></div>
                        </div>
                        <MultiImageUploader images={proj.images} onChange={imgs => updateItem('projects', proj.id, { images: imgs })} label="Project Images" />
                        <FileUploader value={proj.documentation} onChange={v => updateItem('projects', proj.id, { documentation: v })} label="Documentation PDF (optional)" />
                      </div>
                    )}
                  </div>
                );
              })}
              <button onClick={() => addItem('projects', { id: 'proj-' + Date.now(), title: '', category: '', date: '', shortDescription: '', detailedDescription: '', tools: [], role: '', images: [], videoUrl: '', githubUrl: '', liveUrl: '', documentation: '' })}
                className="w-full py-3 border-2 border-dashed border-primary-300 rounded-xl text-primary-600 hover:border-primary-500 hover:bg-primary-50 font-medium transition-all flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" /> Add Project
              </button>
            </div>
          )}

          {/* SKILLS TAB */}
          {activeTab === 'skills' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-primary-900 flex items-center gap-2"><Wrench className="w-5 h-5 text-primary-600" /> Skills</h3>
                <span className="text-xs text-gray-500">{localData.skills.length} skill(s)</span>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="grid grid-cols-12 gap-3 px-4 py-3 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b">
                  <div className="col-span-5">Skill Name</div>
                  <div className="col-span-5">Category</div>
                  <div className="col-span-2 text-right">Action</div>
                </div>
                {localData.skills.map(skill => (
                  <div key={skill.id} className="grid grid-cols-12 gap-3 px-4 py-3 border-b border-gray-100 items-center hover:bg-gray-50 transition-colors">
                    <div className="col-span-5"><input value={skill.name} onChange={e => updateItem('skills', skill.id, { name: e.target.value })} className={`${inputClass} !py-1.5`} placeholder="e.g., SolidWorks" /></div>
                    <div className="col-span-5"><input value={skill.category} onChange={e => updateItem('skills', skill.id, { category: e.target.value })} className={`${inputClass} !py-1.5`} placeholder="e.g., Engineering Software" /></div>
                    <div className="col-span-2 text-right">
                      <button onClick={() => setShowDeleteConfirm({ section: 'skills', id: skill.id, name: skill.name })} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => addItem('skills', { id: 'skill-' + Date.now(), name: '', category: 'General' })}
                className="w-full py-3 border-2 border-dashed border-primary-300 rounded-xl text-primary-600 hover:border-primary-500 hover:bg-primary-50 font-medium transition-all flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" /> Add Skill
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex items-center justify-between z-10">
          <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button onClick={handleSave} className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-md">
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-60 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-600">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold">Confirm Deletion</h3>
            </div>
            <p className="text-sm text-gray-600">
              Are you sure you want to delete <span className="font-semibold text-gray-900">"{showDeleteConfirm.name || 'this item'}"</span>? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button onClick={() => setShowDeleteConfirm(null)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button onClick={executeDelete} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};