"use client"

import AboutSection from "@/app/[locale]/HomePage/AboutSection"
import Hero from "@/app/[locale]/HomePage/Hero"
import Navbar from "@/componenten/Navbar"

import ReviewsSection from "@/app/[locale]/HomePage/ReviewsSection"

import { useEffect, useState, useRef } from "react"
import Demo from "./Demo"
import TeamHome from "./Team"
import HomePageContacSection from "./HomePageContacSection"
import ServicesBlock from "./Services"
import Footer from "@/componenten/Footer"

export default function Welcome() {

    const [navState, setNavState] = useState<"transparent" | "gradient" | "white">("transparent")

    const heroRef = useRef<HTMLDivElement | null>(null)
    const [showlogo, setShowLogo] = useState<boolean>(false)



    useEffect(() => {

        const handleScroll = () => {

            if (!heroRef.current) return

            const heroHeight = heroRef.current.offsetHeight
            const scroll = window.scrollY

            const oneThird = heroHeight / 3

            if (scroll < oneThird) {
                setNavState("transparent")
                setShowLogo(false)
            }
            else if (scroll >= oneThird && scroll < heroHeight) {
                setNavState("gradient")
                setShowLogo(true)
            }
            else {
                setNavState("white")
                  setShowLogo(true)
            }

        }

        window.addEventListener("scroll", handleScroll)

        return () => window.removeEventListener("scroll", handleScroll)

    }, [])

    return (

        <main className="bg-white">
            <Navbar navState={navState} showLogo={showlogo}/>
            <div ref={heroRef}>
                <Hero />
            </div>
            <AboutSection />
            <ServicesBlock  />
            <TeamHome />
            <ReviewsSection />
            <Demo />
            <HomePageContacSection />
             

        </main>
    )
}