FROM node:16.16.0-alpine AS TEMP_BUILD

WORKDIR /app

COPY . .

RUN yarn && yarn build

FROM node:16.16.0-alpine

WORKDIR /app

COPY --from=TEMP_BUILD /app/dist ./dist

RUN yarn global add serve

CMD ["serve", "-s", "dist", "-p", "3000"]

EXPOSE 3000
