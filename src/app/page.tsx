import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { StatementBand } from "@/components/statement-band";
import { About } from "@/components/about";
import { FeaturedWork } from "@/components/featured-work";
import { Projects } from "@/components/projects";
import { Services } from "@/components/services";
import { Skills } from "@/components/skills";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <StatementBand />
      <About />
      <FeaturedWork />
      <Projects />
      <Services />
      <Skills />
      <Contact />
    </>
  );
}
