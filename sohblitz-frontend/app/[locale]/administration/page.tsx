"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { loginAdmin } from "@/services/api"

export default function AdminLogin() {
 const pathname = usePathname()
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
    const locale = pathname.split("/")[1] || "de"

  const handleLogin = async (e: React.FormEvent) => {

    e.preventDefault()

    setError("")
    setLoading(true)

    try {

      const data = await loginAdmin(email, password)

      // sauvegarde du token
       document.cookie = `token=${data.access_token}; path=/`
       

      // redirection. 
      router.push(`/${locale}/administration/dashboard`)

    } catch (err: any) {

      setError(err.message || "Login failed")

    } finally {

      setLoading(false)

    }

  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-10 rounded-xl shadow-md w-[400px]">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Admin Login
        </h1>

        {error && (
          <p className="text-red-500 mb-4 text-sm text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded-lg"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded-lg"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center"
          >

            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Logging in...
              </span>
            ) : (
              "Login"
            )}

          </button>

        </form>

      </div>

    </div>

  )
}