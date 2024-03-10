DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS addresses;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS drugs;
DROP TABLE IF EXISTS drug_stock;
DROP TABLE IF EXISTS fenton;
DROP TABLE IF EXISTS hanley;
DROP TABLE IF EXISTS longton;
DROP TABLE IF EXISTS stoke;
DROP TABLE IF EXISTS tunstall;

CREATE TABLE roles
(
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) NOT NULL
);

CREATE TABLE users
(
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    emailAddress VARCHAR(50) NOT NULL UNIQUE,
    phoneNumber VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    roleId INTEGER NOT NULL,

    FOREIGN KEY (roleId) REFERENCES roles(id) ON DELETE CASCADE
);

CREATE TABLE addresses
(
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    addressLine VARCHAR(20) NOT NULL,
    userId INTEGER NOT NULL,

    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE fenton
(
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    date_of_birth VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    middle_name VARCHAR(50) NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    house_number VARCHAR(50) NOT NULL,
    street_name VARCHAR(50) NOT NULL,
    postcode VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    county VARCHAR(50) NOT NULL,
    country VARCHAR(50) NOT NULL
);

CREATE TABLE hanley
(
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    date_of_birth VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    middle_name VARCHAR(50) NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    house_number VARCHAR(50) NOT NULL,
    street_name VARCHAR(50) NOT NULL,
    postcode VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    county VARCHAR(50) NOT NULL,
    country VARCHAR(50) NOT NULL
);

CREATE TABLE longton
(
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    date_of_birth VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    middle_name VARCHAR(50) NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    house_number VARCHAR(50) NOT NULL,
    street_name VARCHAR(50) NOT NULL,
    postcode VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    county VARCHAR(50) NOT NULL,
    country VARCHAR(50) NOT NULL
);

CREATE TABLE stoke
(
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    date_of_birth VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    middle_name VARCHAR(50) NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    house_number VARCHAR(50) NOT NULL,
    street_name VARCHAR(50) NOT NULL,
    postcode VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    county VARCHAR(50) NOT NULL,
    country VARCHAR(50) NOT NULL
);

CREATE TABLE tunstall
(
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    date_of_birth VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    middle_name VARCHAR(50) NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    house_number VARCHAR(50) NOT NULL,
    street_name VARCHAR(50) NOT NULL,
    postcode VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    county VARCHAR(50) NOT NULL,
    country VARCHAR(50) NOT NULL
);

CREATE TABLE drugs
(
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    drug_name VARCHAR(50) NOT NULL,
    `condition` VARCHAR(50) NOT NULL,
    id_check TEXT NOT NULL,
    availability_stoke TEXT NOT NULL,
    availability_tunstall TEXT NOT NULL,
    availability_fenton TEXT NOT NULL,
    availability_hanley TEXT NOT NULL,
    availability_longton TEXT NOT NULL
);

CREATE TABLE drug_stock
(
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    drug_name VARCHAR(50) NOT NULL,
    total_stock INTEGER NOT NULL,
    expiry_date VARCHAR(50) NOT NULL,
    sales_per_week VARCHAR(50) NOT NULL
);

INSERT INTO roles(name)
VALUES ('admin'),
       ('employee'),
       ('customer');
