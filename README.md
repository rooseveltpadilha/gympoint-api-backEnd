![GymPoint](https://github.com/Rocketseat/bootcamp-gostack-desafio-02/raw/master/.github/logo.png)
# GymPoint-api-backEnd


1. Para conectar a aplicação com banco de dados e carregar os models, temos que criar um o arquivo index.js na pasta database. Adicionamos o código abaixo.

2. Faz o teste e joga ('/') no navegador. Fizemos as rotas também.

```
Para conectar a aplicação com banco de dados e carregar os models, temos que criar um o arquivo index.js na pasta database.

import Sequelize from 'sequelize';
import User from '../app/models/User';
import databaseConfig from '../config/database';

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map(model => model.init(this.connection));
  }
}
export default new Database();
```

