import { cn } from "@/lib/utils";

interface SectionHeaderProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export const SectionHeader = ({
  children,
  className,
  ...props
}: SectionHeaderProps) => {
  return (
    <h3
      className={cn(
        "text-sm font-overpass font-semibold text-pop-white-300 mb-1",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
};
