
# ¿Qué es? 🌌

Es una red social para una comunidad gamer que usa:

- Frontend: 🧧 ReactJS
- Backend: 🔸 NodeJS + Express + Mongoose + JWT + Validame(Regex) + BcryptJS + REST Client
- DB: 🍃 MongoDB 

- En el desarrollo usé [este tablón de Trello](https://trello.com/b/WL58ysOA/red-social).

<br>

# How to run 🚀

- Download [backend repo](https://github.com/RosaSabater/appClinicaDental-b).
- Download [frontend repo](https://github.com/RosaSabater/appClinicaDental-f).
- On the backend run:
	- `nodemon app.js`
- On the frontend run:
	- `npm start`


<br>

# Deploy ☁

- El backend está deployado en [Heroku](https://redsocial-b.herokuapp.com).
- El frontend está deployado en [Netlify](https://leyendasurbanas.netlify.app).

<br>

# Frontend 🖼

- Inicio
![Inicio](https://gyazo.com/37d38090246192f5072537eba27a8c0c.jpg)

- Registro
![Registro](https://gyazo.com/f4205ea85eb5c014dce39ab3b7b877a1.jpg)

- Iniciar sesión
![Iniciar sesión](https://gyazo.com/aa7a58f47c70f0496c23f3417a6cf848.jpg)

<br>


# Backend 🔙

## **Endpoints** 📃

**USUARIO** 👥

<br>

- **POST** /registro/
```json
{
    "nick": "Adrian",
    "nombreCuenta": "soyIcaruk",
    "email": "adrian@gmail.com",
    "password": "12345678",
    "biografia": "Full Stack Developer",
    "avatar": "https://imgur.com/AxWdS6U.png",
    "pais": "España",
    "ciudad": "Valencia"
}
```

<br>


- **POST** /login/
```json
{
    "email": "ejemplo@gmail.com",
    "password": "1234"
}
```
```
Aquí se crea el token que durará 1 día.
```

<br>

- **POST** /logout/
```json
Authorization: {{token}}
```

<br>

- **DELETE** /delete/
```json
Authorization: {{token}}
```

<br>

- **POST** /perfil/
```json
Authorization: {{token}}
```

<br>

**Posts** 📋

<br>

- **POST** /post/
```json
Authorization: {{token}}
{
    "mensaje": "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
}
```

<br>

- **POST** /getPosts/
```json
Authorization: {{token}}
{
    "nombreCuentaAutor": "soyIcaruk"
}
```

<br>

- **POST** /getMisPost/
```json
Authorization: {{token}}
```

<br>

- **POST** /borrarPost/
```json
Authorization: {{token}}
{
    "_id": "5fd506ae3acfb82c14afe270"
}
```

<br>

**Follows** 🔭

<br>

- **POST** /darFollow/
```json
Authorization: {{token}}
{
    "destino": "soyIcaruk"
}
```

<br>

- **POST** /quitarFollow/
```json
Authorization: {{token}}
{
    "destino": "soyIcaruk"
}
```

<br>

- **POST** /comprobarFollow/
```json
Authorization: {{token}}
{
    "destino": "soyIcaruk"
}
```

<br>

- **POST** /postSeguidos/
```json
Authorization: {{token}}
{
    "nombreCuenta": "soyRosa"
}
```

<br>

**Likes** ✅

<br>

- **POST** /darLike/
```json
Authorization: {{token}}
{
    "destino": "5fd9045dc9e4f91ee406f0f2"
}
```

<br>

- **POST** /quitarLike/
```json
Authorization: {{token}}
{
    "destino": "5fd9045dc9e4f91ee406f0f2"
}
```

<br>

**Buscar usuarios** 🔍

<br>

- **POST** /buscar/
```json
Authorization: {{token}}
{
    "busqueda": "ad"
}
```
