const API_URL = "http://localhost:3001"

export async function getServices(){
    const res = await fetch(`${API_URL}/service`)
    return res.json()
}

export async function createService(data:any) {
   console.log(data)
    const res = await fetch(`${API_URL}/service`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    })
    console.log(res)

    return res.json()
}


export async function createReservation(data:any) {

  console.log("sending resquest...");

  const res = await fetch(`${API_URL}/reservation`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  })

  return res.json()
}

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

