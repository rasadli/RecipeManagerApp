import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li className="navbar-item"><Link to="/" className="navbar-link">Home</Link></li>
                <li className="navbar-item"><Link to="/recipes" className="navbar-link">Recipes</Link></li>
                <li className="navbar-item"><Link to="/contact" className="navbar-link">Contact Me</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
