FROM node:18-alpine

WORKDIR /

COPY ./package.json ./
COPY ./package-lock.json ./

RUN ["npm", "ci", "--no-update-notifier"]

COPY ./config ./config
COPY ./.env ./
COPY ./tsconfig.json ./tsconfig.json
COPY ./ICAR-ADE-1 ./ICAR-ADE-1
COPY ./dist/src/ ./dist/src/

CMD ["npm", "start"]
