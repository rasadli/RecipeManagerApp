import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Change Router to BrowserRouter
import Navbar from './components/Navbar';
import Home from './components/Home';
import RecipeList from './components/RecipeList';
import Contact from './components/Contact';

const App = () => {
    return (
        <Router> {/* BrowserRouter is used here */}
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/recipes" element={<RecipeList />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </Router>
    );
};

export default App;
