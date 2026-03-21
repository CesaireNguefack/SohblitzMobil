

type Props={
    icon:any
}

export default function IconDiv({icon}:Props){
    return (
         <div
    className="flex-shrink-0 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md"
    style={{
      background: "linear-gradient(135deg, #d7e8f2 0%, #a9c9e4 50%, #6fa6d8 100%)"
    }}
  >
    {icon}
  </div>
    )
}