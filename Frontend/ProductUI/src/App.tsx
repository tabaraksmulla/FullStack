import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductList";
import CreateProduct from "./pages/CreateProduct";
import Header from "./components/Header";

function App() {
    return (
        <Router>
            <Header />
            <div style={{ padding: "20px" }}>
                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/create" element={<CreateProduct />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
