CREATE TABLE campaigns (
  id SERIAL PRIMARY KEY, 
  campaign TEXT NOT NULL, 
  description TEXT NOT NULL,
  author TEXT NOT NULL, 
  _user TEXT NOT NULL, 
  country INT NOT NULL, 
  pledged INT NOT NULL,
  goal INT NOT NULL, 
  backers INT NOT NULL, 
  endDate INT NOT NULL,
  _type INT NOT NULL
);

CREATE TABLE pledges (
  name TEXT NOT NULL,
  pledge INT NOT NULL,
  pledgeTime BIGINT NOT NULL,
  campaignId INT NOT NULL
);

