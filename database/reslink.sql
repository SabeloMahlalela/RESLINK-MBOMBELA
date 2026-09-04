use reslink_db;

CREATE TABLE institutions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255)
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM(
        'student',
        'provider',
        'admin'
    ) DEFAULT 'student',
    institution_id INT,
    FOREIGN KEY (institution_id)
    REFERENCES institutions(id)
);

CREATE TABLE residences (
    id INT AUTO_INCREMENT PRIMARY KEY,
    institution_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    address TEXT,
    description TEXT,
    wifi BOOLEAN DEFAULT FALSE,
    security BOOLEAN DEFAULT FALSE,
    parking BOOLEAN DEFAULT FALSE,
    image_url TEXT,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    FOREIGN KEY (institution_id)
    REFERENCES institutions(id)
);

CREATE TABLE rooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    residence_id INT NOT NULL,
    room_number VARCHAR(20),
    room_type ENUM(
        'single',
        'shared'
    ),
    total_spaces INT,
    occupied_spaces INT DEFAULT 0,
    price DECIMAL(10,2),
    FOREIGN KEY (residence_id)
    REFERENCES residences(id)
);

CREATE TABLE applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    room_id INT NOT NULL,
    status ENUM(
        'pending',
        'approved',
        'rejected'
    ) DEFAULT 'pending',
    room_number VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id)
    REFERENCES users(id),
    FOREIGN KEY (room_id)
    REFERENCES rooms(id)
);

CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    residence_id INT NOT NULL,
    rating INT,
    comment TEXT,
    FOREIGN KEY (student_id)
    REFERENCES users(id),
    FOREIGN KEY (residence_id)
    REFERENCES residences(id)
);

-- This following queries insert values into tables

INSERT INTO institutions (name, address)
VALUES
('Rosebank International', 'Mbombela'),
('University of Mpumalanga', 'Mbombela'),
('Ehlanzeni TVET College', 'Mbombela');

INSERT INTO residences (
institution_id, name, address, wifi, security, parking
)
VALUES
(1, 'Stayhope Properties','Mbombela',
TRUE,
TRUE,
TRUE
),
(
1,'Campus Village','Mbombela',
TRUE,
TRUE,
FALSE
);

INSERT INTO rooms (
    residence_id,
    room_number,
    room_type,
    total_spaces,
    occupied_spaces,
    price
)
VALUES
(
    1,'A101','single', 1, 0, 4500
),
(
    1, 'B201', 'shared', 2, 1,3000
);
