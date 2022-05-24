FROM node:16-alpine3.14

ARG PORT

WORKDIR /src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE ${PORT}

CMD ["npm", "run", "dev"]