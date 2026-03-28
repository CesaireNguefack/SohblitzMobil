import { main } from "framer-motion/client"
import AdminNavbar from "@/componenten/AdminNavbar";

export default function Page() {
  return ( 
    <main className="bg-white">
    <AdminNavbar navState="gradient"/>
      <section className="pt-12 max-w-6xl mx-auto px-6">
        <h1>Contact</h1>
        <p>This is the contact page for the administration section.</p>
      </section>
    </main>
  )
}