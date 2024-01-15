import React, { useState, useEffect } from "react";
import "./GroceryList.css";

function GroceryList() {
  // Sample data for testing
  const [expiryDateError, setExpiryDateError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [groceryData, setGroceryData] = useState([
    {
      id: 1,
      name: "Sample Grocery 1",
      quantity: 3,
      price: 5.99,
      created_at: "2023-01-15",
    },
    {
      id: 2,
      name: "Sample Grocery 2",
      quantity: 1,
      price: 2.5,
      created_at: "2023-01-16",
    },
  ]);
  useEffect(() => {
    // Placeholder for checking login status
    setLoggedIn(true);

    // Fetch data from the server only if logged in
    if (loggedIn) {
      // Update the URL to match your server configuration
      fetch("http://localhost:3001/api/groceries")
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched data:", data);
          setGroceryData(data);
        })
        .catch((error) => console.error("Error fetching groceries:", error));
    }
  }, [loggedIn]);

  const deleteRow = (id) => {
    // Send a request to the server to delete the grocery item
    fetch(`http://localhost:3001/api/groceries/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to delete grocery: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Grocery deleted:", data);

        const updatedGroceryData = groceryData.filter((item) => item.id !== id);
        setGroceryData(updatedGroceryData);
      })
      .catch((error) => console.error("Error deleting grocery:", error));
  };
  const deleteAllRows = () => {
    fetch("http://localhost:3001/api/groceries", {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to delete all groceries: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("All the groceries deleted:", data);
        setGroceryData([]);
      })
      .catch((error) =>
        console.log("Error in deleting all the groceries:", error),
      );
  };

  const addGrocery = () => {
    // Step 1: Capture input values
    const groceryName = document.getElementById("groceryName").value;
    const quantity = document.getElementById("quantity").value;
    const estimatedPrice = document.getElementById("estimatedPrice").value;

    // Step 2: Validate input data
    if (!groceryName || !quantity || !estimatedPrice) {
      console.error("Please fill in all fields.");
      return;
    }
    // Log input values for debugging
    console.log("Input values:", {
      groceryName,
      quantity,
      estimatedPrice,
    });

    // Step 3: Send request to the server
    fetch("http://localhost:3001/api/groceries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: groceryName,
        quantity: parseInt(quantity),
        price: parseFloat(estimatedPrice),
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to add grocery: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        // Step 4: Handle server response
        console.log("New grocery added:", data);
        setGroceryData((prevData) => [...prevData, data]);

        // Reset form values
        document.getElementById("groceryName").value = "";
        document.getElementById("quantity").value = "";
        document.getElementById("estimatedPrice").value = "";
      })
      .catch((error) => {
        console.error("Error adding new grocery:", error);
      });
  };

  const renderRows = () => {
    return (
      <>
        {groceryData.map((item) => (
          <tr key={item.id}>
            <td>
              <input type="checkbox" name="itemCheck" />
            </td>
            <td hidden>
              <input type="hidden" name="itemID" value={item.id} />
            </td>
            <td>{item.name}</td>
            <td>{item.quantity}</td>
            <td>${item.price.toFixed(2)}</td>
            <td>{item.created_at}</td>
            <td>
              <button type="button" onClick={() => deleteRow(item.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
        <tr>
          <td colSpan="7" style={{ textAlign: "center" }}>
            <button type="button" onClick={deleteAllRows}>
              Delete All
            </button>
          </td>
        </tr>
      </>
    );
  };

  return (
    <div>
      <header>
        <h1>EaseList</h1>
      </header>
      <main>
        <section>
          <h2>Your Groceries</h2>
          <table>
            <thead>
              <tr>
                <th>Status</th>
                <th hidden>ID</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Created At</th>
                <th>Erase</th>
              </tr>
            </thead>
            <tbody>{renderRows()}</tbody>
          </table>
        </section>

        <section>
          <h2>Add New Grocery</h2>
          <form>
            <label htmlFor="groceryName">Name:</label>
            <input type="text" id="groceryName" name="groceryName" required />

            <label htmlFor="quantity">Quantity:</label>
            <input type="number" id="quantity" name="quantity" required />

            <label htmlFor="estimatedPrice">Estimated Price:</label>
            <input
              type="text"
              id="estimatedPrice"
              name="estimatedPrice"
              required
            />

            <button type="button" onClick={addGrocery}>
              Add Grocery
            </button>
          </form>
        </section>
      </main>

      <div className="notification-bell">&#128276;</div>
    </div>
  );
}

export default GroceryList;
