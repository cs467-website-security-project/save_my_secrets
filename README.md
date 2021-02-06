# Welcome to Save My Secrets


## Instructions to run this app locally
(Note: you must have `node v.14.15.4+` and `mariadb v10.3.27+` on your system to run this project locally. The following instructions are for a `unix` based system.)


## Front end instructions
* Navigate to the `front-end` directory.
* Run `npm install`.
* Run `npm start`. The webapp should now be running on `localhost:3000`.


## Back end instructions
* Navigate to the `back-end` directory.
* Run `npm install`. 
* Run `npm start`. The server should now be listening on `localhost:4000`.


## Database instructions
* Run `mariadb` to start its CLI tool in the `back-end` directory.
* Create a local database by running `CREATE DATABASE <DB_NAME>;`, where DB_NAME is your choice of name.
* Be sure that `<username>` has privileges on the database specified by `<DB_NAME>`. You can read more about granting privileges in the MariaDB documentation [here](https://mariadb.com/kb/en/grant/).
* Run `mariadb -u <username> -p <DB_NAME> < database/db.sql` to populate `<DB_NAME>` with mock data. 
* Still in the `back-end` directory, create a file `config/default.json`. The contents should be as follows:
```
{
  "db": {
    "host": "localhost",
    "port": "<portNumber>",
    "username": "<username>",
    "password": "<password>",
    "databaseName": "<DB_NAME>",
    "connectionLimit": 10
  }
}
```
* Here, `<portNumber>` should be the port that your local database server is on. You can double check this by querying `SHOW GLOBAL VARIABLES LIKE 'PORT';` in the MariaDB CLI. 
