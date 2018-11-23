COPY campaigns (campaign, author, _user, country, pledgedamount, goal, backers, endtime) 
FROM '/Users/seanghazvini/HRSF105/SDC/funding-widget-svc/db/seedLargeData.csv'
DELIMITER ',' CSV; 

