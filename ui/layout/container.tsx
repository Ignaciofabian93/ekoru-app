import clsx from "clsx";

export default function Container({ children }: { children: React.ReactNode }) {
  return <div className={clsx("container mx-auto flex flex-col items-center justify-center px-4")}>{children}</div>;
}
