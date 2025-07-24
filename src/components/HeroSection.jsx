import { ArrowDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4"
    >
      {/* Profile Picture Circle with hover animation and glow */}
      <div className="mb-8 flex justify-center">
        <div
          className={`
            w-48 h-48 rounded-full border-6 border-primary overflow-hidden flex items-center justify-center bg-white dark:bg-gray-900 shadow-lg
            transition-transform duration-300 ease-in-out
            hover:scale-105
            ring-4 ring-primary/30 dark:ring-blue-400/40
            hover:shadow-[0_0_32px_8px_rgba(59,130,246,0.4)] dark:hover:shadow-[0_0_40px_12px_rgba(96,165,250,0.7)]
            group
            opacity-0 animate-fade-in-delay-1
          `}
          style={{
            boxShadow:
              "0 0 24px 0 rgba(59,130,246,0.25), 0 0 0 0 rgba(0,0,0,0)",
          }}
        >
          <img
            src="/profile.jpeg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="container max-w-4xl mx-auto text-center z-10">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="opacity-0 animate-fade-in"> Hi, I'm</span>
            <span className="text-primary opacity-0 animate-fade-in-delay-1">
              {" "}
              Prattay
            </span>
            <span className="text-gradient ml-2 opacity-0 animate-fade-in-delay-2">
              {" "}
              Das
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-2-2xl mx-auto opacity-0 animate-fade-in-delay-3">
            I create stellar web experiences with modern technologies.
            Specializing in front-end development, I build interfaces that are
            both beautiful and functional.
          </p>

          <div className="pt-4 opacity-0 animate-fade-in-delay-4">
            <a href="#projects" className="cosmic-button">
              View My Work
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-sm text-muted-foreground mb-2"> Scroll </span>
        <ArrowDown className="h-5 w-5 text-primary" />
      </div>
    </section>
  );
};

export default HeroSection;