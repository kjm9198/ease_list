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
                {/* Add a link for logging out */}
                <li>
                  <Link to="/login">Logout</Link>
                </li>
              </>
            ) : (
              <>
                {/* Add a link for registration */}
                <li>
                  <Link to="/register">Register</Link>
                </li>
                {/* Add a link for guest access */}
                <li>
                  <Link to="/guest">Guest</Link>
                </li>
                {/* Add a link for login */}
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
              path="/grocery"
              element={loggedIn ? <GroceryList /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={
                loggedIn ? (
                  <Navigate to="/grocery" />
                ) : (
                  <Login setLoggedIn={setLoggedIn} />
                )
              }
            />
            {/* Add a route for registration */}
            <Route
              path="/register"
              element={loggedIn ? <Navigate to="/grocery" /> : <Register />}
            />
            {/* Add a route for guest access */}
            <Route
              path="/guest"
              element={loggedIn ? <Navigate to="/grocery" /> : <GroceryList />}
            />
          </Routes>
        </main>

        <div className="notification-bell">&#128276;</div>
      </div>
    </Router>
  );
}

export default App;
