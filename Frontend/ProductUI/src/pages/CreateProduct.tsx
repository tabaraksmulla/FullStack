import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";

// Define interfaces
interface ProductType {
    id: number;
    name: string;
}

interface Colour {
    id: number;
    name: string;
}

// Define form data structure
interface ProductFormData {
    name: string;
    productTypeId: number;
    colourIds: number[];
}

const CreateProduct: React.FC = () => {
    const { register, handleSubmit, reset } = useForm<ProductFormData>();
    const [productTypes, setProductTypes] = useState<ProductType[]>([]);
    const [colours, setColours] = useState<Colour[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Fetch product types and colours
        Promise.all([
            axios.get("https://localhost:7289/api/producttypes"),
            axios.get("https://localhost:7289/api/colours"),
        ])
            .then(([productTypeRes, colourRes]) => {
                console.log("API Response - Product Types:", productTypeRes.data);
                console.log("API Response - Colours:", colourRes.data);
                setProductTypes(productTypeRes.data);

                setProductTypes(productTypeRes.data);
                setColours(colourRes.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, []);

    const onSubmit: SubmitHandler<ProductFormData> = async (data) => {
        const productData = {
            name: data.name,
            productTypeId: Number(data.productTypeId),
            colourIds: data.colourIds.map(Number),
        };

        try {
            await axios.post("https://localhost:7289/api/products", productData);
            alert("Product Created Successfully!");
            reset();
        } catch (error) {
            console.error("Error creating product:", error);
            alert("Failed to create product.");
        }
    };

    if (loading) return <p>Loading form data...</p>;

    return (
        <div>
            <h2>Create a New Product</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Product Name:</label>
                    <input {...register("name", { required: true })} />
                </div>

                <div>
                    <label>Product Type:</label>
                    <select {...register("productTypeId", { required: true })}>
                        <option value="">Select a Type</option>
                        {productTypes.map((type) => (
                            <option key={type.id} value={type.id}>
                                {type.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Colours:</label>
                    <select {...register("colourIds", { required: true })} multiple>
                        {colours.map((colour) => (
                            <option key={colour.id} value={colour.id}>
                                {colour.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit">Create Product</button>
            </form>
        </div>
    );
};

export default CreateProduct;
