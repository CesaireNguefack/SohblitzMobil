"use client"
import HeaderPages from "@/componenten/headerPages";
import Navbar from "@/componenten/Navbar";
import SplitSection from "@/componenten/SplitSection";

import { ContactCalendar } from "../../HomePage/ContactSectionForm";
import { useState } from "react";
import { ButtonSubmit } from "@/componenten/Cards/KontaktButton";
import { useParams } from "next/navigation";
import { createReservation } from "@/services/reservationApi";
import { services } from "@/app/data";

export default function ReservationPage() {
  return <main className="bg-white">
    <Navbar navState="gradient" />
    <br />
    <SplitSection
      left={
        <ReservationForm />
      }
      right={
        <ContactCalendar />
      }
    />
  </main>;

}

export function ReservationForm() {
   const params = useParams();
  const slug = params.slug as string;

  const id = slug.split("-")[0];
  const service = services.find((s) => s.id === parseInt(id));
  if (!service) {
    return <div className="p-20 text-center">Service not found</div>;
  }

  const [form, setForm] = useState({
    idService: 0,
    name: "",
    email: "",
    phone: "",
    message: "",
    street: "",
    zipcode: "",
    city: "",
    date: "",
    time: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const validate = () => {
    if (!form.name) return "Name is required"
    if (!form.email) return "Email is required"
    if (!form.street) return "Street is required"
    if (!form.zipcode) return "Zipcode is required"
    if (!form.city) return "City is required"
    if (!form.date || !form.time) return "Date and time are required"

    return null
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }

    // combine date + time → ISO format
    const isoDate = new Date(`${form.date}T${form.time}`).toISOString()

    const payload = {
      idService: Number(service.id),
      name: form.name,
      email: form.email,
      phone: form.phone || null,
      message: form.message || null,
      street: form.street,
      zipcode: form.zipcode,
      city: form.city,
      date: isoDate,
      status: "PENDING",
    }

    try {
      setLoading(true)
         console.log(payload)
       const res =  await createReservation(payload)
     
 
      if (!res.ok) throw new Error("Failed to submit")

      setSuccess(true)
      setForm({
        idService: 0,
        name: "",
        email: "",
        phone: "",
        message: "",
        street: "",
        zipcode: "",
        city: "",
        date: "",
        time: "",
      })
    } catch (err) {
      setError("Something went wrong+" + (err as Error).message)
      alert("Fehler bei der Reservierung: " + (err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-4">Reservierung: {service.title}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full border p-3 rounded" />

        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" className="w-full border p-3 rounded" />

        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Telefon" className="w-full border p-3 rounded" />

        <input name="street" value={form.street} onChange={handleChange} placeholder="Straße" className="w-full border p-3 rounded" />

        <div className="flex gap-2">
          <input name="zipcode" value={form.zipcode} onChange={handleChange} placeholder="PLZ" className="w-1/2 border p-3 rounded" />
          <input name="city" value={form.city} onChange={handleChange} placeholder="Stadt" className="w-1/2 border p-3 rounded" />
        </div>

        <div className="flex gap-2">
          <input type="date" name="date" value={form.date} onChange={handleChange} className="w-1/2 border p-3 rounded" />
          <input type="time" name="time" value={form.time} onChange={handleChange} className="w-1/2 border p-3 rounded" />
        </div>

        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Message"
          rows={4}
          className="w-full border p-3 rounded resize-none"
          onInput={(e) => {
            const target = e.currentTarget
            target.style.height = "auto"
            target.style.height = target.scrollHeight + "px"
          }}
        />
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-600">Reservation sent!</p>}
        <ButtonSubmit onClickSubmit={() => { }} loading={loading} />

      </form>
    </div>
  )
}
