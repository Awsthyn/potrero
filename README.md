# fundacion-el-potrero
Fundacion El Potrero

En `api` vas a tener que crear un archivo llamado: `.env` que tenga la siguiente forma:

```
DB_USER=usuariodepostgres
DB_PASSWORD=passwordDePostgres
DB_HOST=localhost
```

En muchos modelos (y consultas, obviamente) se trabajó con RANGE Types

```
https://www.postgresql.org/docs/12/rangetypes.html
https://sequelize.org/v5/manual/data-types.html
https://sequelize.org/master/manual/model-querying-basics.html#postgres-only-range-operators
```

IMPORTANTE client: @date-io/moment tiene que ser una versión 1.x
```
npm i @date-io/moment@1.x moment
```