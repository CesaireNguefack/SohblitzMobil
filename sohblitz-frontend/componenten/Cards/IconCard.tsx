import IconDiv from "./IconDiv"

type Props = {
  icon: string
  title: string
  description: string
  onClick?: () => void
}

export default function IconCard({ icon, title, description, onClick }: Props) {

  return (

  <div onClick={onClick} className="flex items-center gap-4">
  <IconDiv icon={icon} />

  <div className="text-left">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="font-semibold">{description}</p>
  </div>

</div>
    
  )
}