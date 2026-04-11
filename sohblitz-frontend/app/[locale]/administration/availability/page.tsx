"use client";

import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";

import {
  getAvailabilities,
  createAvailability,
  updateAvailability,
  deleteAvailability,
  Availability,
  AvailabilityType
} from "@/services/calendarApi";
import AdminNavbar from "@/componenten/AdminNavbar";

// ================= UTILS =================
const overlaps = (a: Availability, b: Availability) => {
  return new Date(a.start) < new Date(b.end) && new Date(b.start) < new Date(a.end);
};

export default function Page() {
  return (
    <main className="bg-white bg-slate-50 min-h-screen">
                <AdminNavbar navState="gradient" /> <br /> <br />
                <AdminAvailability />
                <br />
            </main>
  )
}
export  function AdminAvailability() {
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);

  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split("T")[0]);

  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");

  const [mode, setMode] = useState<AvailabilityType.AVAILABLE | AvailabilityType.BLOCKED>(AvailabilityType.AVAILABLE);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  // ================= LOAD =================
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await getAvailabilities();
    setAvailabilities(data);
  };

  // ================= FORMAT =================
  const buildDateTime = (dateStr: string, time: string) => {
    const [h, m] = time.split(":");
    const d = new Date(dateStr);
    d.setHours(Number(h));
    d.setMinutes(Number(m));
    return d.toISOString();
  };

  // ================= CREATE / UPDATE =================
  const handleApply = async () => {
    const start = buildDateTime(startDate, startTime);
    const end = buildDateTime(endDate, endTime);

    const tempId = Date.now();

    const newItem: Availability = {
      id: selectedId ?? tempId,
      start,
      end,
      type: mode,
    };

    const others = availabilities.filter((a) => a.id !== newItem.id);
    const conflict = others.some((a) => overlaps(a, newItem));

    if (conflict) {
      alert("Conflit détecté");
      return;
    }

    // 🔥 OPTIMISTIC UPDATE (instant UI)
    if (selectedId) {
      setAvailabilities((prev) =>
        prev.map((a) => (a.id === selectedId ? newItem : a))
      );
    } else {
      setAvailabilities((prev) => [...prev, newItem]);
    }

    setSelectedId(null);

    try {
      if (selectedId) {
        await updateAvailability(selectedId, newItem);
      } else {
        const response = await createAvailability(newItem);

        if (response.status !== "success" || !response.data) {
          // 🔥 suppression immédiate
          setAvailabilities((prev) =>
            prev.filter((a) => a.id !== tempId)
          );

          alert(response.message);
          return;
        }

        const created = response.data;
        setAvailabilities((prev) =>
          prev.map((a) => (a.id === tempId ? created : a))
        );

      }
    } catch (error) {

      // ❌ erreur technique
      setAvailabilities((prev) =>
        prev.filter((a) => a.id !== tempId)
      );

      alert("Erreur réseau");
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id: number) => {
    const backup = availabilities;

    setAvailabilities((prev) => prev.filter((a) => a.id !== id));

    try {
      await deleteAvailability(id);
    } catch {
      setAvailabilities(backup);
    }
  };

  // ================= DRAG =================
  const handleEventChange = async (info: any) => {
    const updated: Availability = {
      id: Number(info.event.id),
      start: info.event.start.toISOString(),
      end: info.event.end.toISOString(),
      type: info.event.extendedProps.type,
    };

    const backup = availabilities;

    const others = availabilities.filter((a) => a.id !== updated.id);
    const conflict = others.some((a) => overlaps(a, updated));

    if (conflict) {
      info.revert();
      return;
    }

    // 🔥 instant UI
    setAvailabilities((prev) =>
      prev.map((a) => (a.id === updated.id ? updated : a))
    );

    try {
      await updateAvailability(updated.id!, updated);
    } catch {
      setAvailabilities(backup);
      info.revert();
    }
  };

  // ================= CLICK =================
  const handleEventClick = (info: any) => {
    const id = Number(info.event.id);
    const item = availabilities.find((a) => a.id === id);
    if (!item) return;

    const start = new Date(item.start);
    const end = new Date(item.end);

    setStartDate(start.toISOString().split("T")[0]);
    setEndDate(end.toISOString().split("T")[0]);

    setStartTime(start.toTimeString().slice(0, 5));
    setEndTime(end.toTimeString().slice(0, 5));

    setMode(item.type);
    setSelectedId(id);
    setShowModal(true);
  };

  // ================= SELECT =================
  const handleSelect = (info: any) => {
    setStartDate(info.start.toISOString().split("T")[0]);
    setEndDate(info.end.toISOString().split("T")[0]);
    setSelectedId(null);
  };

  const handleToggle = async (id: number) => {
    const item = availabilities.find((a) => a.id === id);
    if (!item) return;

    const newType = item.type === AvailabilityType.AVAILABLE ? AvailabilityType.BLOCKED : AvailabilityType.AVAILABLE;

    const updatedItem: Availability = {
      ...item,
      type: newType,
    };

    // 🔥 backup pour rollback
    const backup = availabilities;

    // 🔥 optimistic UI (instant)
    setAvailabilities((prev) =>
      prev.map((a) => (a.id === id ? updatedItem : a))
    );

    setShowModal(false);

    try {
      const response = await updateAvailability(id, updatedItem);

      // ❌ erreur métier (ex: conflit backend)
      if (response.status !== "success" || !response.data) {
        setAvailabilities(backup); // rollback
        alert(response.message);
        return;
      }

      // ✅ succès → sync avec data backend
      const saved = response.data;

      setAvailabilities((prev) =>
        prev.map((a) => (a.id === id ? saved : a))
      );

    } catch (error) {
      console.error(error);

      // ❌ erreur technique → rollback
      setAvailabilities(backup);
      alert("Erreur réseau");
    }
  };

  const resetForm = () => {
    const today = new Date().toISOString().split("T")[0];
    setStartDate(today);
    setEndDate(today);
    setStartTime("09:00");
    setEndTime("17:00");
    setMode(AvailabilityType.AVAILABLE);
    setSelectedId(null);
  };

  // ================= RENDER =================
  return (
    <div className="p-6 bg-white rounded-2xl shadow-xl max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Gestion des disponibilités</h2>

      {/* Controls */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6 items-end">
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border px-2 py-1" />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="border px-2 py-1" />
        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="border px-2 py-1" />
        <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="border px-2 py-1" />

        <select value={mode} onChange={(e) => setMode(e.target.value as any)} className="border px-2 py-1">
          <option value="available">Disponible</option>
          <option value="blocked">Bloqué</option>
        </select>

        <button onClick={handleApply} className="bg-blue-600 text-white px-4 py-2 rounded">
          OK
        </button>
      </div>

      {/* Calendar */}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        selectable
        editable
        select={handleSelect}
        eventChange={handleEventChange}
        eventClick={handleEventClick}
        events={availabilities.map((a) => ({
          id: String(a.id),
          title: a.type === "available" ? "Disponible" : "Bloqué",
          start: a.start,
          end: a.end,
          backgroundColor: a.type === "available" ? "#22c55e" : "#ef4444",
          borderColor: a.type === "available" ? "#16a34a" : "#dc2626",
          extendedProps: { type: a.type },
        }))}
        height="auto"
      />
      {/* Modal inchangé */}
{showModal && selectedId && (() => {
  const current = availabilities.find(a => a.id === selectedId);
  if (!current) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-[300px]">
        <h3 className="font-semibold mb-4">Action</h3>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => handleToggle(selectedId)}
            className={`text-white py-2 rounded-lg ${
              current.type === "available"
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {current.type === "available" ? "Bloquer" : "Activer"}
          </button>

          <button
            onClick={() => setShowModal(false)}
            className="bg-yellow-400 py-2 rounded-lg"
          >
            Modifier
          </button>

          <button
            onClick={() => handleDelete(selectedId)}
            className="bg-red-500 text-white py-2 rounded-lg"
          >
            Supprimer
          </button>

          <button
            onClick={() => {
              setShowModal(false);
              resetForm();
            }}
            className="mt-2 text-gray-500 underline"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
})()}

    </div>
  );
}