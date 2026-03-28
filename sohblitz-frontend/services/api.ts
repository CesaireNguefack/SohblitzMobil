//const API_URL = "http://localhost:3001" // on local
//const API_URL = "http://localhost:8080/api"  // in docker on local machine
const API_URL = process.env.NEXT_PUBLIC_API_URL;  //  global variable defined in .env.production and injected by docker-compose.prod.yml
//const API_URL = "http://51.75.65.254:3001" // on vps in production


export async function getServices(){
  console.log(process.env.NEXT_PUBLIC_API_URL)
  console.log("fetching services...")
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

