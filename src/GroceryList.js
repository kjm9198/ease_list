import React, { useState, useEffect } from 'react';
import './GroceryList.css';
function GroceryList() {
    // Sample data for testing
    const [loggedIn, setLoggedIn] = useState(false);
    const [groceryData, setGroceryData] = useState([]);

    useEffect(() => {
        // Placeholder for checking login status
        // Replace this with your actual logic (e.g., checking a user session)
        // For now, assume the user is already logged in
        setLoggedIn(true);
    }, []);

    useEffect(() => {
        // Fetch data from the server only if logged in
        if (loggedIn) {
            fetch('/api/groceries')
                .then((response) => response.json())
                .then((data) => {
                    console.log('Fetched data:', data);
                    setGroceryData(data);
                })
                .catch((error) => console.error('Error fetching groceries:', error));
        }
    }, [loggedIn]);

    const deleteRow = (id) => {
        const updatedGroceryData = groceryData.filter(item => item.id !== id);
        setGroceryData(updatedGroceryData);

        console.log(`Deleting row with ID ${id}`);
    };

    const addGrocery = () => {
        // Step 1: Capture input values
        const groceryName = document.getElementById('groceryName').value;
        const quantity = document.getElementById('quantity').value;
        const estimatedPrice = document.getElementById('estimatedPrice').value;

        // Step 2: Validate input data
        if (!groceryName || !quantity || !estimatedPrice) {
            console.error('Please fill in all fields.');
            return;
        }

        // Step 3: Send request to the server
        fetch('/api/groceries', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: groceryName,
                quantity: parseInt(quantity),
                price: parseFloat(estimatedPrice),
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                // Step 4: Handle server response
                console.log('New grocery added:', data);

                // Assuming your groceryData is a state variable, update it with the new item
                setGroceryData((prevData) => [...prevData, data]);

                // Clear the form after successful addition
                document.getElementById('groceryName').value = '';
                document.getElementById('quantity').value = '';
                document.getElementById('estimatedPrice').value = '';
            })
            .catch((error) => {
                console.error('Error adding new grocery:', error);
            });
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
                            <th>Estimated Price</th>
                            <th>Created At</th>
                            <th>Erase</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/* Rendering the sample data */}
                        {groceryData.map((item) => (
                            <tr key={item.id}>
                                <td><input type="checkbox" name="itemCheck" /></td>
                                <td hidden><input type="hidden" name="itemID" value={item.id} /></td>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>${item.price.toFixed(2)}</td>
                                <td>{item.createdAt}</td>
                                <td><button type="button" onClick={() => deleteRow(item.id)}>Delete</button></td>
                            </tr>
                        ))}
                        </tbody>
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
                        <input type="text" id="estimatedPrice" name="estimatedPrice" required />

                        <button type="button" onClick={addGrocery}>Add Grocery</button>
                    </form>
                </section>
            </main>

            <div className="notification-bell">&#128276;</div>
        </div>
    );
}

export default GroceryList;
