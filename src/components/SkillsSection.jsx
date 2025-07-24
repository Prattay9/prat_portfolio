import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "../lib/utils";

const skills = [
  { name: "HTML/CSS", level: 95, category: "frontend" },
  { name: "JavaScript", level: 90, category: "frontend" },
  { name: "React", level: 90, category: "frontend" },
  { name: "TypeScript", level: 85, category: "frontend" },
  { name: "Tailwind CSS", level: 90, category: "frontend" },
  { name: "Next.js", level: 80, category: "frontend" },
  { name: "Node.js", level: 80, category: "backend" },
  { name: "Express", level: 75, category: "backend" },
  { name: "MongoDB", level: 70, category: "backend" },
  { name: "Git/GitHub", level: 90, category: "tools" },
  { name: "Docker", level: 70, category: "tools" },
  { name: "Figma", level: 55, category: "tools" },
  { name: "VS Code", level: 95, category: "tools" },
  { name: "Vercel", level: 95, category: "tools" },
];

const categories = ["all", "frontend", "backend", "tools"];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [animatedWidths, setAnimatedWidths] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  const observerRef = useRef(null); // Track observer

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  // Detect mobile screen
  const checkIsMobile = useCallback(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  useEffect(() => {
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, [checkIsMobile]);

  // Trigger animation manually if already in view
  const triggerAnimation = () => {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const isVisible =
      rect.top < window.innerHeight && rect.bottom >= 0;

    if (isVisible && !isMobile) {
      setAnimatedWidths(Array(filteredSkills.length).fill(0));
      setTimeout(() => {
        setAnimatedWidths(filteredSkills.map((skill) => skill.level));
      }, 200);
    } else if (isMobile) {
      setAnimatedWidths(filteredSkills.map((skill) => skill.level));
    } else {
      setAnimatedWidths(Array(filteredSkills.length).fill(0));
    }
  };

  // Handle tab change or resize or load
  useEffect(() => {
    triggerAnimation();
  }, [activeCategory, filteredSkills.length, isMobile]);

  // Setup observer for scroll-based animation (desktop)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || isMobile) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimatedWidths(Array(filteredSkills.length).fill(0));
          setTimeout(() => {
            setAnimatedWidths(filteredSkills.map((skill) => skill.level));
          }, 200);
        } else {
          setAnimatedWidths(Array(filteredSkills.length).fill(0));
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    observerRef.current = observer;

    return () => observer.disconnect();
  }, [filteredSkills.length, isMobile]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 px-4 relative bg-secondary/30"
    >
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary"> Skills</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-foreground hover:bd-secondary"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => (
            <div
              key={skill.name}
              className="bg-card p-6 rounded-lg shadow-xs card-hover"
            >
              <div className="text-left mb-4">
                <h3 className="font-semibold text-lg">{skill.name}</h3>
              </div>
              <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-2 rounded-full origin-left transition-[width] duration-[1500ms] ease-in-out will-change-[width]"
                  style={{
                    width: `${animatedWidths[index] ?? 0}%`,
                  }}
                />
              </div>
              <div className="text-right mt-1">
                <span className="text-sm text-muted-foreground">
                  {skill.level}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
