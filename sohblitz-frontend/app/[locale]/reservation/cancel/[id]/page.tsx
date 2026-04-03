"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/componenten/Navbar";
import {   cancelReservation } from "@/services/reservationApi";

const token = process.env.NEXT_PUBLIC_CONFIRMATION_TOKEN || "sblmobile"; // Assure-toi de définir cette variable d'environnement

export default function CancelReservationPage() {
  const params = useParams();
  const id = params.id as string;

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!id) return;

    const cancelReservation_ = async () => {
      try {
        const res = await cancelReservation(Number(id));

        if (res.status!== "success") {
          throw new Error("Erreur lors de la confirmation"+res);
        }

        const data = await res;

        setStatus("success");
        setMessage(data.message || "Réservation confirmée avec succès !");
      } catch (error: any) {
        setStatus("error");
        setMessage(
          error.message || "Une erreur est survenue lors de la confirmation."
        );
      }
    };

    cancelReservation_();
  }, [id]);

  return (
     <main className="bg-white">
                <Navbar navState="gradient" showLogo={true} />
                <section className="min-h-screen flex items-center justify-center">
      <div style={{ padding: "2rem", textAlign: "center" }}>
        {status === "loading" && <p>Stönieren läuft ....</p>}

        {status === "success" && (
          <div>
            <h1>✅  {message}</h1>
          </div>
        )}

        {status === "error" && (
          <div>
            <h1>❌ Erreur</h1>
            <p>{message}</p>
          </div>
        )}
      </div>
    </section>
    
    </main>
  );
}