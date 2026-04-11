const API_URL = process.env.NEXT_PUBLIC_API_URL;


export type Availability = {
  id: number;
  start: string;
  end: string;
  type: AvailabilityType.AVAILABLE | AvailabilityType.BLOCKED;
};
 
export enum AvailabilityType {
  AVAILABLE = "available",
  BLOCKED = "blocked",
}

export async function getAvailabilities(): Promise<Availability[]> {
  const res = await fetch(`${API_URL}/calendar`);
  if (!res.ok) throw new Error("Erreur fetch availabilities");
  return res.json();
}

export async function getAvailabilitiesByType(
  type: AvailabilityType.AVAILABLE | AvailabilityType.BLOCKED
): Promise<Availability[]> {
  const res = await fetch(`${API_URL}/calendar/type/${type}`);

  if (!res.ok) throw new Error("Erreur fetch availabilities");

  const json = await res.json();

  if (json.status !== "success") {
    throw new Error(json.message || "Erreur API");
  }

  return json.data;
}

export async function createAvailability(data: Availability) {
  const res = await fetch(`${API_URL}/calendar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Erreur création");
  return res.json();
}

export async function updateAvailability(id: number, data: Availability) {
  const res = await fetch(`${API_URL}/calendar/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Erreur update");
  return res.json();
}

export async function deleteAvailability(id: number) {
  const res = await fetch(`${API_URL}/calendar/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Erreur delete");
  return true;
}
