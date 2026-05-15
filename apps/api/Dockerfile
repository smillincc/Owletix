FROM node:22-alpine AS builder
WORKDIR /app
RUN apk add --no-cache openssl
COPY . .
RUN cd apps/api && npm install
RUN cd apps/api && npx prisma generate --schema=../../packages/db-schema/prisma/schema.prisma
RUN cd apps/api && npx nest build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN apk add --no-cache openssl
COPY --from=builder /app/apps/api/package*.json ./
COPY --from=builder /app/packages ./packages
RUN npm install --omit=dev
RUN npx prisma generate --schema=./packages/db-schema/prisma/schema.prisma
COPY --from=builder /app/apps/api/dist ./dist
EXPOSE 4000
CMD ["node", "dist/main.js"]
