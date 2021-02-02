# Getting Started with Save My Secrets Back-end

- Setup MariaDB (v.10.5.8)
- Setup database and run `CREATE DATABASE {$DB_NAME}` to create DB
- Run `mysql -u `_username_`-p`_dbname_` > /back-end/database/db.sql`
- Create a `config/default.json` file and copy and paste information while overriding parameters

```
{
  "db": {
    "host": "localhost",
    "port": "{portNumber}",
    "username": "{username}",
    "password": "{password}",
    "databaseName": "{databaseName}",
    "connectionLimit": 10
  }
}

```

- \*db.sql script include mock data
