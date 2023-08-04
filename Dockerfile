FROM node:18-alpine

RUN apk add --no-cache bash

WORKDIR /app

ENV NODE_ENV production

COPY package*.json /app/
COPY .yarn /app/.yarn
COPY .yarnrc.yml /app/
COPY yarn.lock /app/

RUN yarn --immutable

COPY next.config.js /app/
COPY .next /app/.next/
COPY public /app/public/

EXPOSE 3000

CMD ["yarn", "start"]
