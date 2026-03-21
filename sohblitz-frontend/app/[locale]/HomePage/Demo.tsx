
export default function Demo() {
    return (
        <section className="relative h-[500px] flex items-center justify-center overflow-hidden">

            {/* Video background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover"
            >
                <source src="/videos/cleaning.mp4" type="video/mp4" />
            </video>

            {/* Overlay sombre pour lisibilité */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Content */}
            <div className="relative z-10 text-center text-white max-w-3xl px-6">

                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    Professionelle Reinigung für Ihr Zuhause
                </h2>

                <p className="text-lg md:text-xl mb-8">
                    Wir sorgen für Sauberkeit in Wohnungen, Büros und Geschäften.
                </p>

                <button
                    className="text-white px-8 py-3 rounded-full shadow-lg hover:scale-105 transition"
                    style={{
                        background:
                            "linear-gradient(135deg, #b0dbf4 0%, #a9c9e4 50%, #6fa6d8 100%)"
                    }}
                >
                    Kontaktieren →
                </button>

            </div>

        </section>
    )
}