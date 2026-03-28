"use client"

import SplitSection from "@/componenten/SplitSection"
import { useState } from "react"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"

export default function ContactSectionForm() {

  //const [date, setDate] = useState(new Date())
  const [date, setDate] = useState<Date | null>(new Date())

  const handleChange = (value: Date | Date[] | null) => {
    if (value instanceof Date) {
      setDate(value)
    }
  }

  return (
    <SplitSection
      reverse
      left={<ContactForm />}
      right={<ContactCalendar   />}
    />
  )
}

function ContactForm() {
  return (
    <div className="w-full max-w-xl mx-auto md:mx-0 px-4 sm:px-0">

      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
        Kontakt Form
      </h2>

      <p className="text-blue-400 font-semibold mb-6">
        Termin nehmen
      </p>

      <form className="space-y-5">

        {/* NAME */}
        <div>
          <label className="block text-gray-600 mb-2 text-sm sm:text-base">
            Name
          </label>
          <input
            type="text"
            placeholder="Ihr Name"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm sm:text-base focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* PHONE */}
        <div className="flex flex-col sm:flex-row gap-3">

          {/* COUNTRY CODE */}
          <input
            type="tel"
            placeholder="+49"
            className="w-full sm:w-24 border border-gray-300 rounded-lg px-3 py-3 text-sm sm:text-base focus:ring-2 focus:ring-primary"
          />

          {/* PHONE NUMBER */}
          <input
            type="tel"
            placeholder="Telefonnummer"
            className="flex-1 min-w-0 border border-gray-300 rounded-lg px-4 py-3 text-sm sm:text-base focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* DATE + TIME */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <div>
            <label className="block text-gray-600 mb-2 text-sm sm:text-base">
              Datum
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm sm:text-base"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-2 text-sm sm:text-base">
              Uhrzeit
            </label>
            <input
              type="time"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm sm:text-base"
            />
          </div>

        </div>

        {/* EMAIL */}
        <div>
          <label className="block text-gray-600 mb-2 text-sm sm:text-base">
            Email
          </label>
          <input
            type="email"
            placeholder="Ihre Email"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm sm:text-base"
          />
        </div>

        {/* MESSAGE */}
        <div>
          <label className="block text-gray-600 mb-2 text-sm sm:text-base">
            Nachricht
          </label>
          <textarea
            rows={4}
            placeholder="Ihre Nachricht..."
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm sm:text-base resize-none"
          />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full sm:w-auto text-white px-6 sm:px-8 py-3 rounded-full shadow-lg hover:scale-105 active:scale-95 transition duration-200"
          style={{
            background:
              "linear-gradient(135deg, #e7e9e1 0%, #b4c9da 30%, #2078cb 100%)"
          }}
        >
          Submit →
        </button>

      </form>
    </div>
  )
}

export function ContactCalendar() {
  const [date, setDate] = useState(new Date())
 

  const handleChange = (value: any) => {
    setDate(value)
  }

  return (
    <div className="w-full max-w-md mx-auto md:mx-0 bg-white p-6 md:p-8 rounded-2xl shadow-xl">

      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
        Verfügbarkeit
      </h2>

      <p className="text-gray-600 mb-6 text-sm md:text-base">
        Wählen Sie ein Datum, um verfügbare Termine zu sehen.
      </p>

      <Calendar
        value={date}
        onChange={handleChange}
        className="border-none w-full"
      />

    </div>
  )
}