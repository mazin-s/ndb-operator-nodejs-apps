---- Script Database

--CREATE DATABASE company

-- Select database
use database_one
CREATE TABLE person (
    id INTEGER PRIMARY KEY, 
    name VARCHAR(64)
)

INSERT INTO person(id, name) 
VALUES(1, 'Vinicius'), (2, 'Beletate')