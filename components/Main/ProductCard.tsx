import Image from "next/image";
import { Heart } from "lucide-react";
import { ProductWithStock } from "@/type/interFaces";


interface ProductCardProps {
    product: ProductWithStock;
    isInWishlist: boolean;
    onToggleWishlist: () => void; // <-- Add this line

}

const ProductCard = ({ product, isInWishlist, onToggleWishlist }: ProductCardProps) => {
    return (
        <article className="product-card" role="gridcell">
            <div className="product-image-container">
                {product.outOfStock && (
                    <div className="product-outofstock-overlay">OUT OF STOCK</div>
                )}
                <Image
                    src={product.image}
                    alt={`${product.title} - High quality product image`}
                    className="product-image"
                    loading="lazy"
                    width="180"
                    height="180"
                />
            </div>

            <div className="product-info">
                <h3 className="product-title font-sora" title={product.title}>
                    {product.title}
                </h3>
                <div className="product-subtitle">
                    <div className="product-pricing-msg font-sora">
                        <a
                            href="#"
                            style={{ textDecoration: "underline" }}
                            className="product-pricing-msg font-sora"
                        >
                            Sign in{" "}
                        </a>
                        or Create an account to see pricing
                    </div>
                    <button
                        className={`product-wishlist${isInWishlist ? " active" : ""}`}
                        aria-label={
                            isInWishlist ? "Remove from wishlist" : "Add to wishlist"
                        }
                        onClick={onToggleWishlist}
                    >
                        <Heart size={24} strokeWidth={2} />
                    </button>
                </div>
            </div>
        </article>
    );
};

export default ProductCard;