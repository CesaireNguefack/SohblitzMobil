"use client"

import SplitSection from "@/componenten/SplitSection"
import { useState } from "react"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import { createContact } from "@/services/contactApi"
import { getCurentLanguage } from "@/languages/getcurentlanguage"
import { useTranslations } from "@/lib/TranslationProvider"
import {ButtonSubmit} from "@/componenten/Cards/KontaktButton"

export default function ContactFormBody() {
  return (
    <SplitSection
       
      left={<ContactForm />}
      right={<ContactCalendar />}
    />
  )
}

export function ContactForm() {
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
  const t = useTranslations()

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

      <h2 className="text-[var(--foreground2) font-semibold mb-6">
        {t.contact.formtitle}
      </h2>

      <form className="space-y-5" onSubmit={handleSubmit}>

        {/* NAME */}
        <div>
          <label className="block text-gray-600 mb-2">{t.contact.name}</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            type="text"
            placeholder={t.contact.ihr  + " " + t.contact.name}
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
            placeholder= {t.contact.ihre  + " Email" }
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
          />
        </div>

        {/* PHONE */}
        <div>
          <label className="block text-gray-600 mb-2">{t.contact.phone}</label>
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
          <label className="block text-gray-600 mb-2">{t.contact.message}</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={4}
            placeholder= {t.contact.ihre  + " " + t.contact.message+"..."}
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
           {t.contact.robochek}
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
        <ButtonSubmit loading = {loading}  />
        
      </form>
    </div>
  )
}


export function ContactCalendar() {
  const [date, setDate] = useState(new Date())
    const locale = getCurentLanguage()
  const t = useTranslations()

  return (
    <div className="w-full max-w-xl mx-auto md:mx-0 px-4 sm:px-0">

      <IconCardForm
        icon="📞"
        title="0176 48082448"
      />

      <IconCardForm
        icon="📧"
        title="sohblitz.mobil@web.de"

      />

      <IconCardForm
        icon="📍"
        title="Heinrich-Büssing-Ring 22, 38102 Braunschweig"
      /> <br></br>

      <div className="w-full max-w-md mx-auto md:mx-0 bg-white p-6 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-primary">
        {t.contact.availability}
        </h2>

        <Calendar
          value={date}
          locale={locale}
          onChange={(value: any) => setDate(value)}
          className="border-none w-full"
        />
      </div>
    </div>
  )
}


export function IconCardForm({
  icon,
  title,
}: Props) {
  return (
    <div className="flex flex-col items-start gap-3 cursor-pointer py-3">

      {/* TOP ROW */}
      <div className="flex items-center gap-3">

        {/* ICON */}
        <div className="w-10 h-10 md:w-12 md:h-12 min-w-[2.5rem] md:min-w-[3rem] flex items-center justify-center rounded-full bg-blue-100 text-lg md:text-xl shadow">
          {icon}
        </div>

        {/* TITLE */}
        <label className="text-sm md:text-base font-medium text-gray-700">
          {title}
        </label>

      </div>

    </div>
  );
}

type Props = {
  icon: string;
  title: string;
};