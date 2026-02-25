# Ejercicios SQL (1–40) 

## Tecnologías

- Node.js
- Express
- MySQL
- mysql2 (Promise)
- dotenv
- nodemon (dev)

---

## Requisitos previos

- Node.js instalado (LTS recomendado)
- MySQL Server instalado y corriendo
- Base de datos creada y con tablas/datos:
  - `users`, `orders`, `order_product`, `products`, `categories`

---

## Estructura del proyecto (Modularización)
- Este Ejercicio esta modularizado a continuación explicare lo que hace cada carpeta:


### ¿Qué hace cada carpeta?

- `controllers/`: lógica de cada endpoint (consultas SQL).
- `routes/`: define las rutas y conecta cada endpoint con su controller.
- `utils/asyncHandler.js`: wrapper para capturar errores en funciones async sin repetir try/catch.
- `middlewares/errorHandler.js`: middleware global de errores.
- `db.js`: conexión a MySQL (pool) con `mysql2/promise`.
- `app.js`: configura Express y monta rutas/middlewares.
- `server.js`: levanta el servidor.

---

## Instalación

1) Clonar repositorio:

```bash
git clone -ruta/repo
```

2) Intalar Dependencias:
`npm install`

3 )Crear el archivo .env en la raíz del proyecto:
- PORT=3000
- DB_HOST=localhost
- DB_USER=root
- DB_PASSWORD=tu_password
- DB_NAME=tu_base_de_datos

Aqui pones los datos de la base de datos, esto es por seguridad, tienes un archivo . env-example 

4) Terminas de instalar las dependencias necesarias:
```
npm i express mysql2 dotenv

npm i -D nodemon
```

