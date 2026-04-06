"use client"
import { useState } from "react"
import { useTranslations } from "@/lib/TranslationProvider"


const reviews = [
    {
        id: 0,
        name: "Martina Blume",
        location: "Braunschweig",
        avatar: "/images/p1.png",
        message: "Wir waren sehr zufrieden mit der Pünktlichkeit und der Qualität der Reinigung unserer Schaufenster! SohBlitz ist ein Unternehmen, das wir wärmstens empfehlen."

    },
    {
        id: 1,
        name: "Cesaire Dongmo",
        location: "Mannheim, Deuschland",
        avatar: "/images/p2.png",
        message: "Ich bin sehr zufrieden – mein Sofa sieht wieder wie neu aus. Die Arbeit wurde sorgfältig und effizient ausgeführt. Das Team ist professionell, pünktlich und freundlich. Ich kann den Service nur weiterempfehlen."
    },
    {
        id: 2,
        name: "Wilfried Mund",
        location: " Braunschweig",
        avatar: "/images/p3.png",
        message: "Very punctual and professional, with excellent cleanliness. I am very satisfied and will gladly use their services again."
    }
]

export default function ReviewsSection() {

    const [selected, setSelected] = useState(1)
    const review = reviews[selected]
    const t = useTranslations()

    return (

        <section className="py-20 md:py-28 bg-gray-50">

            <div className="max-w-6xl mx-auto px-4 overflow-hidden">

                {/* TITLE */}
                <div className="text-center mb-14 md:mb-20">
                    <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)">
                        {t.reviewsection.title}
                    </h2>
                    <p className="text-[var(--foreground2) font-medium mt-2">
                        {t.reviewsection.subtitle}
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
                                    className={`absolute flex items-center gap-3 md:gap-4 cursor-pointer transition-all duration-300 ${active ? "bg-white shadow-lg scale-105" : ""
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
                                        <p className="font-semibold text-sm md:text-base  text-[var(--foreground2)]">
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

                        <div className="flex md:hidden items-center w-full max-w-[320px]">
                            <div className="h-[2px] bg-[var(--foreground2)] w-full relative">
                                {reviews.map((_, index) => {
                                    const active = index === selected

                                    return (
                                        <div
                                            key={index}
                                            style={{ left: `${index * 25}%` }}
                                            className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 ${active
                                                    ? "bg-[var(--foreground2)] border-[var(--foreground2)]"
                                                    : "bg-white border-[var(--foreground2)]"
                                                }`}
                                        />
                                    )
                                })}
                            </div>
                        </div>

                        {/* 💻 DESKTOP → VERTICAL LINE */}
                        <div className="hidden md:block relative">
                            <div className="w-[2px] bg-[var(--foreground2)] h-[260px] relative">
                                {reviews.map((_, index) => {
                                    const active = index === selected

                                    return (
                                        <div
                                            key={index}
                                            style={{ top: `${index * 90}px` }}
                                            className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 ${active
                                                    ? "bg-[var(--foreground2)] border-[var(--foreground2)]"
                                                    : "bg-white border-[var(--foreground2)]"
                                                }`}
                                        />
                                    )
                                })}
                            </div>
                        </div>

                    </div>

                    {/* RIGHT MESSAGE */}
                    <div className="w-full text-center md:text-left max-w-xl">

                        <div className="text-[var(--foreground2)-500 text-3xl md:text-4xl mb-4">
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
                    <a
                        href= "https://share.google/5BMXF9gzR9jo0bPYt" target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-[var(--foreground2)] hover:underline"
                    >
                        {t.reviewsection.seemore}
                    </a>
                </div>

            </div>

        </section>
    )
}