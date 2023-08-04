FROM node:18-slim as builder
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

FROM gcr.io/distroless/nodejs18:nonroot
WORKDIR /app
EXPOSE 3000
COPY --from=builder /app /app
CMD ["yarn", "start"]