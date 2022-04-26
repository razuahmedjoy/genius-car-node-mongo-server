/**
 * one time:
 * ---------------------------
 * create heroku account
 * install client
 * run command  
 * heroku login
 * -------------------------------
 * 
 * For each project
 * ------------------------------------
 * 1. heroku create
 * 2. make sure that you git add . git commit and git push the latest code
 * 3. git push heroku main
 * 
 * go to settings to configure the envvironment variables
 * and copy past the key values from .env file to keys
 * DBuser, db pass, access_secret key etc ...
 * 
 * make sure you whitelisted you ip from mongodb atlas
 * 
 * UPDATE SERVER.................
 * git add . git commit and git push
 * git push heroku main
 * 
 * 
 * Configure CLient side
 * 
 * 1> Replace localhost by hroku link
 * 2> npm run build
 * 3> firebase deploy
 * 
 */