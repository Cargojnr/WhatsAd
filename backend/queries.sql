CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    brandname VARCHAR(150),
    username VARCHAR(100) UNIQUE,
    phone VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(255),
    region VARCHAR(100),
    password TEXT NOT NULL,
    purpose VARCHAR(50) NOT NULL CHECK (purpose IN ('influencer', 'brand')),
    profile_picture TEXT,
    verified BOOLEAN DEFAULT FALSE,
    active_status BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE campaigns (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255),
    description TEXT,
    media TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE gigs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255),
    description TEXT,
    media TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


