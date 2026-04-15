type Props = {
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
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
        <div
          className="w-10 h-10 md:w-12 md:h-12 min-w-[2.5rem] md:min-w-[3rem]
          flex items-center justify-center rounded-full
          bg-gray-100 text-[var(--foreground2)] shadow
          group-hover:bg-[var(--foreground2)] group-hover:text-white transition duration-300"
        >
          {icon}
        </div>

        {/* TITLE */}
        <p className="text-sm md:text-base font-medium text-gray-700">
          <span
          className="text-sm md:text-base font-medium text-gray-700
          group-hover:text-[var(--foreground)] transition duration-300"
        >
          {title}
        </span>
        </p>
      </div>

      {/* DESCRIPTION */}
      <p className="text-sm md:text-base font-semibold text-gray-800 break-all text-center md:text-center">
        {description}
      </p>
    </div>
  );
}
