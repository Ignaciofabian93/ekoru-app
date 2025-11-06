import {
  Dam,
  Flower2,
  HousePlug,
  Leaf,
  LeafyGreen,
  Recycle,
  ShieldCheck,
  Sun,
  Tent,
  Tractor,
  TreeDeciduous,
  Trees,
  UtilityPole,
  Vegan,
} from "lucide-react";

export const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "ShieldCheck":
      return ShieldCheck;
    case "Recycle":
      return Recycle;
    case "TreeDeciduous":
      return TreeDeciduous;
    case "HousePlug":
      return HousePlug;
    case "Leaf":
      return Leaf;
    case "UtilityPole":
      return UtilityPole;
    case "LeafyGreen":
      return LeafyGreen;
    case "Trees":
      return Trees;
    case "Dam":
      return Dam;
    case "Tent":
      return Tent;
    case "Flower2":
      return Flower2;
    case "Tractor":
      return Tractor;
    case "Sun":
      return Sun;
    case "Vegan":
      return Vegan;
    default:
      return ShieldCheck;
  }
};
