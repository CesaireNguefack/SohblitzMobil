"use client"

import AdminNavbar from "@/componenten/AdminNavbar"
import { deleteContact, getContacts } from "@/services/contactApi"
import { useEffect, useState } from "react"

type Contact = {
  id: number
  name: string
  email: string
  phone?: string | null
  message: string
  createdAt: string
}

export default function Page() {
  return (
    <main className="bg-slate-50 min-h-screen">
      <AdminNavbar navState="gradient" />
      <br /> <br />
      <ContactList />
    </main>
  )
}

export function ContactList() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)

  const fetchContacts = async () => {
    try {
      const data = await getContacts()
      setContacts(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContacts()
  }, [])

  const handleDelete = async (id: number) => {
    try {
      await deleteContact(id)
      fetchContacts()
    } catch (err) {
      console.error(err)
      alert("Erreur suppression")
    }
  }

  if (loading) return <p className="p-10 text-center">Loading...</p>

  function ContactCard({ c }: { c: Contact }) {
    return (
      <div className="bg-white shadow-lg rounded-2xl p-5 border w-full overflow-hidden">
        
        {/* HEADER */}
        <div className="mb-3">
          <h2 className="text-lg sm:text-xl font-semibold break-words">
            {c.name}
          </h2>
        </div>

        {/* INFO */}
        <div className="text-gray-600 text-sm space-y-1 break-words">
          <p>📧 {c.email}</p>
          {c.phone && <p>📞 {c.phone}</p>}
        </div>

        {/* MESSAGE */}
        <p className="mt-3 text-gray-700 italic break-words">
          "{c.message}"
        </p>

        {/* DATE */}
        <div className="mt-4 text-sm text-gray-500">
          <p>
            📅 {new Date(c.createdAt).toLocaleDateString()} à{" "}
            {new Date(c.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        {/* ACTIONS */}
        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          
          {/* DELETE */}
          <button
            onClick={() => handleDelete(c.id)}
            className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:scale-105 transition"
          >
            Supprimer
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 sm:px-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Contacts</h1>

      {/* GRID RESPONSIVE 🔥 */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {contacts.map((c) => (
          <ContactCard key={c.id} c={c} />
        ))}
      </div>
    </div>
  )
}