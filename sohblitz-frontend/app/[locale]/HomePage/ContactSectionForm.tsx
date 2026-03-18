"use client"

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
    <section className="py-24 bg-gray-50">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">

        {/* LEFT SIDE FORM */}
        <div>

          <h2 className="text-4xl font-bold text-gray-800 mb-10">
            Kontakt Form
          </h2>

          <p className="text-blue-400 font-semibold mb-2">
            Termin nehmen
          </p> <br />

          <form className="space-y-6">

            {/* name + phone */}
            <div className="grid grid-cols-2 gap-4">

              <div>
                <label className="block text-gray-600 mb-2">
                  Name
                </label>

                <input
                  type="text"
                  placeholder="Ihr Name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">

                {/* Vorwahl */}
                {/* Vorwahl */}
                <div className="col-span-1 min-w-[80px]">
                  <label className="block text-gray-600 mb-2">
                    Vorwahl
                  </label>

                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="+49"
                    className="w-full min-w-[80px] border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Telefonnummer */}
                <div className="col-span-2">
                  <label className="block text-gray-600 mb-2">
                    Telefonnummer
                  </label>

                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="17648082448"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

              </div>

            </div>

            {/* date + time */}
            <div className="grid grid-cols-2 gap-4">

              <div>
                <label className="block text-gray-600 mb-2">
                  Datum
                </label>

                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-gray-600 mb-2">
                  Uhrzeit
                </label>

                <input
                  type="time"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

            </div>

            {/* email */}
            <div>
              <label className="block text-gray-600 mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="Ihre Email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* message */}
            <div>
              <label className="block text-gray-600 mb-2">
                Nachricht
              </label>

              <textarea
                name="message"
                rows={4}
                placeholder="Ihre Nachricht..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              ></textarea>
            </div>



            {/* button */}
            <button className="text-white px-8 py-3 rounded-full shadow-lg 
             cursor-pointer hover:scale-105  "
            style={{
              background: "linear-gradient(135deg, #e7e9e1 0%, #b4c9da 30%, #2078cb 100%)"
            }}>
              Submit →
            </button>

          </form>
        </div>

        {/* CALENDRIER */}
        <div className="bg-white p-8 rounded-2xl shadow-xl">

          <h2 className="text-3xl font-bold mb-6 text-primary">
            Verfügbarkeit
          </h2>

          <p className="text-gray-600 mb-6">
            Wählen Sie ein Datum, um unsere verfügbaren Termine zu sehen.
          </p>

          <Calendar

            value={date}
            className="border-none w-full"
          />

        </div>

      </div>

    </section>
  )
}