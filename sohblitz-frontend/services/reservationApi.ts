
const API_URL = process.env.NEXT_PUBLIC_API_URL  

export async function createReservation(data:any) {

  console.log("sending resquest...");

  const res = await fetch(`${API_URL}/reservation`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  })

  return res 
}

export async function getReservation(){
  console.log(process.env.NEXT_PUBLIC_API_URL)
  console.log("fetching services...")
    const res = await fetch(`${API_URL}/reservation`)
    return res.json()
}

export async function confirmReservation(id: number)  {
    const res = await fetch(`${API_URL}/reservation/confirm/${id}`, {   
        method: "PATCH",
    })

    return res.json()
}

export async function cancelReservation(id: number)  {
    const res = await fetch(`${API_URL}/reservation/cancel/${id}`, {   
        method: "PATCH",
    })

    return res.json()
}

export async function deleteReservation(id: number)  {
    const res = await fetch(`${API_URL}/reservation/${id}`, {   
        method: "DELETE",
    })

    return res.json()
}