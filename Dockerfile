FROM node:12.18 AS development
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm ci
COPY . .
EXPOSE 3000
RUN npm run build

FROM node:12.18-alpine AS production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
USER node
RUN mkdir /home/node/app
WORKDIR /home/node/app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm ci --only=production && npm cache clean --force
COPY --chown=node:node . .
COPY --from=development --chown=node:node /usr/src/app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/main.js"]
