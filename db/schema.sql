\c testing_for_react_db

DROP TABLE IF EXISTS test_table;

CREATE TABLE test_table (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  expression VARCHAR(255)
);
