FROM node:18

# get the packages adn create the environment
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install


# copy the source code (except the files in .dockerignore)
COPY . .

ENV PORT=8080

EXPOSE 8080

CMD ["npm", "start"]