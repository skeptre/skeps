import AboutSection from "./AboutSection";
import FeaturedGrid from "./FeaturedGrid";
import HeroSection from "./HeroSection";
import LinksSection from "./LinksSection";
import ProjectsSection from "./ProjectsSection";

export default function HomePage() {
    return (
        <main className="min-h-screen bg-white text-zinc-900">
            <div className="mx-auto max-w-6xl px-6 py-8 text-center sm:px-8 lg:px-10">
                {/* <HeroSection /> */}
                <AboutSection />
                {/* <FeaturedGrid /> */}
                {/* <ProjectsSection /> */}
                <LinksSection />
            </div>
        </main>
    );
}