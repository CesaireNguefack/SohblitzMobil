"use client"

import AdminNavbar from "@/componenten/AdminNavbar";
import AdminServiceCard from "@/componenten/AdminServiceCard";
import IconDiv from "@/componenten/Cards/IconDiv";
import { useEffect, useState, useMemo } from "react"
import { getCurentLanguage, Lang } from "@/languages/getcurentlanguage";
import { API_URL, Service, getServices, deleteServiceImage, uploadServiceImage } from "@/services/dienstApi";
import { PhotoProvider } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { useTranslations } from "@/lib/TranslationProvider"
const defaultImage = "/service_data/images/personel.jpeg";


export default function Page() {
  return (
    <main className="bg-slate-50 min-h-screen">
      <AdminNavbar navState="gradient" />
      <BodyImages />
    </main>
  )
}



export function BodyImages() {
  const [services, setServices] = useState<Service[]>([]);
  const [viewMode, setViewMode] = useState<"global" | "sections">("global");
  const [selectedImage, setSelectedImage] = useState<{ img: string; serviceId?: number } | null>(null);
  const [showDelete, setShowDelete] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const t = useTranslations()

  const lang = getCurentLanguage();

  useEffect(() => {
    async function loadServices() {
      const data = await getServices(lang as Lang)

      setServices(data);
      if (data.length > 0) setSelectedService(data[0].id);
    }
    loadServices();
  }, [lang]);

  const getFullUrl = (path: string) => {
    if (!path) return defaultImage;
    if (path.startsWith("http")) return path;
    return `${API_URL}${path}`;
  };

  const allImages = useMemo(() => {
    return services.flatMap((service) => {
      const imgs =
        service.images && service.images.length > 0
          ? service.images
          : [defaultImage];

      return imgs
        .filter((img): img is string => !!img && !img.includes("cov"))
        .map((img) => ({ img, serviceId: service.id }));
    });
  }, [services]);

  const handleDelete = async () => {
    if (!selectedImage || selectedImage.serviceId === null) return;

     
    const res = await deleteServiceImage(selectedImage.img, selectedImage.serviceId!)

    if (res.success) {
      alert("✅ Image supprimé avec succès");
      setServices((prev) =>
        prev.map((s) =>
          s.id === selectedImage.serviceId
            ? { ...s, images: s.images.filter((i) => i !== selectedImage.img) }
            : s
        )
      );

      setShowDelete(false);
      setSelectedImage(null);
    } else {
      alert("❌ Erreur lors de la suppression "+res.data);
    } 
    
  };

  const handleUpload = async () => {
    if (!file || selectedService === null) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("serviceId", String(selectedService));



    const result = await uploadServiceImage(file, selectedService);

    if (!result.success || !result.data) {
      alert("❌ Erreur lors de l'upload");
      return;
    }

    // ✅ succès
    alert("✅ Image ajoutée avec succès");

    setServices((prev) =>
      prev.map((s) =>
        s.id === selectedService
          ? { ...s, images: [...(s.images || []), result.data!] }
          : s
      )
    );

    setShowUpload(false);
    setFile(null);
  };

  return (
    <main className="bg-white min-h-screen">
      <PhotoProvider>
        <section className="bg-gray-50 px-6 md:px-16 py-16">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("sections")}
                className={`px-4 py-2 rounded ${viewMode === "sections" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              >
                {t.adminPage.btn_section_view}
              </button>
              <button
                onClick={() => setViewMode("global")}
                className={`px-4 py-2 rounded ${viewMode === "global" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              >
                {t.adminPage.btn_global_view}
              </button>
            </div>

            <button
              onClick={() => setShowUpload(true)}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >

              {t.adminPage.btn_add_image}
            </button>
          </div>

          {/* GLOBAL VIEW */}
          {viewMode === "global" && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
              {allImages.map(({ img, serviceId }, index) => {
                const isLarge = index % 5 === 0;

                return (
                  <div
                    key={index}
                    onClick={() => {
                      setSelectedImage({ img, serviceId });
                      setShowDelete(true);
                    }}
                    className={`relative overflow-hidden rounded-2xl group cursor-pointer ${isLarge ? "row-span-2" : ""}`}
                  >
                    <img
                      src={getFullUrl(img)}
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                    />
                  </div>
                );
              })}
            </div>
          )}

          {/* SECTIONS VIEW */}
          {viewMode === "sections" && (
            <div className="space-y-10">
              {services.map((service) => {
                const imgs = (service.images?.length ? service.images : [defaultImage]).filter((i) => !i.includes("cov"));

                return (
                  <div key={service.id}>
                    <h2 className="text-xl font-semibold mb-4">{service.title}</h2>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {imgs.map((img, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            setSelectedImage({ img, serviceId: service.id });
                            setShowDelete(true);
                          }}
                          className="relative overflow-hidden rounded-2xl cursor-pointer"
                        >
                          <img
                            src={getFullUrl(img)}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </section>

        {/* DELETE MODAL */}
        {showDelete && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-6 rounded">
              <p className="mb-4">{t.adminPage.title_delete_form}</p>
              <div className="flex gap-2 justify-end">
                <button onClick={() => setShowDelete(false)}>{t.adminPage.btn_cancel}</button>
                <button onClick={handleDelete} className="bg-red-500 text-white px-3 py-1 rounded">
                  {t.adminPage.btn_delete}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* UPLOAD MODAL */}
        {showUpload && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-6 rounded w-80">
              <h3 className="mb-4 font-semibold">{t.adminPage.form_add_image_title}</h3>

              <select
                className="w-full mb-3 border p-2"
                value={selectedService ?? ""}
                onChange={(e) => setSelectedService(Number(e.target.value))}
              >
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title}
                  </option>
                ))}
              </select>

              <div className="mb-4">
                <label
                  style={{ background: "var(--gradient-primary)" }}
                  className="cursor-pointer inline-block text-white px-4 py-2 rounded"
                >
                  📁 {t.adminPage.btn_choose_img}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const selectedFile = e.target.files?.[0];

                      if (!selectedFile) return;

                      if (!selectedFile.type.startsWith("image/")) {
                        alert("❌ Seules les images sont autorisées");
                        return;
                      }

                      setFile(selectedFile);
                    }}
                  />
                </label>

                {file && (
                  <p className="text-sm mt-2 text-gray-600">
                    {file.name}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-2">
                <button onClick={() => setShowUpload(false)}>  {t.adminPage.btn_cancel}</button>
                <button onClick={handleUpload} className="bg-green-500 text-white px-3 py-1 rounded">
                  {t.adminPage.btn_save}
                </button>
              </div>
            </div>
          </div>
        )}

      </PhotoProvider>
    </main>
  );
}

















export function Body() {

  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  const [titre, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [saving, setSaving] = useState(false)

  const fetchData = async () => {
    try {
      const data = await getServices(getCurentLanguage() as Lang)
      setServices(data)

    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    fetchData()
  }, [])

  async function handleSubmit(e: React.FormEvent) {

    e.preventDefault()

    setError("")
    setSuccess("")
    setSaving(true)

    /*
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
    */

  }

  return (
    <section className="pt-12 max-w-6xl mx-auto px-6">

      {!showForm && (

        <>
          <div className="flex justify-between items-center mb-10">

            <h1 className="text-3xl font-bold text-slate-800">
              Service Dashboard
            </h1>

            <div onClick={() => setShowForm(true)}>
              <IconDiv icon={"+"} />
            </div>

          </div>

          {loading && (
            <p className="text-gray-500">Loading services...</p>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {services.map(service => (
              <AdminServiceCard key={service.id} service={service} />
            ))}

          </div>
        </>

      )}

      {showForm && (

        <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-slate-200">

          <button
            onClick={() => {
              setShowForm(false)
              fetchData()
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
                onChange={(e) => setTitle(e.target.value)}
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
                onChange={(e) => setDescription(e.target.value)}
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
                onChange={(e) => setPrice(e.target.value)}
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
  )
}