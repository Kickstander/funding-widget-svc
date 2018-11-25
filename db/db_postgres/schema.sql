CREATE TABLE IF NOT EXISTS campaigns (
  id SERIAL PRIMARY KEY, 
  campaign TEXT, 
  author TEXT, 
  user TEXT, 
  country INT, 
  pledgedAmount INT,
  goal INT, 
  backers INT, 
  endTime INT
);