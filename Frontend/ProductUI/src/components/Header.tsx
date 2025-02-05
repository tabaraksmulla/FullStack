import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
    return (
        <nav style={{ display: "flex", justifyContent: "center", gap: "20px", padding: "15px", backgroundColor: "#007bff" }}>
            <Link to="/" style={{ color: "#fff", textDecoration: "none", fontSize: "18px", fontWeight: "bold" }}>View Products</Link>
            <Link to="/create" style={{ color: "#fff", textDecoration: "none", fontSize: "18px", fontWeight: "bold" }}>Create Product</Link>
        </nav>
    );
};

export default Header;
