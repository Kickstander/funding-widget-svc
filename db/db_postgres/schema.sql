CREATE TABLE IF NOT EXISTS campaigns (
  id SERIAL PRIMARY KEY, 
  campaign TEXT NOT NULL, 
  author TEXT NOT NULL, 
  user TEXT NOT NULL, 
  country INT NOT NULL, 
  pledgedAmount INT NOT NULL,
  goal INT NOT NULL, 
  backers INT NOT NULL, 
  endTime INT NOT NULL
);