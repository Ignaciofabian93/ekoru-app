import Footer from "../footer/footer";
import ProductModal from "../modals/product";
import Navbar from "../navigation/navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full min-h-screen h-full bg-white">
      <Navbar />
      <ProductModal />
      {children}
      <Footer />
    </main>
  );
}
