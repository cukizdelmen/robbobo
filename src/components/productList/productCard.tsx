import Image from "next/image";
import Profile from "../../assets/profile.jpeg";
import "./productCard.css";
import { useData } from "@/Providers/dataProvider";

interface ProductCardProps {
  product: any;
  onEdit: (product: any) => void;
}

const ProductCard = ({ product, onEdit }: ProductCardProps) => {
  const { deleteProduct } = useData();

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(product.id);
        alert("Product deleted successfully!");
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product.");
      }
    }
  };

  return (
    <main className="cardSpace">
      <div className="imageWrapper">
        <Image
          className="productImage"
          src={product.image_url}
          alt={product.name}
          fill
          priority
          quality={100}
        />
      </div>
      <div className="CardContent">
        <div className="credentials">
          <div className="productTitle">{product.name}</div>
          <div className="description">
            {product.description.slice(0, 100)}
            {product.description.length > 100 ? "..." : ""}
          </div>
        </div>

        <div className="qty-price">
          <div className="price">₵{product.price}</div>
          <div className="stock">
            {product.Stock_Quantity > 0 ? "In-stock" : "Out of stock"}
          </div>
        </div>
        <div className="action">
          <button className=" btn remove" onClick={handleDelete}>
            Remove
          </button>
          <button className=" btn edit" onClick={onEdit}>
            Edit
          </button>
        </div>
        <div className="Category">{product.Category_id.Name}</div>
      </div>
    </main>
  );
};

export default ProductCard;
