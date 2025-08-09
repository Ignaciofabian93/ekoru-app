import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardImageCarousel,
} from "./index";
import MainButton from "../../buttons/mainButton";
import { ShoppingCart, Heart } from "lucide-react";

type ProductCardProps = {
  title: string;
  description: string;
  price: number;
  images: Array<{ src: string; alt: string }>;
  onAddToCart?: () => void;
  onToggleFavorite?: () => void;
  isFavorite?: boolean;
};

export default function ProductCard({
  title,
  description,
  price,
  images,
  onAddToCart,
  onToggleFavorite,
  isFavorite = false,
}: ProductCardProps) {
  return (
    <Card className="max-w-sm">
      {/* Product Images */}
      <CardImageCarousel images={images} aspectRatio="square" />

      {/* Product Info */}
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-lime-600">
            ${price.toLocaleString("es-CL")}
          </span>
          <button
            onClick={onToggleFavorite}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
              }`}
            />
          </button>
        </div>
      </CardContent>

      {/* CTA Section */}
      <CardFooter>
        <MainButton
          text="Add to Cart"
          variant="primary"
          icon={ShoppingCart}
          onClick={onAddToCart}
        />
      </CardFooter>
    </Card>
  );
}
