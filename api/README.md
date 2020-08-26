# API Code challange

#### Primeros pasos:

Es necesario tener instalado [docker](https://www.docker.com/) y [docker-compose](https://docs.docker.com/compose/).
Los siguientes comandos deberán ejecutarse dentro de esta carpeta, `/api`.

1. Copiar las variables de entorno por defecto

```sh
cp .env.example .env
```

2. Hacer un build de las imágenes

```sh
docker-compose build
```

#### Inicializar el api:

```sh
docker-compose up -d
```
Por defecto se inicializa en el puerto `5000`, postgres en el puerto `5432` y pgadmin en el puerto `5050`.

#### Correr los tests

```sh
docker-compose exec api yarn test
```

#### Documantación api

La documentación del api estará en `http://localhost:{PORT por defecto 5000}/documentation` una vez inicializado el api.

#### Las variables de entorno:

- POSTGRES_PASSWORD: contraseña de postgres.
- POSTGRES_USER: usuario de postgres.
- POSTGRES_DB: bbdd de postgres.
- DATABASE_HOST: host de postgres, al arrancarse con docker compose deberá ser db
- DATABASE_PORT: puerto de postgres
- PGADMIN_DEFAULT_EMAIL: correo de pgadmin
- PGADMIN_DEFAULT_PASSWORD: contraseña de pgadmin
- HOST: host del api, en local http://localhost:{PORT}, ejemplo http://localhost:5000.
- DOCKER_RUN_TIME: 1 o 0, si lo arrancamos en docker deberá ser 1.
- PORT: puerto en el que arranca el api.

# New Features!

- Crear los tests para los endpoints de usuarios y roles.

### Tech

- [Fastify] - Fast and low overhead web framework, for Node.js.
- [Typescript] - Typed JavaScript at Any Scale.
- [Ramda] - A practical functional library for JavaScript programmers.
- [Postgres] - The World's Most Advanced Open Source Relational Database
- [node.js] - evented I/O for the backend
- [Jest] - the streaming build system
- [swagger] - Swagger makes API design a breeze, with easy-to-use tools for developers, architects, and product owners.

[//]: # "These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax"
[fastify]: https://www.fastify.io
[typescript]: https://www.typescriptlang.org
[ramda]: https://ramdajs.com/docs
[postgres]: https://www.postgresql.org
[jest]: https://jestjs.io
[node.js]: http://nodejs.org
[swagger]: https://swagger.io/
