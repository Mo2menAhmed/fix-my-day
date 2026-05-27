FROM node:24-bookworm-slim

WORKDIR /app

ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0
ENV REACT_NATIVE_PACKAGER_HOSTNAME=localhost
ENV CHOKIDAR_USEPOLLING=true
ENV BROWSER=none

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

EXPOSE 8081 19000 19001 19002

CMD ["npm", "run", "docker"]
