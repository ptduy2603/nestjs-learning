# define base image for the Dockerfile
# chỉ địch docker image này có được kế thừa từ image nào khác hay không
FROM node:20 AS base

# define working directory
WORKDIR /app

ARG NODE_ENV=development
ARG PORT=3000

# copy files that are needed for installing dependencies
COPY package*.json ./

# set environment variables
ENV NODE_ENV=${NODE_ENV}
ENV PORT=${PORT}

# install dependencies
RUN npm install --legacy-peer-deps

RUN echo "NODE_ENV: ${NODE_ENV}"
RUN echo "PORT: ${PORT}"

# copy all files to the working directory except those in .dockerignore
COPY . .

# expose the port
EXPOSE ${PORT}

# run the application
CMD [ "npm", "run", "start:dev" ]