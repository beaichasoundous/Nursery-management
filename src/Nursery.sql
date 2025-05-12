-- Create the database
CREATE DATABASE IF NOT EXISTS nursery_db;
USE nursery_db;

-- Table: users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role ENUM('parent', 'admin') NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO users (full_name) VALUES ('Rose');
INSERT INTO users (full_name) VALUES ('Tulip');

SELECT * FROM users;

-- Table: children
CREATE TABLE children (
    id INT AUTO_INCREMENT PRIMARY KEY,
    parent_id INT NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    date_of_birth DATE,
    gender ENUM('male', 'female'),
    medical_info TEXT,
    uploaded_file_path VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Table: payments
CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    parent_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_date DATE NOT NULL,
    period ENUM('monthly', '3 months') NOT NULL,
    next_due_date DATE NOT NULL,
    status ENUM('paid', 'pending', 'failed') DEFAULT 'pending',
    FOREIGN KEY (parent_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Table: messages
CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    message TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id),
    FOREIGN KEY (receiver_id) REFERENCES users(id)
);

-- Table: programs
CREATE TABLE programs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    age_group VARCHAR(50),
    schedule TEXT
);

-- Table: events
CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    location VARCHAR(255)
);

-- Table: reminders
CREATE TABLE reminders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    type ENUM('payment_due', 'account_expiry'),
    message TEXT NOT NULL,
    scheduled_for DATE NOT NULL,
    sent BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Table: admin_actions
CREATE TABLE admin_actions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    admin_id INT NOT NULL,
    action_type ENUM('approve', 'reject', 'delete') NOT NULL,
    target_user_id INT,
    target_child_id INT,
    reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES users(id),
    FOREIGN KEY (target_user_id) REFERENCES users(id),
    FOREIGN KEY (target_child_id) REFERENCES children(id)
);

