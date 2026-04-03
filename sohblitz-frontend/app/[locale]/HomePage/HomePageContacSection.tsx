import { useState } from "react"
import { useTranslations } from "@/lib/TranslationProvider"
import {ContactForm,ContactCalendar} from "./ContactSectionForm"

export  default function HomePageContacSection() {
   const t = useTranslations()

  return (
    <section className="py-20 md:py-28 bg-gray-50">

            <div className="max-w-6xl mx-auto px-4 overflow-hidden">

                {/* TITLE */}
                <div className="text-center mb-14 md:mb-20">
                    <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)">
                        {t.contact.title}
                    </h2>
                    <p className="text-[var(--foreground2) font-medium mt-2">
                        {t.contact.subtitle}
                    </p>
                </div>
      <ContactFormBody />
      </div>
     </section>
  )
}
export   function ContactFormBody() {
  return (
    <SplitSectionHome
      reverse
      left={<ContactForm />}
      right={<ContactCalendar />}
    />
  )
}

export   function SplitSectionHome({
  left,
  right,
  reverse = false,
}: Props) {
  return (
      <div
        className="
          max-w-7xl mx-auto px-4 md:px-6
          grid grid-cols-1 md:grid-cols-2
          gap-10 md:gap-16
          items-center
        "
      >
        {/* LEFT */}
        <div className={reverse ? "order-2 md:order-1" : ""}>
          {left}
        </div>

        {/* RIGHT */}
        <div className={reverse ? "order-1 md:order-2" : ""}>
          {right}
        </div>
      </div>
     
  );
}
type Props = {
  left: React.ReactNode;
  right: React.ReactNode;
  reverse?: boolean;
  className?: string;
};