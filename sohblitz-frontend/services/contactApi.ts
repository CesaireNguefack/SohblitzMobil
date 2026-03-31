const API_URL = process.env.NEXT_PUBLIC_API_URL  

export async function createContact(data:any) {

  console.log("sending resquest...");

  const res = await fetch(`${API_URL}/contact`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  })

  return res 
}

export async function getContacts(){
  console.log(process.env.NEXT_PUBLIC_API_URL)
  console.log("fetching contacts...")
    const res = await fetch(`${API_URL}/contact`)
    return res.json()
}

export async function deleteContact(id: number)  {
    const res = await fetch(`${API_URL}/contact/${id}`, {   
        method: "DELETE",
    })

    return res.json()
}   

export async function answerContact(id: number, email: string)  {
    const res = await fetch(`${API_URL}/reservation/confirm/${id}`, {   
        method: "PATCH",
    })

    return res.json()
}
