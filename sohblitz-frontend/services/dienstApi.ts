export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"

export type Lang = "de" | "fr" | "en"

export type Service = {
  id: number
  title: string
  description1: string
  description: string
  pricing: string[]
  tags: string[]
  cover: string
  images: string[]
}

// 🔥 Get all services with language
export async function getServices(lang: Lang = "de"): Promise<Service[]> {

  console.log("API_URL++++backend")
  console.log(API_URL)
  try {
    const res = await fetch(`${API_URL}/services?lang=${lang}`, {
      cache: "no-store",
    })

    if (!res.ok) {
      throw new Error("Failed to fetch services")
    }

    const data: Service[] = await res.json()
    return data
  } catch (error) {
    console.error("getServices error:", error)
    return []
  }
}


type UploadResponse = {
  success: boolean;
  data: string | null;
};

export async function uploadServiceImage(
  file: File,
  serviceId: number
): Promise<UploadResponse> {
  try {

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${API_URL}/services/upload/${serviceId}`, {
      method: "POST",
      body: formData,
    });

    return await res.json();
  } catch (error) {
    console.error("uploadServiceImage error:", error);
    return { success: false, data: null };
  }
}

export async function deleteServiceImage(
  imagePath: string,
  serviceId: number
): Promise<UploadResponse> {
  try {
    const res = await fetch(`${API_URL}/services/deleteImage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        path: imagePath,
        serviceId,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to delete image");
    }

    return res.json();
  } catch (error) {
    console.error("deleteServiceImage error:", error);
    return {success:false, data:" "+error};
  }
}


// 🔥 Get one service by ID + language
export async function getServiceById(
  id: number,
  lang: Lang = "de"
): Promise<Service | null> {
  try {
    const res = await fetch(
      `${API_URL}/services/${id}?lang=${lang}`,
      { cache: "no-store" }
    )

    if (!res.ok) {
      throw new Error("Failed to fetch service")
    }

    const data: Service = await res.json()
    return data
  } catch (error) {
    console.error("getServiceById error:", error)
    return null
  }
}


// 🔥 Create service (si tu l’utilises côté backend)
export async function createService(data: any) {
  try {
    const res = await fetch(`${API_URL}/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      throw new Error("Failed to create service")
    }

    return await res.json()
  } catch (error) {
    console.error("createService error:", error)
    return null
  }
}