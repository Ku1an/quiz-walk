FROM node:slim 

WORKDIR /app

# Optimazation technique, speeds up building due to caches
# Therefore two different copys
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "dev" ]