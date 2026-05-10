import AboutSection from "./AboutSection";
import FeaturedGrid from "./FeaturedGrid";
import HeroSection from "./HeroSection";
import LinksSection from "./LinksSection";
import ProjectsSection from "./ProjectsSection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <div className="mx-auto max-w-6xl px-6 py-10 text-center sm:px-8 sm:py-12 lg:px-10">
        {/* <HeroSection /> */}
        <AboutSection />
        {/* <FeaturedGrid /> */}
        {/* <ProjectsSection /> */}
        <LinksSection />
      </div>
    </main>
  );
}
