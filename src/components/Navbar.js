// src/components/Navbar.js
import React, { useState } from 'react';
import './Navbar.css';
import displayIcon from '../assets/display.svg';
import downIcon from '../assets/down.svg';

function Navbar({ setGroupBy, setSortBy }) {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <img src={displayIcon} alt="Display" className="icon" />
                <button onClick={() => setShowDropdown(!showDropdown)}>
                    Display <img src={downIcon} alt="Dropdown" />
                </button>
                {showDropdown && (
                    <div className="dropdown">
                        <div className="dropdown-group">
                            <span>Group By</span>
                            <button onClick={() => setGroupBy('status')}>Status</button>
                            <button onClick={() => setGroupBy('user')}>User</button>
                            <button onClick={() => setGroupBy('priority')}>Priority</button>
                        </div>
                        <div className="dropdown-sort">
                            <span>Sort By</span>
                            <button onClick={() => setSortBy('priority')}>Priority</button>
                            <button onClick={() => setSortBy('title')}>Title</button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
