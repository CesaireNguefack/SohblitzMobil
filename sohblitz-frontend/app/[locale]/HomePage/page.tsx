"use client"

import AboutSection from "@/app/[locale]/HomePage/AboutSection"
import Hero from "@/app/[locale]/HomePage/Hero"
import Navbar from "@/componenten/Navbar"

import ReviewsSection from "@/app/[locale]/HomePage/ReviewsSection"
import Services from "@/app/[locale]/HomePage/Services"
import { getServices } from "@/services/api"
import { useEffect, useState, useRef } from "react"
import Demo from "./Demo"
import TeamHome from "./Team"
import Prices from "./Prices"
import ContactSection from "./Contact"
import ContactSectionForm from "./ContactSectionForm"

export default function Welcome() {

    const [navState, setNavState] = useState<"transparent" | "gradient" | "white">("transparent")

    const heroRef = useRef<HTMLDivElement | null>(null)



    useEffect(() => {

        const handleScroll = () => {

            if (!heroRef.current) return

            const heroHeight = heroRef.current.offsetHeight
            const scroll = window.scrollY

            const oneThird = heroHeight / 3

            if (scroll < oneThird) {
                setNavState("transparent")
            }
            else if (scroll >= oneThird && scroll < heroHeight) {
                setNavState("gradient")
            }
            else {
                setNavState("white")
            }

        }

        window.addEventListener("scroll", handleScroll)

        return () => window.removeEventListener("scroll", handleScroll)

    }, [])

    return (

        <main className="bg-white">
            <Navbar navState={navState} />
            <div ref={heroRef}>
                <Hero />
            </div>
            <AboutSection />
            <Prices />
            <TeamHome />
            <ReviewsSection />
            <Demo />
            <ContactSectionForm />

        </main>
    )
}