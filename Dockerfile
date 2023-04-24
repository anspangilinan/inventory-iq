FROM node:18-alpine AS deps
WORKDIR /app
COPY --chown=node:node package*.json .
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
RUN npm install

FROM node:18-alpine AS builder
WORKDIR /app
COPY --chown=node:node --from=deps /app/node_modules ./node_modules
COPY --chown=node:node src ./src
COPY --chown=node:node public ./public
COPY --chown=node:node package.json next.config.js jsconfig.json ./

FROM node:18-alpine
WORKDIR /app
COPY --chown=node:node --from=builder /app/.next ./.next
COPY --chown=node:node --from=builder /app/public ./public
COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/package.json ./
CMD ["npm", "run", "dev"]