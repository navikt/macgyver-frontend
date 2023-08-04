FROM gcr.io/distroless/nodejs:18 as runtime

WORKDIR /app

COPY package.json /app/

COPY .next/standalone /app/
COPY public /app/public/
COPY /.next/static ./.next/static

EXPOSE 3000

ENV NODE_ENV=production
ENV NODE_OPTIONS '-r next-logger'

CMD ["server.js"]