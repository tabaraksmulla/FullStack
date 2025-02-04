import React, { useState, useEffect } from "react";
import axios from "axios";

interface Product {
    id: number;
    name: string;
    productType: string;
    colours: { $values?: string[] };
}


const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        axios
            .get("https://localhost:7289/api/products")
            .then((response) => {
                console.log("API Response:", response.data);
                if (response.data.$values && response.data.$values.length > 0) {
                    console.log("First Product:", response.data.$values[0]);
                    console.log("Product Colours:", response.data.$values[0].colours);
                }
                const extractedProducts = response.data.$values ?? response.data;
                setProducts(extractedProducts);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading products...</p>;

    return (
        <div>
            <h2>Product List</h2>
            <table border={1} cellPadding={5}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Product Type</th>
                        <th>Colours</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.productType}</td>
                                <td>
                                    {product.colours && product.colours.length > 0
                                        ? product.colours.join(", ")
                                        : "No Colours"}
                                </td>

                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4}>No products found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
