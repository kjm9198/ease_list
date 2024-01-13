// App.js
import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import GroceryList from './GroceryList';
import Login from './Login';

function App() {
    return (
        <Router>
            <div>
                <header>
                    <h1>EaseList</h1>
                    <nav>

                        <li>
                            <Link to="/grocery">Grocery List</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    </nav>
                </header>

                <main>
                    <Routes>
                        <Route path="/grocery" element={<GroceryList/>}/>
                        <Route path="/login" element={<Login/>}/>
                    </Routes>
                </main>

                <div className="notification-bell">&#128276;</div>
            </div>
        </Router>
    );
}

export default App;
