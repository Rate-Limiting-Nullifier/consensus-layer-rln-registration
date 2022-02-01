# syntax=docker/dockerfile:1

FROM node:16
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "hardhat.config.ts", "tsconfig.json", "./"]

RUN npm install --production

CMD [ "npm", "run", "client:build" ]
CMD [ "npm", "run", "client:run" ]
