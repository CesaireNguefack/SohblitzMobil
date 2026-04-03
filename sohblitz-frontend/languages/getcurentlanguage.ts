import { get } from "http";
import { usePathname } from "next/dist/client/components/navigation";

export type Lang = "de" | "fr" | "en"

export function getCurentLanguage() {
    const pathname = usePathname()
    const allowedLangs = ['fr', 'en', 'de'];
    const locale = allowedLangs.includes(pathname.split('/')[1])
      ? pathname.split('/')[1]
      : 'de';
    return locale
}   