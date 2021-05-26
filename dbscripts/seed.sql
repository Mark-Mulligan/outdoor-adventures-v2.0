Drop Database IF exists outdoor_adventures_db;
CREATE DATABASE outdoor_adventures_db;

USE outdoor_adventures_db;

CREATE TABLE users (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE,
    google_id VARCHAR(255) UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE parks (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(255),
    parkcode VARCHAR(10),
    states VARCHAR(255),
    designation VARCHAR(255)
)