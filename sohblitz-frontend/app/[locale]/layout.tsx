import { getTranslations } from "@/lib/translation";
import { TranslationProvider } from "@/lib/TranslationProvider";
import "../globals.css";
import { notFound } from "next/navigation"; 
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Footer from "@/componenten/Footer"

const locales = ["en", "de", "fr"];

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {

  const { locale } = await params;

  // Vérifier que la locale est valide
  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getTranslations(locale);

  return (
    <html lang={locale}>
      <body className="overflow-x-hidden">

        <TranslationProvider messages={messages}>
          {children}
          <Footer />
        </TranslationProvider>

      </body>
    </html>
  );
}