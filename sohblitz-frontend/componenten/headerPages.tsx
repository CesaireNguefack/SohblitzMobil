"use client"

import Navbar from "@/componenten/Navbar";
import { useTranslations } from "@/lib/TranslationProvider"

type Props = {
    title: string,
    headerTitle: string,
    subtitle: string,
    image: string
}

function getTranslation(obj: any, path: string) {
    return path.split(".").reduce((acc, part) => acc?.[part], obj) ?? path
}

export default function HeaderPages({ title, headerTitle, subtitle, image }: Props) {
    const t = useTranslations()

    let value = t
    let headerTitle_ = t
    let subtitle_ = t

    for (const key of headerTitle?.split(".") ?? []) {
        headerTitle_ = headerTitle_?.[key]
    }

    for (const key of subtitle?.split(".") ?? []) {
        subtitle_ = subtitle_?.[key]
    }


    for (const key of title?.split(".") ?? []) {
        value = value?.[key]
    }

    return (
        <main>
            <Navbar navState="gradient" />

            <section className="pt-14  bg-gray-50 bg-gradient-to-r from-[#d7e8f2] via-[#a9c9e4] to-[#6fa6d8]">

                <div className="max-w-7xl mx-auto px-10 grid md:grid-cols-2 items-center min-h-[100px]">

                    {/* Image */}
                    <div className="flex justify-center">
                        <img
                            src={`/images/${image}`}
                            alt="Doctor"
                            className="w-[150px] md:w-[250px]"
                        />
                    </div>

                    {/* Texte */}
                    <div className="text-slate-800  space-y-5">

                        <h5 className="text-4xl md:text-2xl font-bold leading-tight whitespace-pre-line">
                            {headerTitle_}
                        </h5>
                        <div className="space-y-10">
                            <p className="text-lg text-slate-600 ">
                                {subtitle_}
                            </p>
                        </div>


                    </div>

                </div>
            </section>

            <section className="flex justify-center items-center h-[70px]">
                <h1 className="text-4xl font-bold text-center">{value ?? ""}</h1>
            </section>
        </main>

    )
}