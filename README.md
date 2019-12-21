![GymPoint](https://github.com/Rocketseat/bootcamp-gostack-desafio-02/raw/master/.github/logo.png)

# GymPoint-api-backEnd

1. nesta parte apenas colocamos o sucrase e o nodemon para rodar.

2. para isso precisamos adicionar o sucrase e o nodemon no projeto com o comando:

```
yarn add sucrase nodemon -D
```

3. precisamos criar um arquivo chamado nodemon.json e adicionamos um execMap para que todos arquivos js pudessem ser chamados com um sucrase-node na frente. Lembrando que o sucrase vai permitir usar informações como import e export default.

```
{
    "execMap": {
      "js": "node-sucrase"
    }
}
```

4. agora no package json é só adicionar:

```
"script": {
  "dev": "nodemon src/server"
}

```

5. adicionamos os imports e colocamos os export default's.

**e agora posso executar o projeto com:**

```
yarn dev
