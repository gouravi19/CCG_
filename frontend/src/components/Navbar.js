// Navbar.jsx
import { Link } from "react-router-dom";
import "./styles/navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">CGG</div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/contact-details">Contact Details</Link>
      </div>
    </nav>
  );
}