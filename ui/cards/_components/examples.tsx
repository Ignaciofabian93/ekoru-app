import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardImage,
  CardImageCarousel,
} from "./index";
import MainButton from "../../buttons/mainButton";
import { Download, Eye, Share2, Star } from "lucide-react";

// Example usage of the card components

// Simple Card with single image
export function SimpleCard() {
  return (
    <Card className="max-w-md">
      <CardImage
        src="/example-image.jpg"
        alt="Example"
        className="aspect-video"
      />
      <CardHeader>
        <CardTitle>Simple Card</CardTitle>
        <CardDescription>
          This is a simple card with a single image and basic content.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <MainButton text="View Details" variant="outline" icon={Eye} />
      </CardFooter>
    </Card>
  );
}

// Card with carousel
export function CarouselCard() {
  const images = [
    { src: "/image1.jpg", alt: "Image 1" },
    { src: "/image2.jpg", alt: "Image 2" },
    { src: "/image3.jpg", alt: "Image 3" },
  ];

  return (
    <Card className="max-w-md">
      <CardImageCarousel images={images} aspectRatio="video" />
      <CardHeader>
        <CardTitle>Gallery Card</CardTitle>
        <CardDescription>
          This card includes an image carousel with navigation controls.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-1 text-sm text-gray-600">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span>4.8 (124 reviews)</span>
        </div>
      </CardContent>
      <CardFooter className="space-y-2">
        <MainButton text="Download" variant="primary" icon={Download} />
        <MainButton text="Share" variant="ghost" icon={Share2} />
      </CardFooter>
    </Card>
  );
}

// Content-only card (no image)
export function ContentCard() {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Content Only Card</CardTitle>
        <CardDescription>
          Sometimes you don&apos;t need images - just great content and a clear
          call to action.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm text-gray-600">
          <p>✓ Feature one included</p>
          <p>✓ Feature two available</p>
          <p>✓ Premium support</p>
        </div>
      </CardContent>
      <CardFooter>
        <MainButton text="Get Started" variant="success" />
      </CardFooter>
    </Card>
  );
}

// Compact card
export function CompactCard() {
  return (
    <Card className="max-w-xs" hover={false}>
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-lime-100 rounded-full flex items-center justify-center">
            <Star className="w-6 h-6 text-lime-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">Quick Action</h4>
            <p className="text-sm text-gray-600">Compact design</p>
          </div>
          <MainButton
            text="Go"
            variant="primary"
            hasIcon={false}
            className="!w-auto !min-w-0 !px-3 !py-2"
          />
        </div>
      </CardContent>
    </Card>
  );
}
