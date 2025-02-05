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
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px", border: "1px solid #ddd", borderRadius: "10px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>View Products</h2>

            {loading ? (
                <p>Loading products...</p>
            ) : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ backgroundColor: "#f8f9fa", textAlign: "left" }}>
                            <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>ID</th>
                            <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>Product Name</th>
                            <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>Type</th>
                            <th style={{ padding: "10px", borderBottom: "2px solid #ddd" }}>Colours</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={product.id} style={{ backgroundColor: index % 2 === 0 ? "#ffffff" : "#f2f2f2" }}>
                                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{product.id}</td>
                                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{product.name}</td>
                                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{product.productType}</td>
                                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                                    {Array.isArray(product.colours) && product.colours.length > 0
                                        ? product.colours.join(", ")
                                        : "No Colours"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );

};

export default ProductList;
