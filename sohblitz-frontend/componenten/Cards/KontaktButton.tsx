import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { useTranslations } from "@/lib/TranslationProvider"

export   function ButtonContact(){
        const pathname = usePathname()
        const t = useTranslations()
       const locale = pathname.split("/")[1] || "de"
        const router = useRouter()
    
    return (
        <button  onClick={() => router.push(`/${locale}/contact`)}
            className="text-white px-5 py-3 rounded-xl shadow-lg 
             cursor-pointer hover:scale-105  "
             style={{ background: "var(--gradient-primary)" }}
          >
           {t.contact.contactbtn}
          </button>
    )
}


type Props = {
  onClick?: () => void,
  onClickSubmit?: () => void,
  loading?: boolean
}

export   function ButtonReservation({onClick}:Props){
   const t = useTranslations()
    return (
        <button  onClick={onClick}
            className="text-white px-5 py-3 rounded-xl shadow-lg 
             cursor-pointer hover:scale-105  "
             style={{ background: "var(--gradient-primary)" }}
          > {t.contact.reserve}
          </button>
    )
}

export   function ButtonSubmit({onClickSubmit,loading}:Props){
   const t = useTranslations()
    return (
        <button  type="submit" onClick={onClickSubmit}
            className="text-white px-5 py-3 rounded-xl shadow-lg 
             cursor-pointer hover:scale-105 "
             style={{ background: "var(--gradient-primary)" }}
          >
           {loading ?  t.contact.sending : t.contact.submit} 
          </button>
    )
}