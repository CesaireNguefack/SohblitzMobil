import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"

export default function ButtonContact(){
        const pathname = usePathname()
    
       const locale = pathname.split("/")[1] || "de"
        const router = useRouter()
    
    return (
        <button  onClick={() => router.push(`/${locale}/contact`)}
            className="text-white px-8 py-3 rounded-full shadow-lg 
             cursor-pointer hover:scale-105  "
            style={{
              background: "linear-gradient(135deg, #b0dbf4 0%, #a9c9e4 50%, #6fa6d8 100%)"
            }}
          >
            Kontaktieren →
          </button>
    )
}

export   function ButtonReservation(){
        const pathname = usePathname()
    
       const locale = pathname.split("/")[1] || "de"
        const router = useRouter()
    
    return (
        <button  onClick={() => router.push(`/${locale}/contact`)}
            className="text-white px-8 py-3 rounded-full shadow-lg 
             cursor-pointer hover:scale-105  "
            style={{
              background: "linear-gradient(135deg, #b0dbf4 0%, #a9c9e4 50%, #6fa6d8 100%)"
            }}
          >
            Buchen →
          </button>
    )
}