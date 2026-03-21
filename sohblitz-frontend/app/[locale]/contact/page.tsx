import HeaderPages from "@/componenten/headerPages";
import ContactSectionForm from "../HomePage/ContactSectionForm";

export default function Contact() {
  return <main className="bg-white">
    <HeaderPages title={"navbar.contact"} headerTitle="contactPageHeaderInfos.title" subtitle ="contactPageHeaderInfos.subtitle" image="appointment1.png"/>
    <ContactSectionForm />
  </main>;
}