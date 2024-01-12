const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 5000; // Choose a port number

// Create a MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'your_mysql_username',
    password: 'your_mysql_password',
    database: 'your_database_name',
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL!');
    }
});

// Define your API endpoints here

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Example endpoint to fetch data from a 'users' table
app.get('/api/users', (req, res) => {
    const query = 'SELECT * FROM users';

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(results);
        }
    });
});
