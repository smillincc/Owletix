FROM node:22-alpine AS builder
WORKDIR /app

# Copy root workspace files
COPY ../../package*.json ./
COPY package*.json ./apps/api/

# Install ALL workspace dependencies including @nestjs/cli
RUN npm install

# Copy API source
COPY . ./apps/api/

WORKDIR /app/apps/api
RUN npx nest build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/apps/api/dist ./dist

EXPOSE 4000
CMD ["node", "dist/main.js"]
