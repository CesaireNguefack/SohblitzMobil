type Props = {
  image: string
  date: string
  title: string
  description?: string
  onClick?: () => void
}

export default function ServiceCard({
  image,
  date,
  title,
  description,
  onClick
}: Props) {

  return (
    <div
      onClick={onClick}
      className="group relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer"
    >

      {/* Gradient hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#8fb0c8] to-[#6f95b2] opacity-0 group-hover:opacity-100 transition duration-500"></div>

      {/* Content */}
      <div className="relative z-10">

        {/* Image */}
        <img
          src="/images/doctor-small.jpg"
          alt={title}
          className="w-full h-52 object-cover"
        />

        <div className="p-6">

          {/* Date + icons */}
          <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
            <span>{date}</span>

            <div className="flex gap-2 text-blue-500">
              <i className="ri-linkedin-fill"></i>
              <i className="ri-facebook-fill"></i>
              <i className="ri-twitter-fill"></i>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-800 mb-3 leading-snug group-hover:text-white transition">
            {title}
          </h3>

          {/* Description */}
          {description && (
            <p className="text-gray-600 text-sm mb-4 group-hover:text-white/90 transition">
              {description}
            </p>
          )}

          {/* Learn more */}
          <button className="text-sm font-medium text-blue-500 group-hover:text-white transition">
            Learn More
          </button>

        </div>

      </div>

    </div>
  )
}