import React, { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';

interface NavbarProps {
  onAdminToggle?: () => void;
  onDownloadCV: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onAdminToggle, onDownloadCV }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Education', href: '#education', id: 'education' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Certificates', href: '#certificates', id: 'certificates' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const scrollPosition = window.scrollY + 120;

      navLinks.forEach((link) => {
        const section = document.querySelector(link.href);
        if (section instanceof HTMLElement) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(link.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const handleCVClick = () => {
    setIsMobileMenuOpen(false);
    onDownloadCV();
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-2xl py-3' 
          : 'bg-slate-950/40 backdrop-blur-sm py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo - SK Only */}
          <button 
            onClick={() => scrollTo('#home')} 
            className="text-xl font-extrabold text-cyan-400 tracking-wider hover:text-cyan-300 transition-colors flex items-center outline-none focus:outline-none"
          >
            SK
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button 
                  key={link.href} 
                  onClick={() => scrollTo(link.href)}
                  className={`px-3.5 py-2 text-sm font-medium transition-all duration-200 outline-none focus:outline-none ${
                    isActive 
                      ? 'text-cyan-400 font-semibold' 
                      : 'text-slate-300 hover:text-cyan-400'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
            
            {/* Download CV Button */}
            <button 
              onClick={handleCVClick}
              className="ml-3 px-4 py-2 text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-500 rounded-lg transition-all duration-200 shadow-md shadow-cyan-500/20 flex items-center gap-1.5 outline-none focus:outline-none"
            >
              <Download className="w-4 h-4 text-slate-950" />
              <span>CV</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800 rounded-lg transition-colors outline-none focus:outline-none" 
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-cyan-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-6 pt-4 px-4 bg-slate-900/95 backdrop-blur-2xl shadow-2xl rounded-2xl border border-slate-800 animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button 
                    key={link.href} 
                    onClick={() => scrollTo(link.href)}
                    className={`px-4 py-3 text-left font-medium rounded-xl transition-all duration-200 outline-none focus:outline-none ${
                      isActive 
                        ? 'text-cyan-400 font-semibold bg-slate-950/40' 
                        : 'text-slate-200 hover:text-cyan-400 hover:bg-slate-950/30'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
              
              <button 
                onClick={handleCVClick} 
                className="mt-3 px-4 py-3 text-center font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-500 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/10 outline-none focus:outline-none"
              >
                <Download className="w-4 h-4" />
                <span>Download CV</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};