#Instructions for using the local backend API

##Initialization
After installing the nodejs environment, enter ‘npm install’ at the command line;
Then enter the ‘node ./app.js’ running file to generate the API interface and use the postman tool to debug all interfaces under the root path of http://127.0.0.1:8888
##Project structure
-`config` configuration file directory
   -`default.json` default configuration file (which contains database configuration, jwt configuration)
-`dao` data access layer, which stores additions, deletions, changes, and queries to the database
   -Public access methods provided by `DAO.js`
-`models` stores specific database ORM model files
-`modules` current project modules
   -`authorization.js` API permission verification module
   -`database.js` database module (database loading is based on nodejs-orm2 library loading)
   -`passport.js` login framework based on passport module
   -`resextra.js` API uniform return result interface
-`node_modules` third-party modules that the project depends on
-`routes` unified routing
   -`api` provides api interface
   -`mapp` provides mobile APP interface
   -`mweb` provides mobile web sites
-`services` service layer. Business logic code is written in this layer. Data obtained through different interfaces is converted into data required by a unified front end.
-`app.js` main project entry file
-`package.json` project configuration file
