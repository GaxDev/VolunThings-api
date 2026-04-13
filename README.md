# VolunThings - API REST de gestión de materiales

VolunThings API es una API REST construida con **Node.js**, **Express** y **TypeScript** que permite gestionar materiales y préstamos de una organización de voluntarios.  
Su propósito es servir como backend para la aplicación VolunThings, gestionando el inventario de materiales, los préstamos activos y los usuarios del sistema.  

---

## Tecnologías utilizadas
- **Node.js** + **Express** → Backend de la API  
- **TypeScript** → Tipado estático para mayor robustez  
- **PostgreSQL** → Base de datos relacional  
- **pg** → Cliente nativo de PostgreSQL para Node.js  
- **dotenv** → Gestión de variables de entorno  
- **cors** → Control de acceso entre dominios  
- **ts-node-dev** → Recarga automática en desarrollo  

---

## Requisitos previos
Antes de iniciar, tienes que tener instalado:

1. [Node.js](https://nodejs.org/) (v20.17.0)  
2. [Docker Desktop](https://www.docker.com/products/docker-desktop/)  
3. [Git](https://git-scm.com/)  

---

## Configuración de PostgreSQL con Docker

1. Descarga e instala **Docker Desktop** desde la [página oficial](https://www.docker.com/products/docker-desktop/).  
2. Abre una terminal y ejecuta el siguiente comando para levantar un contenedor de PostgreSQL en el puerto `5432`:

   ```bash
   docker run --name volunthings-db \
     -e POSTGRES_USER=postgres \
     -e POSTGRES_PASSWORD=masterkey \
     -e POSTGRES_DB=postgres \
     -p 5432:5432 \
     -d postgres
   ```

   Esto creará una base de datos lista para conectarse desde la API.

3. (Opcional) Si quieres entrar al contenedor:  
   ```bash
   docker exec -it volunthings-db psql -U postgres
   ```

4. UI Base de datos: En este caso se usa [DBeaver](https://dbeaver.io/download/) porque se instala fácil, es intuitivo y conectar la base de datos no da problemas.

---

## Preparación de la base de datos

1. Conéctate a la base de datos con DBeaver u otro cliente SQL y ejecuta el script `database/schema.sql` que encontrarás en la raíz del proyecto.  
   Este script creará las tablas necesarias e insertará datos de prueba iniciales:

   ```sql
   -- Tablas creadas:
   -- materials  → gestión del inventario de materiales
   -- loans      → gestión de préstamos de materiales
   ```

2. Para ejecutarlo desde DBeaver, abre un nuevo script SQL en tu base de datos, pega el contenido del archivo `schema.sql` y ejecútalo.

3. (Opcional) Si prefieres ejecutarlo directamente desde Docker:  
   ```bash
   docker exec -i volunthings-db psql -U postgres < database/schema.sql
   ```

---

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=masterkey
DB_NAME=postgres
```

---

## Instalación de dependencias

Desde la raíz del proyecto ejecuta:

```bash
npm install
```

---

## Ejecución del proyecto

Con todo configurado, ya puedes iniciar el servidor de desarrollo:  

```bash
npm run dev
```

La API estará corriendo en:  
[http://localhost:3000](http://localhost:3000)

---
