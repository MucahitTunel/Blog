FROM node:latest

MAINTAINER Mucahit Tunel <mucahit.tunel42@gmail.com>

WORKDIR /usr/src/app

COPY package*.json ./

RUN ["npm","install"]

COPY . .

EXPOSE 8080

CMD ["npm","start"]
