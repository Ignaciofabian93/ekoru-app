type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Grid({ children, className }: Props) {
  return <div className={`grid ${className}`}>{children}</div>;
}
