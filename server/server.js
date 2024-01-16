const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const sqlite3 = require("sqlite3").verbose();

const groceriesDB = new sqlite3.Database(
  "grocerylist.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) return console.error(err);
    console.log("Connected to the grocerylist.db SQLite database");

    // Create the groceries table if it doesn't exist
    groceriesDB.run(
      `
      CREATE TABLE IF NOT EXISTS groceries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        name TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        price REAL NOT NULL,
        created_at DATE NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (user_id)
      );
    `,
      (tableCreateError) => {
        if (tableCreateError) {
          console.error("Error creating table:", tableCreateError);
        } else {
          console.log("Table 'groceries' created or already exists!");
        }
      },
    );
  },
);

const loginCredentialDB = new sqlite3.Database(
  "logincredential.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) return console.error(err);
    console.log("Connected to the logincredential.db SQLite database");

    // Create the users table if it doesn't exist
    loginCredentialDB.run(
      `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `,
      (tableCreateError) => {
        if (tableCreateError) {
          console.error("Error creating table:", tableCreateError);
        } else {
          console.log("Table 'users for login' created or already exists!");
        }
      },
    );
  },
);

app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "..", "build")));

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS groceries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        name TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        price REAL NOT NULL,
        created_at DATE NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id)
    );
`;

const createUserTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL
    );
`;
const sampleData = [
  {
    user_id: 1,
    name: "Apples",
    quantity: 21,
    price: 10.0,
    created_at: "2023-01-01",
  },
  {
    user_id: 1,
    name: "Bananas",
    quantity: 15,
    price: 8.5,
    created_at: "2023-01-02",
  },
  {
    user_id: 1,
    name: "Oranges",
    quantity: 18,
    price: 12.3,
    created_at: "2023-01-03",
  },
  {
    user_id: 1,
    name: "Grapes",
    quantity: 30,
    price: 15.0,
    created_at: "2023-01-04",
  },
  {
    user_id: 1,
    name: "Strawberries",
    quantity: 12,
    price: 7.5,
    created_at: "2023-01-05",
  },
  {
    user_id: 1,
    name: "Watermelon",
    quantity: 1,
    price: 25.0,
    created_at: "2023-01-06",
  },
  {
    user_id: 1,
    name: "Pineapple",
    quantity: 2,
    price: 9.0,
    created_at: "2023-01-07",
  },
  {
    user_id: 1,
    name: "Blueberries",
    quantity: 10,
    price: 5.0,
    created_at: "2023-01-08",
  },
  {
    user_id: 1,
    name: "Mango",
    quantity: 5,
    price: 6.5,
    created_at: "2023-01-09",
  },
  {
    user_id: 1,
    name: "Peaches",
    quantity: 8,
    price: 11.0,
    created_at: "2023-01-10",
  },
  {
    user_id: 1,
    name: "Cherries",
    quantity: 25,
    price: 18.0,
    created_at: "2023-01-11",
  },
  {
    user_id: 1,
    name: "Kiwi",
    quantity: 7,
    price: 7.8,
    created_at: "2023-01-12",
  },
  {
    user_id: 1,
    name: "Plums",
    quantity: 9,
    price: 8.2,
    created_at: "2023-01-13",
  },
  {
    user_id: 1,
    name: "Raspberries",
    quantity: 15,
    price: 9.5,
    created_at: "2023-01-14",
  },
  {
    user_id: 1,
    name: "Blackberries",
    quantity: 20,
    price: 11.0,
    created_at: "2023-01-15",
  },
];

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM users WHERE username = ? AND password = ?";

  loginCredentialDB.get(query, [username, password], (err, user) => {
    if (err) {
      console.error("Error during login:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else if (!user) {
      res.status(401).json({ error: "Invalid username or password" });
    } else {
      res
        .status(200)
        .json({ success: true, message: "Login successful", user_id: user.id });
    }
  });
});

// Sample data for users
const sampleUsers = [
  // { username: "user1", password: "password1" },
];
loginCredentialDB.run(createUserTableQuery, (err) => {
  if (err) {
    console.error("Error creating users table:", err);
  } else {
    console.log("Insertion of the sample data for logincredential works!");

    // Insert sample user data after creating the 'users' table
    sampleUsers.forEach((user) => {
      const insertUserQuery =
        "INSERT INTO users (username, password) VALUES (?, ?)";
      loginCredentialDB.run(
        insertUserQuery,
        [user.username, user.password],
        (err) => {
          if (err) {
            console.error("Error inserting sample user:", err);
          }
        },
      );
    });
  }
});

groceriesDB.run(createTableQuery, (err) => {
  if (err) {
    console.error("Error creating groceries table:", err);
  } else {
    console.log("Table 'groceries' created or already exists!");

    // Insert sample data after creating the 'groceries' table
    sampleData.forEach((item) => {
      const insertSampleDataQuery =
        "INSERT INTO groceries (user_id, name, quantity, price, created_at) VALUES (?, ?, ?, ?, ?)";
      groceriesDB.run(
        insertSampleDataQuery,
        [item.user_id, item.name, item.quantity, item.price, item.created_at],
        (err) => {
          if (err) {
            console.error("Error inserting sample data:", err);
          }
        },
      );
    });
  }
});

groceriesDB.run(createUserTableQuery, (err) => {
  if (err) {
    console.error("Error creating users table:", err);
  } else {
    console.log("Insertion of the sample data for grocerylist.db works!");
  }
});

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, "..", "build")));

// Add a new endpoint for updating data
app.post("/api/groceries", (req, res) => {
  const { user_id, name, quantity, price } = req.body;

  // Validate input
  if (!user_id || !name || !quantity || !price) {
    return res
      .status(400)
      .json({ error: "Please provide all required fields." });
  }
  const createdAt = new Date().toISOString().split("T")[0]; // Get today's date

  const insertQuery =
    "INSERT INTO groceries (user_id, name, quantity, price, created_at) VALUES (?, ?, ?, ?, ?)";

  groceriesDB.run(
    insertQuery,
    [user_id, name, quantity, price, createdAt],
    function (err) {
      if (err) {
        console.error("Error adding new grocery:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      // Get the inserted item's ID
      const insertedId = this.lastID;

      // Retrieve the inserted item from the database
      const selectQuery = "SELECT * FROM groceries WHERE id = ?";

      groceriesDB.get(selectQuery, [insertedId], (err, result) => {
        if (err) {
          console.error("Error retrieving new grocery:", err);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        res.status(201).json(result);
      });
    },
  );
});
app.post("/api/registration", (req, res) => {
  const { username, password } = req.body;

  const insertUserQuery =
    "INSERT INTO users (username, password) VALUES (?, ?)";
  loginCredentialDB.run(insertUserQuery, [username, password], (err) => {
    if (err) {
      console.error("Error creating new user:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res
        .status(201)
        .json({ success: true, message: "User created successfully" });
    }
  });
});
app.post("/api/groceries", (req, res) => {
  const { user_id, name, quantity, price } = req.body;

  // Validate input
  if (!user_id || !name || !quantity || !price) {
    return res
      .status(400)
      .json({ error: "Please provide all required fields." });
  }

  const createdAt = new Date().toISOString().split("T")[0]; // Get today's date

  const insertQuery =
    "INSERT INTO groceries (user_id, name, quantity, price, created_at) VALUES (?, ?, ?, ?, ?)";

  groceriesDB.run(
    insertQuery,
    [user_id, name, quantity, price, createdAt],
    function (err) {
      if (err) {
        console.error("Error adding new grocery:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      // Get the inserted item's ID
      const insertedId = this.lastID;

      // Retrieve the inserted item from the database
      const selectQuery = "SELECT * FROM groceries WHERE id = ?";

      groceriesDB.get(selectQuery, [insertedId], (err, result) => {
        if (err) {
          console.error("Error retrieving new grocery:", err);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        res.status(201).json(result);
      });
    },
  );
});
// app.get("/api/groceries/:user_id", (req, res) => {
//   const user_id = req.params.user_id;
//   const query = "SELECT * FROM groceries WHERE user_id = ?";
//
//   groceriesDB.all(query, [user_id], (err, results) => {
//     if (err) {
//       console.error("Error executing SQLite query:", err);
//       res.status(500).json({ error: "Internal Server Error" });
//     } else {
//       res.json(results);
//     }
//   });
// });

app.get("/api/groceries", (req, res) => {
  const query = "SELECT * FROM groceries";

  groceriesDB.all(query, (err, results) => {
    if (err) {
      console.error("Error executing SQLite query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

app.delete("/api/groceries/:id", (req, res) => {
  const id = req.params.id;

  const deleteQuery = "DELETE FROM groceries WHERE id = ?";

  groceriesDB.run(deleteQuery, [id], (err) => {
    if (err) {
      console.error("Error deleting grocery:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    res.json({ success: true });
  });
});

app.delete("/api/groceries", (req, res) => {
  const deleteAllQuery = "DELETE FROM groceries";

  groceriesDB.run(deleteAllQuery, (err) => {
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

// TODO: delete the mydatabase2.db as well as sqlite3.exe
