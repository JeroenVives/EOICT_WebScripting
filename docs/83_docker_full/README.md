# Deploy a MySQL, Express & Vue project

:::warning 🔥warning
Make sure you have installed [docker desktop](https://www.docker.com/products/docker-desktop/).
:::

To be able to deploy our web application in docker we need to prepare it.

## Create a centralized folder for deployment

* create a local folder `<projectname>` with the subfolders `db`, `api` and `vue`.
* make a copy of [your Express project](./files/api.zip) to the folder `api`.
* make a copy of [your Vue project](./files/vue.zip) to the folder `vue`.

## Preparing the necessary files for docker

### Docker compose file

First we will be creating the docker compose file that will contain the necessary services that need to be deployed on docker (MariaDB, PHPmyAdmin, API and Vue).

Create a file `compose.yaml` in the folder  `<projectname>` with the following content:

``` yaml
services:
  db:
    container_name: db
    image: mariadb
    restart: unless-stopped
    environment:
      - MARIADB_ROOT_PASSWORD=${MARIADB_ROOT_PASSWORD}
      - MARIADB_DATABASE=${MARIADB_DATABASE}
      - MARIADB_USER=${MARIADB_USER}
      - MARIADB_PASSWORD=${MARIADB_PASSWORD}
    volumes:
      - ./db/init:/docker-entrypoint-initdb.d
      - ./db/data:/var/lib/mysql
  phpmyadmin:
    container_name: phpmyadmin
    image: phpmyadmin
    restart: unless-stopped
    ports:
      - 81:80
    environment:
      - PMA_ARBITRARY=1
      - PMA_HOST=db
      - PMA_USER=root
      - PMA_PASSWORD=${MARIADB_ROOT_PASSWORD}
    depends_on:
      - db
  api:
    container_name: api
    build:
      context: ./api
      dockerfile: Dockerfile
    restart: unless-stopped
    ports:
      - 3000:3000
    environment:
      - DB_HOST=db
      - DB_USER=${MARIADB_USER}
      - DB_PASS=${MARIADB_PASSWORD}
      - DB_NAME=${MARIADB_DATABASE}
      - DB_PORT=3306
      - VUE_HOST=${VUE_HOST}:5000
    depends_on:
      - db
  vue:
    container_name: vue
    build:
      context: ./vue
      dockerfile: Dockerfile
      args:
        VUE_APP_API_HOST: ${API_HOST}:3000
    restart: unless-stopped
    ports:
      - 5000:80
    depends_on: 
      - api
``` 

Notice that the MariaDB server port 3306 is not exposed, so our database is not accessable outside docker.

### Docker file for the API

Create a file `Dockerfile` in the folder `api` with the following content:

``` yaml
# Development stage
FROM node:23-alpine AS develop-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Build stage
FROM develop-stage AS build-stage
EXPOSE 3000
CMD ["npm", "run", "start"]
```

### Docker file for Vue

Create a file `Dockerfile` in the folder `vue` with the following content:

``` yaml
# Development Stage
FROM node:23-alpine AS develop-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Build Stage
FROM develop-stage AS build-stage
ARG VUE_APP_API_HOST
ENV VITE_API_HOST ${VUE_APP_API_HOST}
RUN npm run build

# Production Stage
FROM nginx:1.27-alpine AS production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Hosting configuration

We are using `nginx` to host our frontend, therefore we need to configure it by adding a `nginx.conf` file in the `vue` folder with the following content:

```conf
user  nginx;
worker_processes  1;
error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;
events {
  worker_connections  1024;
}
http {
  include       /etc/nginx/mime.types;
  default_type  application/octet-stream;
  log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';
  access_log  /var/log/nginx/access.log  main;
  sendfile        on;
  keepalive_timeout  65;
  server {
    listen       80;
    server_name  localhost;
    location / {
      root /usr/share/nginx/html;
      index  index.html;
      try_files $uri $uri/ /index.html;
    }
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
      root   /usr/share/nginx/html;
    }
  }
}
```

### CORS

In order for your Vue app to be able to call your Express API you will need to add its origin to the CORS headers in your Express app:

```js
...
import cors from 'cors';
...
const app = express()
...
var corsOptions = {
  origin: `http://${process.env.VUE_HOST}`
};
app.use(cors(corsOptions));
...
```

## Environment variables

### Create the environment variables file

Next we need to create a ´.env´ file in the folder `<projectname>` with the following content:

```env
# mySQL database
MARIADB_ROOT_PASSWORD=<your root password>
MARIADB_DATABASE=app
MARIADB_USER=<a_user_for_your_database>
MARIADB_PASSWORD=<a_password_for_this_user>
API_HOST=localhost
VUE_HOST=localhost
```

### Change static URL to environment variable

In your Vue project you need to change all `localhost:3000` to `${import.meta.env.VITE_API_HOST}`.

Example:
```js
axios.get('http://${import.meta.env.VITE_API_HOST}/images')
```

## Prepare the database

Prepare the folder structure for the database container:
* db/
    * data/
    * init/
* ...

### Create an initialization script

Finally, create a ´.sql´ file with the following content and place it in the `<projectname>/db/init` folder.

```sql
START TRANSACTION;

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

INSERT INTO `products` (`id`, `name`, `price`) VALUES
(1, 'kaas', 4.70),
(2, 'brood', 3.40),
(3, 'bananen', 2.60);

ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

COMMIT;
```

## Deploy on docker

Once we have done that, we are ready to build and run our service.

* use `docker compose up -d` to deploy your containers, now you get your bash prompt returned.
* use `docker compose up -d --build` to deploy your containers and rebuild them after adjustments have been made.
* use `docker ps -a` to see the status of all containers.

Should you want to open a terminal in one of the containers running on docker, you can do this by using this command:
```bash
docker exec -it <the name of the container> sh
```
To exit just type `exit`.







