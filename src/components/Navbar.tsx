import { Target } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const Logo = ({ className = '' }: { className?: string }) => (
  <div className={`flex items-center space-x-2 ${className}`}>
    <span className="text-brand text-xl sm:text-2xl font-extrabold">❁</span>
    <span className="text-white text-xl sm:text-2xl font-bold tracking-tight">SOLARA</span>
  </div>
);

const DesktopNavLink = ({ href, children, isConnect = false }: { href: string; children: React.ReactNode; isConnect?: boolean }) => {
  if (isConnect) {
    return (
      <a
        href={href}
        className="btn-glass text-[13px] px-6 py-2"
      >
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      className={`group relative h-[48px] min-w-[86px] px-[18px] rounded-lg inline-flex items-center justify-center overflow-hidden text-[16px] leading-[26px] tracking-[0.02em] text-white transition-all duration-[280ms] bg-transparent border border-transparent hover:border-white/40 hover:bg-white/5 hover:-translate-y-[1px]`}
    >
      <span className="relative h-[26px] overflow-hidden block">
        <span className="block transition-transform duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
          {children}
        </span>
        <span className="absolute left-0 top-full block transition-transform duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
          {children}
        </span>
      </span>
    </a>
  );
};

export function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    if (isNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isNavOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 900) {
        setIsNavOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsNavOpen(false);
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const closeMenu = () => setIsNavOpen(false);
  const toggleMenu = () => setIsNavOpen(!isNavOpen);

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-gradient-to-b from-black/60 to-black/0 backdrop-blur-md border-b border-white/10 text-white h-[86px] min-[900px]:h-[104px]">
      {/* Desktop Navbar */}
      <div className="hidden min-[900px]:flex w-full h-full px-[40px] items-center justify-between">
        <a href="/" className="inline-flex items-center w-auto h-[36px] text-white transition-all duration-300 hover:opacity-[0.72] hover:-translate-y-[1px]" aria-label="Solara logo">
          <Logo className="w-full h-auto block" />
        </a>

        <nav className="flex items-center gap-[22px]" aria-label="Main navigation">
          <div className="flex items-center gap-[8px]">
            <DesktopNavLink href="#about">About</DesktopNavLink>
            <DesktopNavLink href="#services">Services</DesktopNavLink>
            <DesktopNavLink href="#pricing">Pricing</DesktopNavLink>
            <DesktopNavLink href="#faq">FAQ</DesktopNavLink>
            <DesktopNavLink href="#contact">Contact</DesktopNavLink>
          </div>
          <DesktopNavLink href="#contact" isConnect>Get in Touch</DesktopNavLink>
        </nav>
      </div>

      {/* Mobile Header */}
      <div className="flex min-[900px]:hidden w-full h-full items-center justify-between pl-[20px] border-b border-transparent bg-transparent relative z-50">
        <a href="/" className="inline-flex w-auto items-center h-[24px] text-white" aria-label="Solara logo" onClick={closeMenu}>
          <Logo className="w-full h-auto block" />
        </a>

        <button
          className="w-[106px] h-full inline-flex items-center justify-center text-white text-[16px] tracking-[0.02em] leading-[26px]"
          onClick={toggleMenu}
          aria-expanded={isNavOpen}
          aria-label={isNavOpen ? 'Close menu' : 'Open menu'}
        >
          <span className="relative w-[44px] h-[26px] overflow-hidden block">
            <span
              className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isNavOpen ? 'top-[26px]' : 'top-0'
              }`}
            >
              Menu
            </span>
            <span
              className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isNavOpen ? 'top-0' : 'top-[-26px]'
              }`}
            >
              Close
            </span>
          </span>
        </button>
      </div>

      {/* Mobile Fullscreen Menu */}
      <aside
        className={`group/nav fixed inset-[86px_0_0_0] z-40 h-[calc(100vh-86px)] bg-black text-white overflow-hidden min-[900px]:hidden transition-all duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isNavOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-3 pointer-events-none'
        }`}
        aria-hidden={!isNavOpen}
        data-open={isNavOpen}
      >
        <div className="h-full px-[20px] py-[32px] flex flex-col justify-between">
          <nav className="flex flex-col gap-[16px] pt-[4px]" aria-label="Mobile navigation">
            {[
              { href: '#about', label: 'About' },
              { href: '#services', label: 'Services' },
              { href: '#pricing', label: 'Pricing' },
              { href: '#faq', label: 'FAQ' },
              { href: '#contact', label: 'Contact' },
            ].map((link, idx) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="w-max h-[60px] inline-flex items-center text-[clamp(36px,11vw,58px)] leading-none tracking-[-0.04em] text-white hover:text-white/70 transition-all duration-[480ms] ease-[cubic-bezier(0.22,1,0.36,1)] opacity-0 translate-y-[24px] group-data-[open=true]/nav:opacity-100 group-data-[open=true]/nav:translate-y-0"
                style={{ transitionDelay: `${0.05 * (idx + 1)}s` }}
                data-open={isNavOpen}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div>
            <div
              className="w-full transition-all duration-[480ms] ease-[cubic-bezier(0.22,1,0.36,1)] opacity-0 translate-y-[24px] group-data-[open=true]/nav:opacity-100 group-data-[open=true]/nav:translate-y-0"
              style={{ transitionDelay: '0.24s' }}
            >
              <a
                href="#contact"
                onClick={closeMenu}
                className="w-full btn-glass text-[15px]"
              >
                Get in Touch
              </a>
            </div>

            <div
              className="flex flex-col gap-[8px] mt-[24px] text-white/40 text-[14px] tracking-[0.02em] transition-all duration-[480ms] ease-[cubic-bezier(0.22,1,0.36,1)] opacity-0 translate-y-[20px] group-data-[open=true]/nav:opacity-100 group-data-[open=true]/nav:translate-y-0"
              style={{ transitionDelay: '0.3s' }}
              data-open={isNavOpen}
            >
              <span>Full-service digital agency</span>
              <span>Strategy &bull; Brand &bull; Experience &bull; Growth</span>
            </div>
          </div>
        </div>
      </aside>
    </header>
  );
}
