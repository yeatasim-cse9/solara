import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Specialty } from './components/Specialty';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { MarqueeSection } from './components/MarqueeSection';
import { Team } from './components/Team';
import { TrustedBy } from './components/TrustedBy';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { ContentProvider } from './context/ContentContext';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handleLocationChange);
    
    // Custom navigation helper to update pathname state manually
    const handleCustomNavigate = (e: CustomEvent<string>) => {
      setCurrentPath(e.detail);
    };
    window.addEventListener('navigate' as any, handleCustomNavigate);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('navigate' as any, handleCustomNavigate);
    };
  }, []);

  // Custom navigation function to update browser state
  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  useEffect(() => {
    // Only initialize smooth scroll on the main landing page, NOT in admin panel
    if (currentPath !== '/' && currentPath !== '') return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickHandler = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickHandler);

    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickHandler);
      lenis.destroy();
    };
  }, [currentPath]);

  const renderRoute = () => {
    if (currentPath === '/admin') {
      return <AdminDashboard navigate={navigate} />;
    }
    if (currentPath === '/login') {
      return <AdminLogin navigate={navigate} />;
    }

    return (
      <div className="min-h-screen text-white selection:bg-brand selection:text-white">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Services />
          <Specialty />
          <MarqueeSection />
          <TrustedBy />
          <Team />
          <Pricing />
          <FAQ />
          <Contact />
        </main>
        <Footer />
        <BackToTop />
      </div>
    );
  };

  return (
    <ContentProvider>
      {renderRoute()}
    </ContentProvider>
  );
}

