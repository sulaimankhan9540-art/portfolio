import React, { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';

interface NavbarProps {
  onAdminToggle?: () => void;
  onDownloadCV: () => void; // Add this prop
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
    onDownloadCV(); // Call the exact working function from parent/Hero
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <button onClick={() => scrollTo('#home')} className="text-xl font-bold text-primary-900 tracking-tight">
            Portfolio
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <button 
                key={link.href} 
                onClick={() => scrollTo(link.href)}
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
              >
                {link.label}
              </button>
            ))}
            
            {/* Download CV Button */}
            <button 
              onClick={handleCVClick}
              className="ml-3 px-4 py-2 text-sm font-semibold text-white bg-primary-800 hover:bg-primary-900 rounded-lg transition-colors shadow-md flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              CV
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" 
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-100 pt-4">
            <div className="flex flex-col gap-1">
              {navLinks.map(link => (
                <button 
                  key={link.href} 
                  onClick={() => scrollTo(link.href)}
                  className="px-4 py-3 text-left text-gray-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors font-medium"
                >
                  {link.label}
                </button>
              ))}
              
              <button 
                onClick={handleCVClick} 
                className="mt-2 px-4 py-3 text-center font-semibold text-white bg-primary-800 hover:bg-primary-900 rounded-lg transition-colors flex items-center justify-center gap-2"
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