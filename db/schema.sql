\c testing_for_react_db

DROP TABLE IF EXISTS test_table;
DROP TABLE IF EXISTS song_library;
DROP TABLE IF EXISTS playlist;
DROP TABLE IF EXISTS join_table;
DROP TABLE IF EXISTS user_table;

CREATE TABLE song_library (
  song_id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  artist VARCHAR(255),
  genre VARCHAR(255)
);

CREATE TABLE playlist (
  playlist_id SERIAL PRIMARY KEY,
  user_id INTEGER,
  playlist_name VARCHAR(255)
);

CREATE TABLE join_table (
  id SERIAL PRIMARY KEY,
  plist_id INTEGER,
  song_id INTEGER
);

CREATE TABLE user_table (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(255),
  password VARCHAR(255)
);

CREATE TABLE test_table (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  expression VARCHAR(255)
);
