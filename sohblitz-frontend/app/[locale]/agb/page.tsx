import HeaderPages from "@/componenten/headerPages"
import AgbSection from "./Agb"


export default function Agb() {

  return (
    <main className="bg-white">

      <HeaderPages
        title={"agbPage.title"}
        headerTitle="agbPageHeaderInfos.title"
        subtitle="agbPageHeaderInfos.subtitle"
        image="about.png"
      />

      <AgbSection />

    </main>
  )
}