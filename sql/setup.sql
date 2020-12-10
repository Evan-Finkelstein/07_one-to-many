DROP TABLE IF EXISTS owners CASCADE;
DROP TABLE IF EXISTS pets;

CREATE TABLE owners (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  job TEXT NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE pets (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 type TEXT NOT NULL, 
 name TEXT NOT NULL,
  owner_id BIGINT REFERENCES owners(id)
)