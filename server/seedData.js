const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database("./mydatabase.db", sqlite3.OPEN_READWRITE, (err) => {
    if(err) return console.error(err)
});


// Create a 'groceries' table if it doesn't exist
const sql = `
    CREATE TABLE IF NOT EXISTS groceries (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        price REAL NOT NULL,
        created_at DATE NOT NULL
    )
`;

db.run(sqlite3)



// db.run(createTableQuery, (err) => {
//     if (err) {
//         console.error('Error creating table:', err);
//     } else {
//         console.log('Table created or already exists!');
//     }
//
//     // Insert 10 samples of grocery data
//     const sampleData = Array.from({ length: 10 }, (_, index) => ({
//         name: `Item ${index + 1}`,
//         quantity: Math.floor(Math.random() * 30) + 1,
//         price: (Math.random() * 10).toFixed(2),
//         created_at: '2023-01-01', // You can use the current date logic here if needed
//     }));
//
//     const insertQuery = 'INSERT INTO groceries (name, quantity, price, created_at) VALUES (?, ?, ?, ?)';
//
//     sampleData.forEach((item) => {
//         db.run(insertQuery, [item.name, item.quantity, item.price, item.created_at], (err) => {
//             if (err) {
//                 console.error('Error inserting sample data:', err);
//             }
//         });
//     });
//
//     console.log('Sample data inserted!');
// });
//
// db.close();
