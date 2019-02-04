-- SET UP SCHEMA HERE

CREATE DATABASE favorites;

USE favorites;

CREATE TABLE movies (
  id int,
  title VARCHAR(255) NOT NULL,
  poster_path VARCHAR(255) NOT NULL,
  release_date VARCHAR(255) NOT NULL,
  popularity INT NOT NULL,
  PRIMARY KEY (id)
--   genre_ids: Array
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/