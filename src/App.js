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


// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
// import Login from './Login';
// import GroceryList from './GroceryList';
//
// function App() {
//     const [isLoggedIn, setLoggedIn] = useState(false);
//
//     const handleLogin = () => {
//         // Add your login logic here, and set isLoggedIn to true if login is successful
//         setLoggedIn(true);
//     };
//
//     return (
//         <Router>
//             <div>
//                 <header>
//                     <h1>EaseList</h1>
//                 </header>
//                 <main>
//                     <Routes>
//                         <Route path="/login">
//                             {isLoggedIn ? <Navigate to="/grocery-list" /> : <Login onLogin={handleLogin} />}
//                         </Route>
//                         <Route path="/grocery-list">
//                             {isLoggedIn ? <GroceryList /> : <Navigate to="/login" />}
//                         </Route>
//                         <Navigate from="/" to="/login" />
//                     </Routes>
//                 </main>
//                 <div className="notification-bell">&#128276;</div>
//             </div>
//         </Router>
//     );
// }
//
// export default App;
