import clsx from "clsx";

export default function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={clsx("container mx-auto flex flex-col items-center justify-center px-4", className)}>
      {children}
    </div>
  );
}
