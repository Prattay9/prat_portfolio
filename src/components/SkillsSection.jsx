import { useState, useEffect, useRef } from "react";
import { cn } from "../lib/utils";

const skills = [
  // Frontend
  { name: "HTML/CSS", level: 95, category: "frontend" },
  { name: "JavaScript", level: 90, category: "frontend" },
  { name: "React", level: 90, category: "frontend" },
  { name: "TypeScript", level: 85, category: "frontend" },
  { name: "Tailwind CSS", level: 90, category: "frontend" },
  { name: "Next.js", level: 80, category: "frontend" },

  // Backend
  { name: "Node.js", level: 80, category: "backend" },
  { name: "Express", level: 75, category: "backend" },
  { name: "MongoDB", level: 70, category: "backend" },
  
  

  // Tools
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
  const sectionRef = useRef(null);

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  // Helper to detect mobile screen
  const isMobile = () => window.innerWidth < 640;

  useEffect(() => {
    const section = sectionRef.current;
    let observer;
    let timeout;
    if (section) {
      observer = new window.IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            if (isMobile()) {
              // On mobile, set instantly to full width (no animation)
              setAnimatedWidths(filteredSkills.map((skill) => skill.level));
            } else {
              // On desktop/tablet, animate
              setAnimatedWidths(Array(filteredSkills.length).fill(0));
              timeout = setTimeout(() => {
                setAnimatedWidths(filteredSkills.map((skill) => skill.level));
              }, 200);
            }
          } else {
            setAnimatedWidths(Array(filteredSkills.length).fill(0));
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(section);
    }
    return () => {
      if (observer && section) observer.unobserve(section);
      if (timeout) clearTimeout(timeout);
    };
  }, [activeCategory, filteredSkills.length]);

  // Animate on hover (optional, can be removed if not needed)
  const handleMouseEnter = (idx, level) => {
    if (isMobile()) return; // No animation on mobile
    setAnimatedWidths((prev) =>
      prev.map((w, i) => (i === idx ? 0 : w))
    );
    setTimeout(() => {
      setAnimatedWidths((prev) =>
        prev.map((w, i) => (i === idx ? level : w))
      );
    }, 50);
  };

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
          {categories.map((category, key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-forefround hover:bd-secondary"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, key) => (
            <div
              key={skill.name}
              className="bg-card p-6 rounded-lg shadow-xs card-hover"
              onMouseEnter={() => handleMouseEnter(key, skill.level)}
            >
              <div className="text-left mb-4">
                <h3 className="font-semibold text-lg">{skill.name}</h3>
              </div>
              <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                <div
                  className={`bg-primary h-2 rounded-full origin-left ${
                    isMobile() ? "" : "transition-all duration-1000"
                  }`}
                  style={{
                    width: `${animatedWidths[key]}%`,
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