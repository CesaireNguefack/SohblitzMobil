 const API_URL = process.env.NEXT_PUBLIC_API_URL;  

export async function loginAdmin(email: string, password: string) {

  const res = await fetch(`${API_URL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    }
  ),
   credentials:"include"
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || "Login failed")
  }

  return data
}

export async function logout() {
  await fetch(`${API_URL}/user/logout`,{method:"POST",credentials:"include"})
  //router.push("/administration") 
}

