import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import GroceryList from "./GroceryList";
import Login from "./Login";
import Register from "./Register";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user] = useState(null);

  return (
    <Router>
      <div>
        <header>
          <nav>
            {loggedIn ? (
              <>
                <li>
                  <Link to="/grocery-list">Grocery List</Link>
                </li>
                <li>
                  <Link to="/login">Logout</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/portal">Portal</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </nav>
        </header>

        <main>
          <Routes>
            <Route
              path="/grocery-list"
              element={
                loggedIn ? (
                  <GroceryList user={user} />
                ) : (
                  <Navigate to="/login" />
                )
              }
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
            <Route
              path="/register"
              element={
                loggedIn ? <Navigate to="/grocery-list" /> : <Register />
              }
            />
            <Route
              path="/portal"
              element={
                loggedIn ? (
                  <Navigate to="/grocery-list" />
                ) : (
                  <GroceryList user={user} />
                )
              }
            />
            <Route path="/*" element={<Navigate to="/login" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
