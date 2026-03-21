import HeaderPages from "@/componenten/headerPages";
import ImpressumSection from "./Impressum";

export default function Impressum() {
  return <main className="bg-white">
    <HeaderPages
      title="navbar.impressum"
      headerTitle="impressumPageHeaderInfos.title"
      subtitle="impressumPageHeaderInfos.subtitle"
       image="impressum.png"
    />
   <ImpressumSection />
  </main>;
}