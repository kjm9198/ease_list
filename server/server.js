const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(
  "mydatabase.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) return console.error(err);
    console.log("Connected to the mydatabase.db SQLite database");
  },
);

app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "..", "build")));

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS groceries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        price REAL NOT NULL,
        created_at DATE NOT NULL
    )
`;

const sampleData = [
  { name: "Apples", quantity: 21, price: 10.0, created_at: "2023-01-01" },
  { name: "Bread", quantity: 2, price: 4.5, created_at: "2023-01-02" },
  { name: "Milk", quantity: 1, price: 2.2, created_at: "2023-01-03" },
  { name: "Item 4", quantity: 5, price: 3.0, created_at: "2023-01-04" },
  { name: "Item 5", quantity: 8, price: 1.5, created_at: "2023-01-05" },
  { name: "Item 6", quantity: 3, price: 2.8, created_at: "2023-01-06" },
  { name: "Item 7", quantity: 10, price: 6.0, created_at: "2023-01-07" },
  { name: "Item 8", quantity: 4, price: 4.2, created_at: "2023-01-08" },
  { name: "Item 9", quantity: 7, price: 2.5, created_at: "2023-01-09" },
  { name: "Item 10", quantity: 2, price: 8.0, created_at: "2023-01-10" },
  { name: "Item 11", quantity: 4, price: 8.0, created_at: "2023-01-10" },
];

sampleData.forEach((item) => {
  const insertSampleDataQuery =
    "INSERT INTO groceries (name, quantity, price, created_at) VALUES (?, ?, ?, ?)";
  db.run(
    insertSampleDataQuery,
    [item.name, item.quantity, item.price, item.created_at],
    (err) => {
      if (err) {
        console.error("Error inserting sample data:", err);
      }
    },
  );
});

db.run(createTableQuery, (err) => {
  if (err) {
    console.error("Error creating table:", err);
  } else {
    console.log("Table created or already exists!");
  }
});

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, "..", "build")));

// Add a new endpoint for updating data
app.put("/api/groceries/:id", (req, res) => {
  const id = req.params.id;
  const { name, quantity, price } = req.body;

  // Validate input
  if (!name || !quantity || !price) {
    return res
      .status(400)
      .json({ error: "Please provide all required fields." });
  }

  const updateQuery =
    "UPDATE groceries SET name = ?, quantity = ?, price = ? WHERE id = ?";

  db.run(updateQuery, [name, quantity, price, id], (err) => {
    if (err) {
      console.error("Error updating grocery:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      // After updating, fetch the updated data to send back to the client
      const selectQuery = "SELECT * FROM groceries";

      db.all(selectQuery, (err, results) => {
        if (err) {
          console.error("Error executing SQLite query:", err);
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          res.json(results);
        }
      });
    }
  });
});

app.get("/api/groceries", (req, res) => {
  const query = "SELECT * FROM groceries";

  db.all(query, (err, results) => {
    if (err) {
      console.error("Error executing SQLite query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

// Endpoint to add a new grocery item
app.post("/api/groceries", (req, res) => {
  const { name, quantity, price } = req.body;

  // Validate input
  if (!name || !quantity || !price) {
    return res
      .status(400)
      .json({ error: "Please provide all required fields." });
  }

  const createdAt = new Date().toISOString().split("T")[0]; // Get today's date

  const insertQuery =
    "INSERT INTO groceries (name, quantity, price, created_at) VALUES (?, ?, ?, ?)";

  db.run(insertQuery, [name, quantity, price, createdAt], function (err) {
    if (err) {
      console.error("Error adding new grocery:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    // Get the inserted item's ID
    const insertedId = this.lastID;

    // Retrieve the inserted item from the database
    const selectQuery = "SELECT * FROM groceries WHERE id = ?";

    db.get(selectQuery, [insertedId], (err, result) => {
      if (err) {
        console.error("Error retrieving new grocery:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      res.status(201).json(result);
    });
  });
});

app.delete("/api/groceries/:id", (req, res) => {
  const id = req.params.id;

  const deleteQuery = "DELETE FROM groceries WHERE id = ?";

  db.run(deleteQuery, [id], (err) => {
    if (err) {
      console.error("Error deleting grocery:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    res.json({ success: true });
  });
});

app.delete("/api/groceries", (req, res) => {
  const deleteAllQuery = "DELETE FROM groceries";

  db.run(deleteAllQuery, (err) => {
    if (err) {
      console.error("Error deleting all groceries:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    res.json({ success: true, message: "All groceries deleted successfully." });
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
