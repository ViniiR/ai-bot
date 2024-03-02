FROM node:20.10

WORKDIR /application

COPY package*.json /application/

RUN npm i

COPY . /application/

EXPOSE 3000

CMD [ "npm", "run", "build" ]