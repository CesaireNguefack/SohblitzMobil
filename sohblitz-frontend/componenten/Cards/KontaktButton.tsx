import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"

export   function ButtonContact(){
        const pathname = usePathname()
    
       const locale = pathname.split("/")[1] || "de"
        const router = useRouter()
    
    return (
        <button  onClick={() => router.push(`/${locale}/contact`)}
            className="text-white px-5 py-3 rounded-xl shadow-lg 
             cursor-pointer hover:scale-105  "
            style={{
              background: "linear-gradient(135deg, #b0dbf4 0%, #a9c9e4 50%, #6fa6d8 100%)"
            }}
          >
            Kontaktieren →
          </button>
    )
}

type Props = {
  onClick?: () => void,
  onClickSubmit?: () => void,
  loading?: boolean
}

export   function ButtonReservation({onClick}:Props){
    return (
        <button  onClick={onClick}
            className="text-white px-5 py-3 rounded-xl shadow-lg 
             cursor-pointer hover:scale-105  "
            style={{
              background: "linear-gradient(135deg, #b0dbf4 0%, #a9c9e4 50%, #6fa6d8 100%)"
            }}
          >
            Buchen →
          </button>
    )
}

export   function ButtonSubmit({onClickSubmit,loading}:Props){
    return (
        <button  onClick={onClickSubmit}
            className="text-white px-5 py-3 rounded-xl shadow-lg 
             cursor-pointer hover:scale-105  "
            style={{
              background: "linear-gradient(135deg, #b0dbf4 0%, #a9c9e4 50%, #6fa6d8 100%)"
            }}
          >
           {loading ? "Sending..." : "Submit →"} 
          </button>
    )
}