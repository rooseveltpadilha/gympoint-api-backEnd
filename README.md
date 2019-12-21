![GymPoint](https://github.com/Rocketseat/bootcamp-gostack-desafio-02/raw/master/.github/logo.png)

# GymPoint-api-backEnd

1. Aqui foi interessante para adicionar o sequelize no projeto. Primeiro criei rápido a estrutura de dados (src/config/database.js) e instalei o sequelize:

```
yarn add sequelize
```
```
yarn add sequelize-cli -D
```

2. Fiz a configuração e criação de um arquivo chamado `.sequelizerc` e adicionamos (lembrando que não funciona o sucrase nele):

```
const { resolve } = require('path');

module.exports = {
  config: resolve(__dirname, 'src', 'config', 'database.js'),
  'models-path': resolve(__dirname, 'src', 'app', 'models'),
  'migrations-path': resolve(__dirname, 'src', 'database', 'migrations'),
  'seeders-path': resolve(__dirname, 'src', 'database', 'seeds'),
}
```

3. Adicionamos os módulos necessários para iniciar o postgres:

```
yarn add pg pg-hstore
```

4. no arquivo database.js, você adiciona:

```
module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'postgym',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
```
