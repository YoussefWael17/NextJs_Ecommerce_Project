import { ProductCardUI } from "./product";

export default interface ProductCardProps {
  product: ProductCardUI;
  isAdded: boolean,
  onRemove?: () => void;
}