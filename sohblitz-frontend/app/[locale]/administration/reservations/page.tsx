"use client"

import AdminNavbar from "@/componenten/AdminNavbar"
import { cancelReservation, confirmReservation, deleteReservation, getReservation } from "@/services/reservationApi"
import { useEffect, useState } from "react"
type Reservation = {
    id: number
    name: string
    email: string
    phone?: string | null
    message?: string | null
    street: string
    zipcode: string
    city: string
    date: string
    status: string
    createdAt: string
    service: {
        id: number
        titre: string
        description: string
        price: number
    }
}
const statusConfig = {
    PENDING: {
        label: "En attente",
        className: "bg-yellow-100 text-yellow-700",
    },
    CONFIRMED: {
        label: "Confirmée",
        className: "bg-green-100 text-green-700",
    },
    CANCELLED: {
        label: "Annulée",
        className: "bg-red-100 text-red-700",
    },
    DONE: {
        label: "Terminée",
        className: "bg-blue-100 text-blue-700",
    },
} as const



export default function Page() {
    return (
        <main className="bg-white bg-slate-50 min-h-screen">
            <AdminNavbar navState="gradient" /> <br /> <br />
            <ReservationList />
             
        </main>
    )
}


export function ReservationList() {
    const [reservations, setReservations] = useState<Reservation[]>([])
    const [loading, setLoading] = useState(true)

    const fetchReservations = async () => {
        try {
            const data = await getReservation()

            setReservations(data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {


        fetchReservations()
    }, [])

    const handleConfirmation = async (id: number) => {
        try {

            const result = await confirmReservation(id)

            if (result.status === "error") {
                throw new Error(result.message)
            }

            fetchReservations()
        } catch (err) {
            console.error(err)
            alert("Erreur confirmation")
        }
    }

    const handleCancellation = async (id: number) => {
        try {

            const result = await cancelReservation(id)

            if (result.status === "error") {
                throw new Error(result.message)
            }

            fetchReservations()
        } catch (err) {
            console.error(err)
            alert("Erreur confirmation")
        }
    }

    const handleDelete = async (id: number) => {
        try {

            const result = await deleteReservation(id)

            fetchReservations()
        } catch (err) {
            console.error(err)
            alert("Erreur suppression")
        }
    }

    const status = (r: Reservation) => {
        return statusConfig[r.status as keyof typeof statusConfig]
    }

    if (loading) return <p className="p-10 text-center">Loading...</p>

      function ReservationCard({ r }: { r: Reservation }) {  
    return (
        <main>  
                <div className="max-w-md mx-auto px-3">
                        <div
                            key={r.id}
                            className="bg-white shadow-lg rounded-2xl p-5 border w-full max-w-full overflow-hidden"
                        >
                            {/* HEADER */}
                            <div className="flex justify-between items-center mb-3 gap-2">
                                <h2 className="text-xl font-semibold break-words">
                                    {r.name}
                                </h2>

                                <span
                                    className={`text-sm ${status(r).className} px-3 py-1 rounded-full whitespace-nowrap`}
                                >
                                    {status(r).label}
                                </span>
                            </div>

                            {/* SERVICE */}
                            <p className="text-blue-600 font-medium mb-2 break-words">
                                {r.service.titre} - {r.service.price}€
                            </p>

                            {/* INFO */}
                            <div className="text-gray-600 text-sm space-y-1 break-words">
                                <p>📧 {r.email}</p>
                                {r.phone && <p>📞 {r.phone}</p>}
                                <p>
                                    📍 {r.street}, {r.zipcode} {r.city}
                                </p>
                            </div>

                            {/* MESSAGE */}
                            {r.message && (
                                <p className="mt-3 text-gray-700 italic break-words">
                                    "{r.message}"
                                </p>
                            )}

                            {/* DATE */}
                            <div className="mt-4 text-sm text-gray-500">
                                <p>
                                    📅 {new Date(r.date).toLocaleDateString()} à{" "}
                                    {new Date(r.date).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </p>

                                <p>
                                    Créé le{" "}
                                    {new Date(r.createdAt).toLocaleDateString()}
                                </p>
                            </div>

                            {/* ACTIONS 🔥 */}
                            <div className="mt-4 flex flex-col sm:flex-row gap-3">
                                {/* CONFIRM */}
                                <button
                                    onClick={() => handleConfirmation(r.id)}
                                    disabled={r.status === "CONFIRMED"}
                                    className={`w-full sm:w-auto px-4 py-2 rounded-lg text-white transition ${r.status === "CONFIRMED"
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-green-600 hover:scale-105"
                                        }`}
                                >
                                    Confirm
                                </button>

                                {/* CANCEL */}
                                <button
                                    onClick={() => handleCancellation(r.id)}
                                    disabled={r.status === "CANCELED"}
                                    className={`w-full sm:w-auto px-4 py-2 rounded-lg text-white transition ${r.status === "CANCELED"
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-yellow-600 hover:scale-105"
                                        }`}
                                >
                                    Cancel
                                </button>

                                {/* DELETE */}
                                <button
                                    onClick={() => handleDelete(r.id)}
                                    className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:scale-105 transition"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
        </main>
    ) 
}  

    return (
        <div className="px-4 sm:px-6 max-w-6xl mx-auto overflow-x-hidden">

            <h1 className="text-3xl font-bold mb-6">Reservations</h1>

            <div className="grid gap-6">

                {reservations.map((r) => (
                    <ReservationCard key={r.id} r={r} />
                ))}

            </div>
        </div>
    )


}


