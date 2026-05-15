FROM node:22-alpine AS builder
WORKDIR /app

COPY . .
RUN cd apps/api && npm install
RUN cd apps/api && npx prisma generate --schema=../../packages/db-schema/prisma/schema.prisma
RUN cd apps/api && npx nest build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/apps/api/package*.json ./
COPY --from=builder /app/apps/api/node_modules ./node_modules
COPY --from=builder /app/apps/api/dist ./dist

EXPOSE 4000
CMD ["node", "dist/main.js"]
