import { ShoppingCart } from "lucide-react";

type Props = {
  onClick: () => void;
};

export default function ShoppingCartButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      aria-label="Agregar al carrito"
      className="bg-primary hover:bg-primary/90 text-white p-2 rounded-md shadow-lg transition-all duration-200"
    >
      <ShoppingCart className="w-5 h-5" />
    </button>
  );
}
