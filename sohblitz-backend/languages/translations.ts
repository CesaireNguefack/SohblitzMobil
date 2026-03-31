// email/translations.ts

export type Lang = "fr" | "en" | "de";

type Translation = {
    userSubject: string;
    greeting: string;
    received: string;
    review: string;
    confirmed: string;
    cancelled: string;
    adminSubject: string;
    confirmBtn: string;
    cancelBtn: string;
    thanks: string;
    team: string;
    newReservation: string;
    newContact: string;
    callationDetail: string;
    callationerror: string;
    confirmed_body: string;
    salutation: string;
    contactformsubject: string;
    contactsubjectbody: string;

};

export const translations: Record<Lang, Translation> = {
    fr: {
        userSubject: "Accusé de réception: Votre réservation a été reçue ",
        greeting: "Bonjour",
        callationDetail:" Votre réservation pour le service ci-dessous a été <strong>annulée</strong>.",
        callationerror:"Si cela est une erreur, veuillez nous contacter.",
        received: "Votre demande de nettoyage a été reçue avec succès.",
        review: "Notre équipe analyse votre demande et vous contactera très rapidement.",
        confirmed: "✅ Votre réservation a été confirmée 🎉",
        confirmed_body: "Votre demande pour notre service suivant a été confirmée.",
        cancelled: "Votre réservation a été annulée ❌",
        contactformsubject: "Accusé de réception",
        contactsubjectbody: " Votre message a été reçue avec succès.",
        adminSubject: "Nouvelle réservation 🚀",
        confirmBtn: "Confirmer",
        cancelBtn: "Annuler",
        salutation: "Cordialement",
        thanks: "Merci pour votre confiance ✨",
        team: "L’équipe Sohblitz Mobil",
        newReservation: "Nouvelle réservation depuis le site web",
        newContact: "Nouveau message depuis le site web"
    },

    en: {
        userSubject: "Acknowledgment of receipt: Your booking has been received ",
        greeting: "Hello",
        contactformsubject: "Acknowledgment of receipt",
        contactsubjectbody: " Your message has been successfully received.",
        callationDetail: " Your booking for the service below has been <strong>cancelled</strong>.",
        callationerror: "If this is an error, please contact us.",
        received: "Your cleaning request has been successfully received.",
        confirmed_body: "Your request for our following service has been confirmed.",
        review: "Our team is reviewing your request and will contact you shortly.",
        confirmed: "✅ Your booking has been confirmed 🎉",
        cancelled: "Your booking has been cancelled ❌",
        adminSubject: "New booking 🚀",
        confirmBtn: "Confirm",
        cancelBtn: "Cancel",
        salutation: "Best regards",
        thanks: "Thank you for your trust ✨",
        team: "Sohblitz Mobil Team",
        newReservation: "New reservation from the website",
        newContact: "New message from the website"
    },

    de: {
        userSubject: "Eingangsbestätigung: Ihre Buchung wurde erhalten",
        greeting: "Hallo",
        contactformsubject: "Eingangsbestätigung",
        contactsubjectbody: " Ihre Nachricht wurde erfolgreich erhalten.",
        callationDetail: "Ihre Buchung für den unten aufgeführten Dienst wurde <strong>storniert</strong>.",
        callationerror: "Wenn dies ein Fehler ist, kontaktieren Sie uns bitte.",
        confirmed_body: "Ihre Anfrage für unseren folgenden Dienst wurde bestätigt.",
        received: "Ihre Reinigungsanfrage wurde erfolgreich erhalten.",
        review: "Unser Team prüft Ihre Anfrage und wird Sie in Kürze kontaktieren.",
        confirmed: "✅ Ihre Buchung wurde bestätigt 🎉",
        cancelled: "Ihre Buchung wurde storniert ❌",
        adminSubject: "Neue Buchung 🚀",
        confirmBtn: "Bestätigen",
        cancelBtn: "Stornieren",
        salutation: "Mit freundlichen Grüßen",
        thanks: "Vielen Dank für Ihr Vertrauen ✨",
        team: "Ihr Sohblitz Mobil Team",
        newReservation: "Neue Buchung von der Website",
        newContact: "Neue Nachricht von der Website"
    },
};

// helper
export function getTranslation(lang?: string): Translation {
    if (!lang) return translations.fr;

    const key = lang.toLowerCase() as Lang;

    return translations[key] || translations.fr;
}