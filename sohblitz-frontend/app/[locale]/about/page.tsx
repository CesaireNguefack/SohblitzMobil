import HeaderPages from "@/componenten/headerPages";
import AboutSection from "./About";

export default function About() {
  return (
    <main className="bg-white">
      <HeaderPages
        title="navbar.about"
        headerTitle="aboutPageHeaderInfos.title"
        subtitle="aboutPageHeaderInfos.subtitle"
        image="about.png"
      />
      <AboutSection/>
    </main>
  );
}