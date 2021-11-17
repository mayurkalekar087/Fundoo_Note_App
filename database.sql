CREATE DATABASE fundoonotesapp;

CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE note(
  note_id serial,
	user_id serial,
	title varchar(255) not null,	
  description VARCHAR(255) not null,
	primary key (note_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

insert intlastName,email,password) values ('Monica',"Gellar","monica123@gmail.com"', "rachel@123");o users (firstName,