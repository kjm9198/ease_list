import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import GroceryList from "./GroceryList";
import Login from "./Login";
import Register from "./Register";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <div>
        <header>
          <nav>
            {loggedIn ? (
              <>
                <li>
                  <Link to="/grocery">Grocery List</Link>
                </li>
                <li>
                  <Link to="/login">Logout</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/register">Register</Link>
                </li>
                <li>
                  <Link to="/guest">Guest</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </>
            )}
          </nav>
        </header>

        <main>
          <Routes>
            <Route
              path="/grocery-list"
              element={loggedIn ? <GroceryList /> : <Navigate to="/login" />}
            />

            <Route
              path="/login"
              element={
                loggedIn ? (
                  <Navigate to="/grocery-list" />
                ) : (
                  <Login setLoggedIn={setLoggedIn} />
                )
              }
            />
            {/* Add a route for registration */}
            <Route
              path="/register"
              element={
                loggedIn ? <Navigate to="/grocery-list" /> : <Register />
              }
            />
            {/* Add a route for guest access */}
            <Route
              path="/guest"
              element={
                loggedIn ? <Navigate to="/grocery-list" /> : <GroceryList />
              }
            />
            <Route path="/*" element={<Navigate to="/login" />} />
          </Routes>
        </main>

        <div className="notification-bell">&#128276;</div>
      </div>
    </Router>
  );
}

export default App;
