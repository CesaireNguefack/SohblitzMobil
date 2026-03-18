"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { createReservation } from "@/services/api"

export default function ReservationPage() {

  const router = useRouter()

  const params = useParams()

  const serviceId = params.id

  const [form,setForm] = useState({

    name:"",
    email:"",
    street:"",
    zipcode:"",
    city:"",
    message:"",
    date:""

  })

  function handleChange(e:any){

    setForm({
      ...form,
      [e.target.name]: e.target.value
    })

  }

  async function handleSubmit(e:any){

    e.preventDefault()
    try {
      const resp=  await createReservation({
      ...form,
      idService:Number(serviceId)
    })

    alert("Votre réservation a été envoyée")

    router.push("/")

    }catch(error){
        console.error("Erreur réservation:", error)
    }

  }

  return (

    <main className="p-10">

      <h1 className="text-2xl font-bold mb-6">
        Réserver un service
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-md"
      >

        <input
          name="name"
          placeholder="Nom"
          onChange={handleChange}
          required
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          name="street"
          placeholder="Rue"
          onChange={handleChange}
          required
        />

        <input
          name="zipcode"
          placeholder="Code postal"
          onChange={handleChange}
          required
        />

        <input
          name="city"
          placeholder="Ville"
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="date"
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          placeholder="Message"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded"
        >
          Envoyer la réservation
        </button>

      </form>

    </main>

  )

}