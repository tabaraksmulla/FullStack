import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductList from "./pages/ProductList";
import CreateProduct from "./pages/CreateProduct";

const App: React.FC = () => {
    return (
        <Router>
            <div style={{ padding: "20px" }}>
                <nav>
                    <Link to="/" style={{ marginRight: "10px" }}>View Products</Link>
                    <Link to="/create">Create Product</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/create" element={<CreateProduct />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
