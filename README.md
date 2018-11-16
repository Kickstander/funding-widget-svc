# Kickstand

> A detail page for a crowd-funding campaign

## Related Projects

  - https://github.com/FEC-Kickstand/comments-module
  - https://github.com/FEC-Kickstand/support-module-svc
  - https://github.com/FEC-Kickstand/updates-service
  - https://github.com/FEC-Kickstand/funding-widget

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- mysql 

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

### Initial Startup

1. Copy the contents of connection.test.js into a new file and name it connection.js
 

```sh
mysql.server start
mysql -u root 
npm run seed
npm run build
npm run start
```

### Endpoints

| Action    | Method | Endpoint                                              | Purpose             |
|-----------|--------|-------------------------------------------------------|---------------------|
| Create    | POST   | /api/:campaignId/stats                                | Insert new campaign |
| Read(One) | GET    | /api/:campaignId/stats                                | Get one campaign    |
| Update    | PATCH    | /api/:campaignId/stats                              | Update one campaign |
| Delete    | DELETE | /api/:campaignId/stats                                | Delete a campaign   |


