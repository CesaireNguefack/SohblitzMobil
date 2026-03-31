"use client"

import SplitSection from "@/componenten/SplitSection"
import { useState } from "react"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import { createContact } from "@/services/contactApi"
import { getCurentLanguage } from "@/languages/getcurentlanguage"

export default function ContactSectionForm() {
  return (
    <SplitSection
      reverse
      left={<ContactForm />}
      right={<ContactCalendar />}
    />
  )
}

function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    isRobot: false,
  })

  const locale = getCurentLanguage()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked
      setForm((prev) => ({ ...prev, [name]: checked }))
    } else {
      setForm((prev) => ({ ...prev, [name]: value }))
    }
  }

  // ✅ VALIDATION
  const validate = () => {
    if (!form.name.trim()) return "Name ist erforderlich"
    if (!form.email.includes("@")) return "Ungültige Email"
    if (form.message.length < 5) return "Nachricht zu kurz"
    if (!form.isRobot) return "Bitte bestätigen Sie, dass Sie kein Roboter sind"
    return null
  }

  // ✅ SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setError("")
    setSuccess("")

    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }

    try {
      setLoading(true)

      const formData = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
        lang: locale
      }
      const res = await createContact(formData)

      const data = await res.json()

      if (!res.ok) throw new Error(data.message || "Erreur")

      setSuccess("Message envoyé avec succès ✅")
      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
        isRobot: false,
      })
    } catch (err: any) {
      setError(err.message || "Erreur envoi")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto md:mx-0 px-4 sm:px-0">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
        Kontakt Form
      </h2>

      <p className="text-blue-400 font-semibold mb-6">
        Termin nehmen
      </p>

      <form className="space-y-5" onSubmit={handleSubmit}>

        {/* NAME */}
        <div>
          <label className="block text-gray-600 mb-2">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            type="text"
            placeholder="Ihr Name"
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
          />
        </div>

        {/* EMAIL */}
        <div>
          <label className="block text-gray-600 mb-2">Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            placeholder="Ihre Email"
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
          />
        </div>

        {/* PHONE */}
        <div>
          <label className="block text-gray-600 mb-2">Telefon</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            type="tel"
            placeholder="+49 123456789"
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
          />
        </div>

        {/* MESSAGE */}
        <div>
          <label className="block text-gray-600 mb-2">Nachricht</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={4}
            placeholder="Ihre Nachricht..."
            className="w-full border border-gray-300 rounded-lg px-4 py-3 resize-none"
          />
        </div>

        {/* ✅ ANTI ROBOT */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isRobot"
            checked={form.isRobot}
            onChange={handleChange}
          />
          <label className="text-sm text-gray-600">
            Ich bin kein Roboter
          </label>
        </div>

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        {/* SUCCESS */}
        {success && (
          <p className="text-green-600 text-sm">{success}</p>
        )}

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 transition"
          style={{
            background:
              "linear-gradient(135deg, #e7e9e1 0%, #b4c9da 30%, #2078cb 100%)",
          }}
        >
          {loading ? "Sending..." : "Submit →"}
        </button>
      </form>
    </div>
  )
}

export function ContactCalendar() {
  const [date, setDate] = useState(new Date())

  return (
    <div className="w-full max-w-md mx-auto md:mx-0 bg-white p-6 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold mb-4 text-primary">
        Verfügbarkeit
      </h2>

      <Calendar
        value={date}
        onChange={(value: any) => setDate(value)}
        className="border-none w-full"
      />
    </div>
  )
}