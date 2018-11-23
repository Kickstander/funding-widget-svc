DROP KEYSPACE IF EXISTS campaigns;

CREATE KEYSPACE campaigns;

USE campaigns;

CREATE TABLE campaigns (
  id int PRIMARY KEY,
  campaign text,
  _user text,
  country int, 
  pledgedAmount int,
  goal int, 
  backers int,
  endtime int,
)

CREATE INDEX on campaigns(id);