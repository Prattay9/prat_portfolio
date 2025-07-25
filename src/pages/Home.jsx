import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import StarBackground from '../components/StarBackground';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import SkillsSection from '../components/SkillsSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import { Contact } from 'lucide-react';
import { ArrowUp } from 'lucide-react';

const Home = () => {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Make lenis available globally for scrollTo
    window.lenis = lenis;

    return () => {
      lenis.destroy();
      window.lenis = undefined;
    };
  }, []);

  // Scroll to top handler using Lenis
  const handleScrollTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-backgroud text-foreground overflow-x-hidden">
        
         {/*background effects */}
         <StarBackground/>
          {/*Navbar*/}
          <Navbar/>
           {/*Main Content*/}
           <main>
            <HeroSection/>
            <AboutSection/>
            <SkillsSection/>
            <ProjectsSection/>
            <ContactSection/>
            <footer className="bg-secondary text-secondary-foreground py-6 text-center">
              <p>&copy; {new Date().getFullYear()} Prattay Das All rights reserved.</p>
            </footer>
           </main>
           {/* Arrow Up Icon */}
           <button
             onClick={handleScrollTop}
             className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/80 transition-colors"
             aria-label="Scroll to top"
           >
             <ArrowUp className="h-6 w-6" />
           </button>
    </div>
  )
}

export default Home;

