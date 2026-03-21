"use client"

import AdminNavbar from "@/componenten/AdminNavbar";
import AdminServiceCard from "@/componenten/AdminServiceCard";
import IconDiv from "@/componenten/Cards/IconDiv";
import { getServices, createService } from "@/services/api";
import { useEffect, useState } from "react"

type Service = {
  id: number
  title: string
  description: string
  price: number
  dateCreation: string
}

export default function Dashboard() {

  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  const [titre,setTitle] = useState("")
  const [description,setDescription] = useState("")
  const [price,setPrice] = useState("")

  const [error,setError] = useState("")
  const [success,setSuccess] = useState("")
  const [saving,setSaving] = useState(false)

  async function loadServices(){

    try{

      const data = await getServices()
      setServices(data)

    }catch(err){
      console.error(err)
    }finally{
      setLoading(false)
    }

  }

  useEffect(()=>{
    loadServices()
  },[])



  async function handleSubmit(e:React.FormEvent){

    e.preventDefault()

    setError("")
    setSuccess("")
    setSaving(true)

    try{

    const resp =  await createService({
        titre,
        description,
        price:Number(price)
      })

      setSuccess("Service ajouté avec succès")

      setTitle("")
      setDescription("")
      setPrice("")

      loadServices()

      setTimeout(()=>{
        setShowForm(false)
      },1500)

    }catch(err:any){

      setError(err.message || "Erreur lors de l'ajout")

    }finally{

      setSaving(false)

    }

  }



  return (

    <main className="bg-slate-50 min-h-screen">

      <AdminNavbar navState="gradient"/>

      <section className="pt-28 max-w-6xl mx-auto px-6">

      {!showForm && (

        <>
        <div className="flex justify-between items-center mb-10">

          <h1 className="text-3xl font-bold text-slate-800">
            Services Dashboard
          </h1>

          <div onClick={()=>setShowForm(true)}>
            <IconDiv icon={"+"} />
          </div>

        </div>

        {loading && (
          <p className="text-gray-500">Loading services...</p>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {services.map(service => (
            <AdminServiceCard key={service.id} service={service}/>
          ))}

        </div>
        </>

      )}



      {showForm && (

        <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-slate-200">

          <button
            onClick={()=>{
              setShowForm(false)
              loadServices()
            }}
            className="text-blue-600 mb-6 hover:underline"
          >
            ← Retour
          </button>

          <h2 className="text-2xl font-bold mb-6">
            Ajouter un service
          </h2>


          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-sm">
              {success}
            </div>
          )}


          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="text-sm font-medium text-slate-700">
                Titre
              </label>

              <input
                value={titre}
                onChange={(e)=>setTitle(e.target.value)}
                required
                className="w-full mt-2 border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>


            <div>
              <label className="text-sm font-medium text-slate-700">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                required
                className="w-full mt-2 border rounded-lg p-3 h-28 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>


            <div>
              <label className="text-sm font-medium text-slate-700">
                Prix
              </label>

              <input
                type="number"
                value={price}
                onChange={(e)=>setPrice(e.target.value)}
                required
                className="w-full mt-2 border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>


            <button
              type="submit"
              disabled={saving}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-60 flex justify-center items-center"
            >

              {saving ? (
                <span className="flex gap-2 items-center">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Enregistrement...
                </span>
              ) : (
                "Ajouter le service"
              )}

            </button>

          </form>

        </div>

      )}

      </section>

    </main>

  )

}