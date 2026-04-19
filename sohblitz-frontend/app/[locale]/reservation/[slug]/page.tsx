"use client";

import Navbar from "@/componenten/Navbar";
import SplitSection from "@/componenten/SplitSection";
import { ContactCalendar } from "../../HomePage/ContactSectionForm";
import { useState, useEffect } from "react";
import { ButtonSubmit } from "@/componenten/Cards/KontaktButton";
import { useParams } from "next/navigation";
import { createReservation } from "@/services/reservationApi";
import { getCurentLanguage, Lang } from "@/languages/getcurentlanguage";
import { getServiceById, Service } from "@/services/dienstApi";
import { getAvailabilities, Availability, AvailabilityType, getAvailabilitiesByType } from "@/services/calendarApi";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";

import { useTranslations } from "@/lib/TranslationProvider"




export default function ReservationPage() {
  return (
    <main className="bg-white">
      <Navbar navState="gradient" showLogo={true} /> <br /> <br />
      <div> <br /> <br /></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div>
          <ReservationForm />
          <br /> <br />
        </div>

        <div className="max-h-[600px] overflow-y-auto">
          <AvailabilityCalendar />
        </div>
      </div>
    </main>
  );
}



//
// ================= FORM =================
//
/*
export function ReservationForm() {
    const t = useTranslations()
  const params = useParams();
  const slug = params.slug as string;
  const locale = getCurentLanguage();

  const [availabilities, setAvailabilities] = useState<Availability[]>([]);

  const [form, setForm] = useState({
    idService: 0,
    name: "",
    email: "",
    phone: "",
    message: "",
    street: "",
    zipcode: "",
    city: "",
    date: "",
    time: "",
    lang: locale,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [service, setService] = useState<Service | null>(null);

  // ================= LOAD =================
  useEffect(() => {
    async function load() {
      const id = parseInt(slug.split("-")[0]);

      const serviceData = await getServiceById(id, locale as Lang);
      setService(serviceData);

      const availabilityData = await getAvailabilitiesByType(AvailabilityType.AVAILABLE);
      setAvailabilities(availabilityData);
    }

    load();
  }, [slug, locale]);

  if (!service) {
    return <div className="p-20 text-center">Service not found</div>;
  }

  // ================= UTILS =================
  const isAvailable = (dateISO: string) => {
    const selected = new Date(dateISO);

    return availabilities.some((a) => {
      const start = new Date(a.start);
      const end = new Date(a.end);
      return selected >= start && selected <= end;
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.name) return "Name is required";
    if (!form.email) return "Email is required";
    if (!form.street) return "Street is required";
    if (!form.zipcode) return "Zipcode is required";
    if (!form.city) return "City is required";
    if (!form.date || !form.time)
      return "Date and time are required";

    return null;
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess(false);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    const isoDate = new Date(
      `${form.date}T${form.time}`
    ).toISOString();

    // 🔥 CHECK AVAILABILITY
    if (!isAvailable(isoDate)) {
      setError(
        "Nous ne sommes pas disponibles à cette date. Veuillez consulter le calendrier."
      );
      return;
    }

    const payload = {
      idService: Number(service.id),
      name: form.name,
      email: form.email,
      phone: form.phone || null,
      message: form.message || null,
      street: form.street,
      zipcode: form.zipcode,
      city: form.city,
      date: isoDate,
      status: "PENDING",
      lang: locale,
    };

    try {
      setLoading(true);

      const res = await createReservation(payload);

      if (!res.ok) throw new Error("Failed");

      setSuccess(true);

      setForm({
        idService: 0,
        name: "",
        email: "",
        phone: "",
        message: "",
        street: "",
        zipcode: "",
        city: "",
        date: "",
        time: "",
        lang: locale,
      });
    } catch (err) {
      setError("Erreur lors de la réservation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-4">
        {t.contact.reservationformtitle}: {service.title}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder={t.contact.name} className="w-full border p-3 rounded" />

        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" className="w-full border p-3 rounded" />

        <input name="phone" value={form.phone} onChange={handleChange} placeholder={t.contact.phone} className="w-full border p-3 rounded" />

        <input name="street" value={form.street} onChange={handleChange} placeholder={t.contact.street} className="w-full border p-3 rounded" />

        <div className="flex gap-2">
          <input name="zipcode" value={form.zipcode} onChange={handleChange} placeholder={t.contact.postcode} className="w-1/2 border p-3 rounded" />
          <input name="city" value={form.city} onChange={handleChange} placeholder={t.contact.city} className="w-1/2 border p-3 rounded" />
        </div>

        <div className="flex gap-2">
          <input type="date" name="date" value={form.date} onChange={handleChange} className="w-1/2 border p-3 rounded" />
          <input type="time" name="time" value={form.time} onChange={handleChange} className="w-1/2 border p-3 rounded" />
        </div>

        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Message"
          className="w-full border p-3 rounded"
        />

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-600">{t.contact.confirmedreservationsent}</p>}

        <ButtonSubmit onClickSubmit={() => { }} loading={loading} />
      </form>
    </div>
  );
}
 */

export function ReservationForm() {
  const t = useTranslations();
  const params = useParams();
  const slug = params.slug as string;
  const locale = getCurentLanguage();

  const [availabilities, setAvailabilities] = useState<Availability[]>([]);

  const [form, setForm] = useState({
    idService: 0,
    name: "",
    email: "",
    phone: "",
    message: "",
    street: "",
    zipcode: "",
    city: "",
    date: "",
    time: "",
    lang: locale,
  });

  const [isHuman, setIsHuman] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [service, setService] = useState<Service | null>(null);

  // ================= LOAD =================
  useEffect(() => {
    async function load() {
      const id = parseInt(slug.split("-")[0]);

      const serviceData = await getServiceById(id, locale as Lang);
      setService(serviceData);

      const availabilityData = await getAvailabilitiesByType(
        AvailabilityType.AVAILABLE
      );
      setAvailabilities(availabilityData);
    }

    load();
  }, [slug, locale]);

  // ================= DEFAULT DATE =================
  useEffect(() => {
    const now = new Date();

    const date = now.toISOString().split("T")[0];
    const time = now.toTimeString().slice(0, 5);

    setForm((prev) => ({ ...prev, date, time }));
  }, []);

  if (!service) {
    return <div className="p-20 text-center">Service not found</div>;
  }

  // ================= UTILS =================
  const isAvailable = (dateISO: string) => {
    const selected = new Date(dateISO);

    return availabilities.some((a) => {
      const start = new Date(a.start);
      const end = new Date(a.end);
      return selected >= start && selected <= end;
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= SECURITY =================
  const hasSQLInjection = (value: string) => {
    return /(select|insert|delete|update|drop|truncate|--|;|'|"|\*)/i.test(
      value
    );
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPhone = (phone: string) => {
    return /^\+?[0-9]+$/.test(phone);
  };

  // ================= VALIDATION =================
  const validate = () => {

    // NAME
    if (form.name.length < 2 || form.name.length > 70)
      return t.contact.name + " " + t.contact.invalide;
    if (hasSQLInjection(form.name)) return t.contact.name + " " + t.contact.invalide;

    // EMAIL
    if (!isValidEmail(form.email)) return "Email invalide";
    if (form.email.length < 2 || form.email.length > 70)
      return "Email " + t.contact.invalide;
    if (hasSQLInjection(form.email)) return "Email " + t.contact.invalide;

    // PHONE
    if (form.phone) {
      if (!isValidPhone(form.phone))
        return t.contact.phone + " " + t.contact.invalide;
      if (form.phone.length < 2 || form.phone.length > 25)
        return t.contact.phone + " " + t.contact.invalide;
    }

    // STREET
    if (form.street.length < 2 || form.street.length > 70)
      return t.contact.street + " " + t.contact.invalide;
    if (hasSQLInjection(form.street)) return t.contact.street + " " + t.contact.invalide;

    // ZIPCODE
    if (!/^[0-9]+$/.test(form.zipcode))
      return t.contact.postcode + " " + t.contact.invalide;
    if (form.zipcode.length < 4 || form.zipcode.length > 7)
      return t.contact.postcode + " " + t.contact.invalide;;

    // CITY
    if (form.city.length < 2 || form.city.length > 70)
      return t.contact.city + " " + t.contact.invalide;
    if (hasSQLInjection(form.city)) return t.contact.city + " " + t.contact.invalide;

    // MESSAGE
    if (form.message) {
      if (form.message.length < 5 || form.message.length > 170)
        return t.contact.message + " " + t.contact.invalide;
      if (hasSQLInjection(form.message))
        return t.contact.message + " " + t.contact.invalide;
    }

    // DATE
    if (!form.date || !form.time)
      return "Datum Fehlt";

    if (!isHuman) return t.contact.roboterror;

    return null;
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess(false);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    const isoDate = new Date(
      `${form.date}T${form.time}`
    ).toISOString();

    if (!isAvailable(isoDate)) {
      setError(
        t.contact.notavailable
      );
      return;
    }

    const payload = {
      idService: Number(service.id),
      name: form.name,
      email: form.email,
      phone: form.phone || null,
      message: form.message || null,
      street: form.street,
      zipcode: form.zipcode,
      city: form.city,
      date: isoDate,
      status: "PENDING",
      lang: locale,
    };

    try {
      setLoading(true);

      const res = await createReservation(payload);

      if (!res.ok) throw new Error("Failed");

      setSuccess(true);

      setForm({
        idService: 0,
        name: "",
        email: "",
        phone: "",
        message: "",
        street: "",
        zipcode: "",
        city: "",
        date: "",
        time: "",
        lang: locale,
      });

      setIsHuman(false);
    } catch (err) {
      setError("Erreur lors de la réservation");
    } finally {
      setLoading(false);
    }
  };

  // ================= UI =================
  return (
    <div className="w-full max-w-xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-4">
        {t.contact.reservationformtitle}: {service.title}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder={t.contact.name} className="w-full border p-3 rounded" />

        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" className="w-full border p-3 rounded" />

        <input name="phone" value={form.phone} onChange={handleChange} placeholder={t.contact.phone} className="w-full border p-3 rounded" />

        <input name="street" value={form.street} onChange={handleChange} placeholder={t.contact.street} className="w-full border p-3 rounded" />

        <div className="flex gap-2">
          <input name="zipcode" value={form.zipcode} onChange={handleChange} placeholder={t.contact.postcode} className="w-1/2 border p-3 rounded" />
          <input name="city" value={form.city} onChange={handleChange} placeholder={t.contact.city} className="w-1/2 border p-3 rounded" />
        </div>

        <div className="flex gap-2">
          <label htmlFor=""> {t.contact.datereservation}</label>
        </div>
        <div className="flex gap-2">
          <input type="date" name="date" value={form.date} onChange={handleChange} className="w-1/2 border p-3 rounded" />
          <input type="time" name="time" value={form.time} onChange={handleChange} className="w-1/2 border p-3 rounded" />
        </div>

        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Message"
          className="w-full border p-3 rounded"
        />

        {/* ✅ CHECKBOT */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isHuman}
            onChange={(e) => setIsHuman(e.target.checked)}
          />
          <label>{t.contact.robochek}</label>
        </div>

        {error && <p className="text-red-500">{error}</p>}
        {success && (
          <p className="text-green-600">
            {t.contact.confirmedreservationsent}
          </p>
        )}

        <ButtonSubmit onClickSubmit={() => { }} loading={loading} />
      </form>
    </div>
  );
}

function AvailabilityCalendar() {
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
     getAvailabilitiesByType(AvailabilityType.AVAILABLE).then((data) => {
    const now = new Date();

    const filtered = data.filter((a) => {
      const endDate = new Date(a.end);
      return endDate >= now; // 🔥 garde présent + futur
    });

    setAvailabilities(filtered);
  });
  }, []);

  if (expanded) {
    return (
      <FullCalendarExpanded
        availabilities={availabilities}
        onClose={() => setExpanded(false)}
      />
    );
  }

  return (
    <MiniCalendar
      availabilities={availabilities}
      onExpand={() => setExpanded(true)}
    />
  );
}

function MiniCalendar({ availabilities, onExpand }: any) {
  const t = useTranslations()
  const getDaysBetween = (start: string, end: string) => {
    const dates: string[] = [];

    let current = new Date(start);
    const last = new Date(end);

    current.setHours(0, 0, 0, 0);
    last.setHours(0, 0, 0, 0);

    while (current <= last) {
      const y = current.getFullYear();
      const m = String(current.getMonth() + 1).padStart(2, "0");
      const d = String(current.getDate()).padStart(2, "0");

      dates.push(`${y}-${m}-${d}`);

      current.setDate(current.getDate() + 1);
    }

    return dates;
  };

  // 🔥 map jour -> disponibilités
  const daysMap: Record<string, Availability[]> = {};

  availabilities.forEach((a: Availability) => {
    const days = getDaysBetween(a.start, a.end);

    days.forEach((day) => {
      if (!daysMap[day]) {
        daysMap[day] = [];
      }
      daysMap[day].push(a);
    });
  });

  const days = Object.keys(daysMap);

  const formatDay = (dateString: string) => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${hours}:${minutes}`;
  };

  const formatRange = (start: string, end: string) => {
    const s = new Date(start);
    const e = new Date(end);

    return `${formatDateTime(start)} → ${formatDateTime(end)}`;
  };

  return (
    <div className="bg-gray-50 p-4 rounded-xl">
      <h3 className="font-semibold mb-4">{t.contact.availability}</h3>

      <button
        onClick={onExpand}
        className="mb-4 bg-gray-300 px-4 py-2 rounded"
      >
        {t.contact.showfullcalender}
      </button>

      <div className="grid grid-cols-3 gap-2">
        {days.map((day: string) => (
          <div
            key={day}
            style={{ backgroundColor: "#a6c7e3" }}
  className="  p-3 rounded"
          >
            {/* 📅 Date */}
            <div className="font-bold mb-1">
              {formatDay(day)}
            </div>

            {/* ⏰ Plages horaires */}
            {daysMap[day].map((a: Availability) => (
              <div key={a.id} className="text-sm">
                {formatRange(a.start, a.end)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function FullCalendarExpanded({ availabilities, onClose }: any) {
  const t = useTranslations()
  return (
    <div>
      <button
        onClick={onClose}
        className="mb-4 bg-gray-300 px-4 py-2 rounded"
      >
        {t.contact.goback}
      </button>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        height={600}
        events={availabilities.map((a: Availability) => ({
          id: String(a.id),
          title: "Disponible",
          start: a.start,
          end: a.end,
          backgroundColor: "#a6c7e3",
        }))}
      />
    </div>
  );
}
