FROM node:18-alpine AS dependencies
WORKDIR /web
COPY --chown=node:node package*.json .
RUN npm install

FROM node:18-alpine AS builder
WORKDIR /web
COPY . .
COPY --from=dependencies /web/node_modules ./node_modules
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /web

COPY --from=builder /web/next.config.js ./
COPY --from=builder /web/public ./public
COPY --from=builder /web/.next ./.next
COPY --from=builder /web/node_modules ./node_modules
COPY --from=builder /web/package.json ./package.json

EXPOSE ${PORT}
CMD ["npm", "run", "dev"]