type Props = {
  icon: string;
  title: string;
  description: string;
  onClick?: () => void;
};

export default function IconCard({
  icon,
  title,
  description,
  onClick,
}: Props) {
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-start md:items-center gap-3 cursor-pointer"
    >
      {/* TOP ROW (mobile) */}
      <div className="flex items-center gap-3   md:gap-2">
        
        {/* ICON */}
        <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-blue-100 text-lg md:text-xl shadow">
          {icon}
        </div>

        {/* TITLE */}
        <p className="text-sm md:text-base font-medium text-gray-700">
          {title}
        </p>
      </div>

      {/* DESCRIPTION */}
      <p className="text-sm md:text-base font-semibold text-gray-800 break-all text-center md:text-center">
        {description}
      </p>
    </div>
  );
}