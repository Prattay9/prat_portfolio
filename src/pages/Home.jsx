import ThemeToggle from '../components/ThemeToggle'
import StarBackground from '../components/StarBackground';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import SkillsSection from '../components/SkillsSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import { Contact } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-backgroud text-foreground overflow-x-hidden">
        {/*theme toggle*/}
        <ThemeToggle/>
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
            {/*footer*/}
    </div>
  )
}

export default Home;

