"use client"

import SplitSection from "@/componenten/SplitSection"
import { useState } from "react"
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

  // 🚫 Expressions interdites (anti injection basique)
  const forbiddenPatterns = /(select|insert|delete|drop|update|script|<|>|\{|\}|\[|\]|--|;)/i

  // ✅ Regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const phoneRegex = /^\+?[0-9]+$/

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

  // ✅ VALIDATION SÉCURISÉE
  const validate = () => {
    const name = form.name.trim()
    const email = form.email.trim()
    const phone = form.phone.trim()
    const message = form.message.trim()

    // NAME
    if (name.length < 2 || name.length > 70)
      return t.contact.name+ " "+ t.contact.sizeerror
      
    if (forbiddenPatterns.test(name))
      return t.contact.name+" "+t.contact.errorcharacter
    // EMAIL
    if (!emailRegex.test(email))
      return t.contact.invalide+" Email"
    if (email.length < 2 || email.length > 70)
      return "Email size "+t.contact.invalide
    if (forbiddenPatterns.test(email))
      return "Email "+t.contact.errorcharacter

    // PHONE
    if (phone.length < 2 || phone.length > 8)
      return t.contact.phone+" "+t.contact.invalide
    if (!phoneRegex.test(phone))
      return t.contact.phone+" "+t.contact.invalide
    if (phone.includes("+") && !phone.startsWith("+"))
      return t.contact.phone+" "+t.contact.invalide

    // MESSAGE
    if (message.length < 2 || message.length > 500)
      return t.contact.message+" "+t.contact.messageerror
    if (forbiddenPatterns.test(message))
      return  t.contact.message+" "+t.contact.errorcharacter

    // ROBOT
    if (!form.isRobot)
      return  t.contact.roboterror 

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
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        message: form.message.trim(),
        lang: locale
      }

      const res = await createContact(formData)
      const data = await res.json()

      if (!res.ok) throw new Error(data.message || "Erreur")

      setSuccess(t.contact.sendsucess)

      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
        isRobot: false,
      })

    } catch (err: any) {
      setError(err.message || t.contact.senderror)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto md:mx-0 px-4 sm:px-0">

      <h2 className="text-[var(--foreground2)] font-semibold mb-6">
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
            maxLength={70}
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
            maxLength={70}
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
            maxLength={8}
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
            maxLength={500}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 resize-none"
          />
        </div>

        {/* ROBOT */}
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

        <ButtonSubmit loading={loading} />

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

     
      <div className="w-full max-w-md mx-auto md:mx-0 bg-white p-6 rounded-2xl shadow-xl">
       

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
        title={t.contact.addresse}
      /> <br></br>

         
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