
type Props = {
  service: any
}


export default function AdminServiceCard({service}:Props){
    return (

            <div
              key={service.id}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition"
            >

              <h2 className="text-xl font-semibold text-slate-800">
                {service.title} 
              </h2>

              <p className="text-gray-600 mt-3 text-sm leading-relaxed">
                {service.description}
              </p>

              <div className="flex justify-between items-center mt-6">

                <span className="text-green-600 font-bold text-lg">
                  {service.price} €
                </span>

                <span className="text-xs text-gray-400">
                  {new Date(service.dateCreation).toLocaleDateString()}
                </span>

              </div>

              <div className="flex gap-3 mt-6">

                <button
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Modifier
                </button>

                <button
                  className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Supprimer
                </button>

              </div>

            </div>
    )
}