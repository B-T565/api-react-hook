import { useLocation } from "react-router-dom";
import ProductDetailCard from "../../Components/common/cards/ProductDetailCard";

export default function ProductDetails() {
    const location = useLocation();
    const product = location.state;

    if (!product || !product.images) {
        return <div>Loading...</div>;
    }

    return (
        <section className="flex justify-center items-center h-[95vh]">
            <ProductDetailCard 
                image={product.images[0]}
                title={product.title}
                description={product.description}
                price={product.price}
            />
        </section>
    );

}
