import React, { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';

interface NavbarProps {
  onAdminToggle?: () => void;
  onDownloadCV: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onAdminToggle, onDownloadCV }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Education', href: '#education' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Certificates', href: '#certificates' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const handleCVClick = () => {
    setIsMobileMenuOpen(false);
    onDownloadCV();
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/90 backdrop-blur-md shadow-xl border-b border-slate-800/80 py-3' : 'bg-slate-950/60 backdrop-blur-sm py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <button onClick={() => scrollTo('#home')} className="text-xl font-bold text-white tracking-tight hover:text-cyan-400 transition-colors">
            Portfolio
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <button 
                key={link.href} 
                onClick={() => scrollTo(link.href)}
                className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800/60 rounded-lg transition-colors"
              >
                {link.label}
              </button>
            ))}
            
            {/* Download CV Button */}
            <button 
              onClick={handleCVClick}
              className="ml-3 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-lg transition-all shadow-md shadow-cyan-500/20 flex items-center gap-1.5 border border-cyan-300/30"
            >
              <Download className="w-4 h-4 text-cyan-100" />
              CV
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors" 
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-6 pt-4 px-4 bg-slate-900/95 backdrop-blur-xl shadow-2xl rounded-2xl border border-slate-800">
            <div className="flex flex-col gap-1">
              {navLinks.map(link => (
                <button 
                  key={link.href} 
                  onClick={() => scrollTo(link.href)}
                  className="px-4 py-3 text-left text-slate-200 hover:text-cyan-400 hover:bg-slate-800/70 rounded-lg transition-colors font-medium"
                >
                  {link.label}
                </button>
              ))}
              
              <button 
                onClick={handleCVClick} 
                className="mt-3 px-4 py-3 text-center font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md border border-cyan-300/30"
              >
                <Download className="w-4 h-4" />
                Download CV
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};