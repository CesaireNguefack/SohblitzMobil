export default function TeamHome(){
    return (
        <section
                className="relative bg-fixed bg-center bg-cover py-40 text-white"
                style={{ backgroundImage: "url('/images/p1.jpeg')" }}
            >
                <div className="max-w-6xl mx-auto px-6 text-center">

                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Professionelle Reinigung für Ihr Zuhause
                    </h2>

                    <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
                        Wir bieten zuverlässige und gründliche Reinigungsdienste für Wohnungen,
                        Büros und Fenster – damit Sie sich auf die wichtigen Dinge konzentrieren können.
                    </p>

                    <button
                        className="text-white px-8 py-3 rounded-full shadow-lg hover:scale-105 transition"
                        style={{
                            background:
                                "linear-gradient(135deg, #b0dbf4 0%, #a9c9e4 50%, #6fa6d8 100%)",
                        }}
                    >
                        Kontaktieren →
                    </button>

                </div>
            </section>
    )
}