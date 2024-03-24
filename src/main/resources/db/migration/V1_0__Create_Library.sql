DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS addresses;
DROP TABLE IF EXISTS drug;
DROP TABLE IF EXISTS drug_stock;
DROP TABLE IF EXISTS store;
DROP TABLE IF EXISTS customer;
DROP TABLE IF EXISTS sales;


CREATE TABLE roles
(
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) NOT NULL
);

CREATE TABLE store
(
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    address VARCHAR(100) NOT NULL,
    postcode VARCHAR(50) NOT NULL,
    mobile_number VARCHAR(50) NOT NULL
);

CREATE TABLE users
(
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    emailAddress VARCHAR(50) NOT NULL UNIQUE,
    phoneNumber VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    store INTEGER NOT NULL,
    roleId INTEGER NOT NULL,

    FOREIGN KEY (roleId) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (store) REFERENCES store(id) ON DELETE CASCADE
);

CREATE TABLE addresses
(
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    addressLine VARCHAR(100) NOT NULL,
    userId INTEGER NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE customer
(
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(50) NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    gender VARCHAR(50) NOT NULL,
    address VARCHAR(100) NOT NULL,
    store_name VARCHAR(50) NOT NULL,
    postcode VARCHAR(50) NOT NULL,
    medical_history VARCHAR(50) NOT NULL,
    allergy VARCHAR(50) NOT NULL,
    date_of_birth VARCHAR(50) NOT NULL,
    mobile_number VARCHAR(50) NOT NULL
);

CREATE TABLE drug
(
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    drug_code VARCHAR(50) NOT NULL,
    drug_name VARCHAR(50) NOT NULL,
    `condition` VARCHAR(50) NOT NULL,
    id_check BOOLEAN NOT NULL,
    store VARCHAR(50) NOT NULL,
    postcode VARCHAR(50) NOT NULL,
    available_stock VARCHAR(50) NOT NULL,
    price VARCHAR(50) NOT NULL,
    expiry_date VARCHAR(50) NOT NULL,
    is_available BOOLEAN NOT NULL
);


CREATE TABLE drug_stock
(
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    drug_name VARCHAR(50) NOT NULL,
    total_stock INTEGER NOT NULL,
    expiry_date VARCHAR(50) NOT NULL
);

CREATE TABLE sales
(
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    customer INTEGER NOT NULL,
    user INTEGER NOT NULL,
    quantity VARCHAR(50) NOT NULL,
    total_price VARCHAR(50) NOT NULL,
    store INTEGER NOT NULL,
    drug INTEGER NOT NULL,
    date_of_sale VARCHAR(50) NOT NULL,
    FOREIGN KEY (customer) REFERENCES customer(id) ON DELETE CASCADE,
    FOREIGN KEY (user) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (store) REFERENCES store(id) ON DELETE CASCADE,
    FOREIGN KEY (drug) REFERENCES drug(id) ON DELETE CASCADE
);

INSERT INTO pharmazeal.roles(name)
VALUES ('admin'),
       ('employee');

INSERT INTO pharmazeal.store(name, address, postcode, mobile_number)
VALUES ('Tunstall','12 Best Noon Street  Stoke-on-Trent Staffordshire  United Kingdom.','ST4', '07899076037'),
       ('Fenton','12 York Street Stoke-on-Trent Staffordshire  United Kingdom.','ST5', '07899076038'),
       ('Hanley','32 Harvard Street Stoke-on-Trent Staffordshire  United Kingdom.','ST6', '07899076039'),
       ('Longton','33 Old Town Street Stoke-on-Trent Staffordshire  United Kingdom.','ST7', '07899076040'),
       ('Stoke','61 Julien Street Stoke-on-Trent Staffordshire  United Kingdom.','ST8', '07899076041');
