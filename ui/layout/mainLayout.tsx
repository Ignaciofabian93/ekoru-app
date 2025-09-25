import Footer from "../footer/footer";
import ProductModal from "../modals/product";
import Navbar from "../navigation/navbar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full min-h-screen h-full bg-white dark:bg-background-dark transition-colors duration-300">
      <Navbar />
      <ProductModal />
      {children}
      <Footer />
    </main>
  );
}
