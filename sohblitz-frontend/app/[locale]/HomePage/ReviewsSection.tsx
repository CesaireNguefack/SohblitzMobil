"use client"
import { useState } from "react"

const reviews = [
    {
        id: 0,
        name: "Paulo Hubert",
        location: "New York, USA",
        avatar: "/images/p1.jpg",
        message:
            "Very professional cleaning service. My apartment was spotless and the team was very friendly."
    },
    {
        id: 1,
        name: "Laurence Vendetta",
        location: "California, USA",
        avatar: "/images/p1.jpg",
        message:
            "Amazing experience. The cleaners were punctual and extremely efficient."
    },
    {
        id: 2,
        name: "Cassandra Raul",
        location: "Florida",
        avatar: "/images/p1.jpg",
        message:
            "I was really impressed by the quality of the service. Everything was perfectly clean."
    }
]

export default function ReviewsSection() {

  const [selected, setSelected] = useState(1)
  const review = reviews[selected]

  return (

    <section className="py-20 md:py-28 bg-gray-50">

      <div className="max-w-6xl mx-auto px-4 overflow-hidden">

        {/* TITLE */}
        <div className="text-center mb-14 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-700">
            Some Reviews
          </h2>
          <p className="text-blue-600 font-medium mt-2">
            OF OUR CLIENTS
          </p>
        </div>

        {/* MAIN */}
        <div className="flex flex-col md:grid md:grid-cols-3 items-center gap-10">

          {/* LEFT ARC (inchangé design, sécurisé mobile) */}
          <div className="relative h-[260px] w-full max-w-[320px] mx-auto md:mx-0 pl-6 md:pl-0">

            {reviews.map((r, index) => {

              const active = index === selected
              const offset = Math.abs(index - selected)

              // 👉 moins agressif sur mobile
              const translateX = offset * -20

              return (
                <div
                  key={r.id}
                  onClick={() => setSelected(index)}
                  className={`absolute flex items-center gap-3 md:gap-4 cursor-pointer transition-all duration-300 ${
                    active ? "bg-white shadow-lg scale-105" : ""
                  }`}
                  style={{
                    top: `${index * 85}px`,
                    padding: "10px",
                    borderRadius: "20px",
                    transform: `translateX(${translateX}px)`
                  }}
                >

                  <img
                    src={r.avatar}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full"
                  />

                  <div>
                    <p className="font-semibold text-sm md:text-base text-slate-700">
                      {r.name}
                    </p>

                    <p className="text-xs md:text-sm text-gray-500">
                      {r.location}
                    </p>
                  </div>

                </div>
              )
            })}

          </div>

          {/* CENTER LINE */}
          <div className="w-full flex justify-center">

            {/* 📱 MOBILE → HORIZONTAL LINE */}
            <div className="flex md:hidden items-center w-full max-w-[320px]">

              <div className="h-[2px] bg-blue-500 w-full relative">

                {reviews.map((_, index) => {

                  const active = index === selected

                  return (
                    <div
                      key={index}
                      style={{ left: `${index * 25}%` }}
                      className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 ${
                        active
                          ? "bg-blue-500 border-blue-500"
                          : "bg-white border-blue-400"
                      }`}
                    />
                  )
                })}

              </div>

            </div>

            {/* 💻 DESKTOP → VERTICAL LINE */}
            <div className="hidden md:block relative">

              <div className="w-[2px] bg-blue-500 h-[260px] relative">

                {reviews.map((_, index) => {

                  const active = index === selected

                  return (
                    <div
                      key={index}
                      style={{ top: `${index * 90}px` }}
                      className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 ${
                        active
                          ? "bg-blue-500 border-blue-500"
                          : "bg-white border-blue-400"
                      }`}
                    />
                  )
                })}

              </div>

            </div>

          </div>

          {/* RIGHT MESSAGE */}
          <div className="w-full text-center md:text-left max-w-xl">

            <div className="text-blue-500 text-3xl md:text-4xl mb-4">
              ❝
            </div>

            <p className="text-gray-500 leading-relaxed text-sm md:text-base">
              {review.message}
            </p>

            <div className="mt-6 text-blue-500">
              ⭐⭐⭐⭐⭐
            </div>

          </div>

        </div>

        {/* BUTTON */}
        <div className="mt-10 text-center">
          <button className="text-sm font-medium text-blue-500 hover:underline">
            See More
          </button>
        </div>

      </div>

    </section>
  )
}