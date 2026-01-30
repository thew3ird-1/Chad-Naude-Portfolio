import React, { useState, useEffect } from 'react';
import { MenuIcon, XIcon, FileTextIcon } from './Icons';
import { USER_PROFILE, SOCIAL_LINKS } from '../constants';

interface NavbarProps {
  onOpenResume: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleResumeClick = () => {
    setIsMenuOpen(false);
    onOpenResume();
  };

  const linkedInUrl = SOCIAL_LINKS.find(link => link.platform === 'LinkedIn')?.url || '#';

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/80 backdrop-blur-md shadow-sm border-b border-slate-800 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <a 
          href="#home" 
          className="text-2xl font-bold text-slate-100 tracking-tight"
          onClick={(e) => handleNavClick(e, '#home')}
        >
          {USER_PROFILE.name.split(' ')[0]}<span className="text-indigo-500">.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-medium text-slate-300 hover:text-indigo-400 transition-colors cursor-pointer"
            >
              {link.name}
            </a>
          ))}

          {/* Resume Button Desktop */}
          <button
            onClick={handleResumeClick}
            className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors group"
          >
            <FileTextIcon className="w-4 h-4 text-indigo-500 group-hover:text-indigo-400" />
            Resume
          </button>

          <a 
            href={linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full text-sm font-medium hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg hover:shadow-indigo-500/25"
          >
            Let's Talk
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-slate-300 hover:text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-slate-800 shadow-xl py-4 px-4 flex flex-col gap-4">
          {navLinks.map(link => (
            <a 
              key={link.name}
              href={link.href}
              className="text-base font-medium text-slate-300 hover:text-indigo-400 py-2 cursor-pointer"
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={handleResumeClick}
            className="text-base font-medium text-slate-300 hover:text-indigo-400 py-2 flex items-center gap-2"
          >
            <FileTextIcon className="w-4 h-4" />
            View Resume
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;