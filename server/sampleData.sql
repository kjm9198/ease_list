-- Use your_database_name;
-- Create the 'groceries' table
CREATE TABLE IF NOT EXISTS groceries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at DATE NOT NULL
);

-- Insert sample data
INSERT INTO groceries (name, quantity, price, created_at) VALUES
    ('Apples', 5, 10.0, '2023-01-01'),
    ('Bread', 2, 4.5, '2023-01-02'),
    ('Milk', 1, 2.2, '2023-01-03');
