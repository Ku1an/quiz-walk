FROM node:slim AS builder

WORKDIR /app

# Optimazation technique, speeds up building due to caches
# Therefore two different copys
COPY package*.json .

RUN npm install

COPY . .

# Need to set ALL env variabels BEFORE build
ENV VITE_API_GATEWAY_BASE_URL=http://localhost:8080/api/v1

RUN npm run build

FROM nginx:stable-alpine


COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]

