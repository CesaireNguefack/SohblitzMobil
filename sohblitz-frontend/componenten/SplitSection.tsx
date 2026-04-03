type Props = {
  left: React.ReactNode;
  right: React.ReactNode;
  reverse?: boolean;
  className?: string;
};

export default function SplitSection({
  left,
  right,
  reverse = false,
  className = "",
}: Props) {
  return (
    <section className={`w-full py-16 md:py-24 bg-[#f7f8fb] ${className}`}>
      <div
        className={`
          max-w-7xl mx-auto px-4 md:px-6
          grid grid-cols-1 md:grid-cols-2
          gap-10 md:gap-16
          items-center
        `}
      >
        {/* LEFT */}
        <div className={`${reverse ? "md:order-2" : ""}`}>
          {left}
        </div>

        {/* RIGHT */}
        <div className={`${reverse ? "md:order-1" : ""}`}>
          {right}
        </div>
      </div>
    </section>
  );
}