# Setup
You need to install git and docker to have this running on your local computer.

## Run via docker
### 1 After cloning this repository, head inside the inventory-iq directory and build the docker image
```
docker-compose build
```
### 2 Populate dummy data
```
docker-compose run web npm run seed
```
### 3 Run the containers
```
docker-compose up
```

The web application should be accessible on the following url: http://localhost:3000