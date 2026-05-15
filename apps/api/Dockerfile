FROM node:22-alpine AS builder
WORKDIR /app

# Copy entire monorepo
COPY . .

# Install all deps (includes @nestjs/cli from apps/api/devDependencies)
RUN cd apps/api && npm install

# Build the NestJS app
RUN cd apps/api && npx nest build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/apps/api/package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/apps/api/dist ./dist

EXPOSE 4000
CMD ["node", "dist/main.js"]
