// src/App.js
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import KanbanBoard from './components/KanbanBoard';
import './index.css';

function App() {
    const [groupBy, setGroupBy] = useState('status');
    const [sortBy, setSortBy] = useState('priority');

    return (
        <div className="App">
            <Navbar setGroupBy={setGroupBy} setSortBy={setSortBy} />
            <KanbanBoard groupBy={groupBy} sortBy={sortBy} />
        </div>
    );
}

export default App;
