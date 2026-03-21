const services = [
  {
    id: 1,
    title: "Gebäudereinigung",
    pricing: ["25€ – 35€ pro Stunde"]
  },
  {
    id: 2,
    title: "Büro und Praxisreinigung",
    pricing: ["30€ – 40€ pro Stunde"]
  },
  {
    id: 3,
    title: "Bauendreinigung",
    pricing: [
      "Grobreinigung: 4€ – 9€ / m²",
      "Feinreinigung: 5€ – 9.50€ / m²",
      "Sanitär, Geräte und Möbel werden extra berechnet"
    ]
  },
  {
    id: 4,
    title: "Fenster und Glasreinigung",
    pricing: [
      "4€ – 8€ / m² (innen & außen)",
      "Rahmen: +1.45€ pro Fenster",
      "Verschmutzungsgrad / Höhe: +20% – 50%"
    ]
  },
  {
    id: 5,
    title: "Autoinnenreinigung",
    pricing: [
      "Basisreinigung: 40€ – 130€",
      "Intensivreinigung: 130€ – 250€",
      "Ozon Reinigung inklusive",
      "Geruchsbeseitigung: 50€ – 80€"
    ]
  },
  {
    id: 6,
    title: "Polster Reinigung",
    pricing: [
      "Sofa: 20€ – 40€ pro Sitz",
      "Sessel: 25€ – 40€",
      "Bürostuhl: 9€ – 20€"
    ]
  },
  {
    id: 7,
    title: "Teppichreinigung",
    pricing: ["6€ – 9€ pro m²"]
  },
  {
    id: 8,
    title: "Raffstore & Jalousie Reinigung",
    pricing: [
      "20€ – 55€ pro Stück",
      "Je nach Verschmutzung & Höhe: +10% – 45%"
    ]
  }
]

export default function Prices() {
  return (
    <section
      className="relative py-24 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/price-background.png')" }}
    >

      {/* overlay */}


      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Title */}
        <div className="text-center mb-6 text-white">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            Unsere Preise
          </h2>
          <p className="text-[#6f95b2] font-semibold mb-6">
            (netto, zzgl. MwSt.)
          </p>
        </div>
        <div className="mt-6 text-center mb-16  text-primary max-w-3xl mx-auto text-sm opacity-90">
          Fahrtkosten innerhalb Braunschweig: <b>0,35€ / km </b>
          außerhalb Braunschweig: <b>0,65€ / km</b>.
          Mindestbestellwert: <b>50€</b>.
          Rabatte bei Dauerverträgen verfügbar.
        </div>

        {/* Grid */}
       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

  {services.map((service) => (
    <div
      key={service.id}
      className="group relative bg-white/90 backdrop-blur rounded-2xl shadow-xl overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-2xl"
    >

      {/* Gradient hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#8fb0c8] to-[#6f95b2] opacity-0 group-hover:opacity-100 transition duration-500"></div>

      {/* Content */}
      <div className="relative z-10">

        {/* image */}
        <div className="overflow-hidden">
          <img
            src="/images/appointment0.png"
            alt={service.title}
            className="w-full h-52 object-cover transition duration-500 group-hover:scale-110"
          />
        </div>

        {/* text content */}
        <div className="p-6">

          <h3 className="text-xl font-bold mb-4 text-primary group-hover:text-white transition">
            {service.title}
          </h3>

          <ul className="space-y-2 text-gray-700 text-sm group-hover:text-white/90 transition">

            {service.pricing.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-primary group-hover:text-white">✔</span>
                {item}
              </li>
            ))}

          </ul>

        </div>

      </div>

    </div>
  ))}

</div>

        {/* footer info */}

      </div>

    </section>
  )
}