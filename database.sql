CREATE DATABASE fundoonotesapp;

CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

insert into users (firstName,lastName,email,password) values ('Monica',"Gellar","monica123@gmail.com"', "rachel@123");