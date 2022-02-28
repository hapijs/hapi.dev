FROM node:16.14.0-alpine

# Add curl for readiness check and git for version information.
RUN apk --no-cache add curl git

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./server /usr/src/app/server
COPY ./dist /usr/src/app/dist
RUN npm install @hapi/hapi @hapi/inert --no-save

ENV NODE_ENV production
ENV HOST 0.0.0.0
ENV PORT 3000

CMD [ "node", "server/static.js" ]
