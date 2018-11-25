DROP KEYSPACE IF EXISTS campaigns;

CREATE KEYSPACE campaigns
WITH REPLICATION = {'class':'SimpleStrategy', 'replication_factor' : 1}
AND durable_writes = false;

USE campaigns;

CREATE TABLE campaign (
  campaign text PRIMARY KEY,
  author text,
  user text,
  country int, 
  pledgedAmount int,
  goal int, 
  backers int,
  endtime int,
)

CREATE INDEX on campaign(id);

COPY campaigns.campaign (campaign, author, user, country, pledgedAmount, goal, backers, endTime) FROM '/Users/seanghazvini/HRSF105/SDC/funding-widget-svc/db/seedLargeData.csv' WITH DELIMITER=',' AND HEADER=TRUE;