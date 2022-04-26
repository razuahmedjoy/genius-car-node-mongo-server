## STeps

* npm init -y
* create index.js file
* install required libraries/packages

`npm i express cors mongodb dotenv`

* create .env file in root folder

Add the below line in project file

* require('dotenv').config();

### connect with database Mongodb
* add database credentials in .env file and then use

* `process.env.KEY_NAME` 

to get the value in server files 