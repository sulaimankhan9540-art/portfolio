import React, { useState, useCallback } from 'react';
import { PortfolioData } from './types';
import { loadData, saveData } from './data/storage';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Education } from './components/Education';
import { Experience } from './components/Experience';
import { Certificates } from './components/Certificates';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CertificateViewer } from './components/CertificateViewer';
import { CVGenerator } from './components/CVGenerator';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Modal } from './components/ui/Modal';

function App() {
  const [data, setData] = useState<PortfolioData>(loadData());
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isCVOpen, setIsCVOpen] = useState(false);
  const [certViewer, setCertViewer] = useState<{ file: string; title: string; open: boolean }>({ file: '', title: '', open: false });

  const handleSave = useCallback((newData: PortfolioData) => {
    setData(newData);
    saveData(newData);
  }, []);

  const handleViewCertificate = useCallback((file: string, title: string) => {
    if (!file) return;
    setCertViewer({ file, title, open: true });
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Navbar 
        onAdminToggle={() => setIsAdminOpen(true)} 
        onDownloadCV={() => setIsCVOpen(true)} 
      />
      <Hero profile={data.profile} onDownloadCV={() => setIsCVOpen(true)} />
      <About profile={data.profile} />
      <Education education={data.education} onViewCertificate={handleViewCertificate} />
      <Experience experience={data.experience} onViewCertificate={handleViewCertificate} />
      <Projects projects={data.projects} />
      <Certificates certificates={data.certificates} onViewCertificate={handleViewCertificate} />
      <Skills skills={data.skills} />
      <Contact profile={data.profile} />
      <Footer profile={data.profile} />

      <AdminDashboard isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} data={data} onSave={handleSave} />

      <Modal isOpen={isCVOpen} onClose={() => setIsCVOpen(false)} title="CV / Resume" size="xl">
        <CVGenerator data={data} />
      </Modal>

      <CertificateViewer 
        file={certViewer.file} 
        title={certViewer.title} 
        isOpen={certViewer.open} 
        onClose={() => setCertViewer(prev => ({ ...prev, open: false }))} 
      />
    </div>
  );
}

export default App;