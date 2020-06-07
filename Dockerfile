FROM node:12.14.1-alpine

WORKDIR /app
COPY . .
RUN yarn
CMD [ "yarn", "start" ]