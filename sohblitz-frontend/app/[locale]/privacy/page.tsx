import HeaderPages from "@/componenten/headerPages";
import PrivacySection from "./PrivacySection";

export default function Privacy() {
  return <main className="bg-white">
    <HeaderPages
      title="privacyPage.title"
      headerTitle="datenschutzPageHeaderInfos.title"
      subtitle="datenschutzPageHeaderInfos.subtitle"
       image="privacy.png"
    />
    <PrivacySection />
  </main>;
}