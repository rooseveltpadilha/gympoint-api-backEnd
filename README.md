![GymPoint](https://github.com/Rocketseat/bootcamp-gostack-desafio-02/raw/master/.github/logo.png)

# GymPoint-api-backEnd

1. Nesta parte foi adicionado o docker.

2. Após configurado fiz uma imagem com um banco postgres.

3. Adicionei o postbird para ajudar.

4. Foi adicionado o eslint

```
 yarn add eslint -D
```

5. Depois inicializei o eslint

```
yarn eslint --init
```

6. depois atualizei as rules (eslint rc)

```
 rules: {
    "class-methods-use-this": "off",
    "no-param-reassign": "off",
    camelcase: "off",
    "no-unused-vars": ["error", { argsIgnorePattern: "next" }]
  }
```

7. Depois adicionei o prettier:

```
yarn add prettier eslint-config-prettier eslint-plugin-prettier -D
```

8. Declara os extends e os plugins no arquivo (eslint rc):

```
extends: ["airbnb-base", "prettier"],
plugins: ["prettier"],
```
9. Criamos o .prettierrc e adicionamos para tirar o conflito da BnB com o prettier:

```
{
	"singleQuote":  true,
	"trailingComma":  "es5"
}
```

10. Caso queremos ajustar o código, basta rodar:

```
yarn eslint --fix src --ext .js
```

**Importante ter o plugin do eslint no computador**

11. Dá até pra ajustar no package.json:

```
 "scripts": {
    "dev": "nodemon src/server",
    "eslintify": "yarn eslint --fix src --ext .js"
  },
```

12. Instala o plugin **EditorConfig**, joga no vscode e depois dá um true nas duas últimas configs.


**O Érick Matos me ajudou com as novas configurações para o Eslint 1.41, as configs são do VSCODE: https://gist.github.com/ErikGMatos/67003a28fa0ad1343a3e07d9702672f2**
