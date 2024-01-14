const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors'); // Add this line

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'kjm9198',
    password: '123456',
    database: 'kjm',
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL!');
    }
});

// Create a 'groceries' table if it doesn't exist
const createTableQuery = `
    CREATE TABLE IF NOT EXISTS groceries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        quantity INT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        created_at DATE NOT NULL
    )
`;

connection.query(createTableQuery, (err) => {
    if (err) {
        console.error('Error creating table:', err);
    } else {
        console.log('Table created or already exists!');
    }
});

// Insert sample data
const sampleData = [
    { name: 'Apples', quantity: 21, price: 10.0, created_at: '2023-01-01' },
    { name: 'Bread', quantity: 2, price: 4.5, created_at: '2023-01-02' },
    { name: 'Milk', quantity: 1, price: 2.2, created_at: '2023-01-03' },
];

sampleData.forEach((item) => {
    const insertSampleDataQuery = 'INSERT INTO groceries (name, quantity, price, created_at) VALUES (?, ?, ?, ?)';
    connection.query(insertSampleDataQuery, [item.name, item.quantity, item.price, item.created_at], (err) => {
        if (err) {
            console.error('Error inserting sample data:', err);
        }
    });
});
// Endpoint to fetch all groceries
app.get('/api/groceries', (req, res) => {
    const query = 'SELECT * FROM groceries';

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(results);
        }
    });
});

app.post('/api/groceries', (req, res) => {
    const { name, quantity, price } = req.body;

    // Validate input
    if (!name || !quantity || !price) {
        return res.status(400).json({ error: 'Please provide all required fields.' });
    }

    const createdAt = new Date().toISOString().split('T')[0]; // Get today's date

    const insertQuery = 'INSERT INTO groceries (name, quantity, price, created_at) VALUES (?, ?, ?, ?)';

    connection.query(insertQuery, [name, quantity, price, createdAt], (err, result) => {
        if (err) {
            console.error('Error adding new grocery:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Get the inserted item's ID
        const insertedId = result.insertId;

        // Retrieve the inserted item from the database
        const selectQuery = 'SELECT * FROM groceries WHERE id = ?';

        connection.query(selectQuery, [insertedId], (err, results) => {
            if (err) {
                console.error('Error retrieving new grocery:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            const newGrocery = results[0];
            res.status(201).json(newGrocery); // Respond with the newly added grocery item
        });
    });
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
        return res.status(400).json({ error: 'Please provide both username and password.' });
    }

    const userQuery = 'SELECT * FROM users WHERE username = ? AND password = ?';

    connection.query(userQuery, [username, password], (err, results) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (results.length > 0) {
                // User found, return success
                res.json({ success: true });
            } else {
                // User not found or credentials are incorrect
                res.status(401).json({ error: 'Invalid username or password' });
            }
        }
    });
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
