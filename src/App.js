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

function App() {
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <Router>
      <div>
        <header>
          <nav>
            {loggedIn ? (
              <li>
                <Link to="/grocery">Grocery List</Link>
              </li>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
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
          </Routes>
        </main>

        <div className="notification-bell">&#128276;</div>
      </div>
    </Router>
  );
}

export default App;
