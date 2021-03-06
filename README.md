# Welcome to Save My Secrets

Save My Secrets is a single page application made with React and Node/Express to research the vulnerabilites around websites and around password safety. We will be incrementally securing the Save My Secrets web application with each release by performing a penetration test and creating a write-up for that specific version. We intend to use the tools in Kali linux and prevalent tools to gain and exploit passwords. Feel free to checkout our current live sites and play around in those environments. Happy Hacking!

## Production Deployments (live sites)

- [v1.0](http://35.224.40.226:5000/#/)
- [v1.1](http://35.225.223.58:5000/#/)
- [v1.2](http://34.122.111.35:5000/#/)
- [v1.3.2](http://35.224.60.191:5000/#/)
- [v1.4](http://34.122.127.218:5000/#/)
- [v1.5](http://35.225.200.240:5000/#/)

## Instructions to run this app locally

(Note: you must have `node v.14.15.4+` and `mariadb v10.3.27+` on your system to run this project locally. The following instructions are for a `unix` based system.)

## Front end instructions

- Navigate to the `front-end` directory.
- Run `npm install`.
- Run `npm start`. The webapp should now be running on `localhost:3000`.

## Back end instructions

- Navigate to the `back-end` directory.
- Run `npm install`.
- Run `npm start`. The server should now be listening on `localhost:4000`.

## Database instructions

- Run `mariadb` to start its CLI tool in the `back-end` directory.
- Create a local database by running `CREATE DATABASE <DB_NAME>;`, where DB_NAME is your choice of name.
- Be sure that `<username>` has privileges on the database specified by `<DB_NAME>`. You can read more about granting privileges in the MariaDB documentation [here](https://mariadb.com/kb/en/grant/).
- Run `mariadb -u <username> -p <DB_NAME> < database/db.sql` to populate `<DB_NAME>` with mock data.
- Still in the `back-end` directory, create a file `config/default.json`. The contents should be as follows:

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

- Here, `<portNumber>` should be the port that your local database server is on. You can double check this by querying `SHOW GLOBAL VARIABLES LIKE 'PORT';` in the MariaDB CLI.

## Penetration Test Reports

- [v1.0](https://docs.google.com/document/d/1bHbGZlmDtVqcUrWsEjpkIG4kdxffRHM9C4MsS01IdAw/edit?usp=sharing)
- [v1.1](https://docs.google.com/document/d/1ba__xUNUEnI-te9-6eFxmma6F_FlkA8m427E3zd21UA/edit?usp=sharing)
- [v1.2](https://docs.google.com/document/d/1EQudqb8eeEMnyLfhe7GBZclVeWz1V37OdBJOj1rEmfU/edit?usp=sharing)
- [v1.3](https://docs.google.com/document/d/1JSFHFV5U_26cNBEl-aS5H_pXir9ZHqIxx5A323ZRoUo/edit?usp=sharing)
- [v1.4](https://docs.google.com/document/d/1B4bvayGP7xXw-2zXmcmic-cMcrJdVCukRN1oWao9TXs/edit?usp=sharing)
