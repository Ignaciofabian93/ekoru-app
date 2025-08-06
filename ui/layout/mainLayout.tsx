import Navbar from "../navigation/navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full min-h-screen h-full bg-white">
      <Navbar />
      {children}
    </main>
  );
}
