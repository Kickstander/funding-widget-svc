/* eslint-disable */

COPY campaigns(campaign, author, _user, country, pledgedamount, goal, backers, endtime) 
FROM '/Users/seanghazvini/HRSF105/SDC/funding-widget-svc/db/data/seedCampaignData.csv'
DELIMITER ',' CSV; 



COPY pledges (name, pledgedAmount, pledgeTime, campaignID) 
FROM '/Users/seanghazvini/HRSF105/SDC/funding-widget-svc/db/data/seedPledgeData.csv'
DELIMITER ',' CSV; 

