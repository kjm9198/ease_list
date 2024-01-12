import React from 'react';
import './App.css';

function GroceryList() {
  // Sample data for testing
  const groceryData = [
    { id: 1, name: 'Apples', quantity: 5, price: 10.0, createdAt: '2023-01-01' },
    { id: 2, name: 'Bread', quantity: 2, price: 4.5, createdAt: '2023-01-02' },
    { id: 3, name: 'Milk', quantity: 1, price: 2.2, createdAt: '2023-01-03' },
  ];

  const deleteRow = (id) => {
    // Add logic to delete the row based on the provided ID
    console.log(`Deleting row with ID ${id}`);
  };

  const addGrocery = () => {
    // Add logic to add a new grocery item
    console.log('Adding new grocery');
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
