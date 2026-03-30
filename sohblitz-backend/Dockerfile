# -------- Build stage --------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

#ENV DATABASE_URL="postgresql://user:pass@localhost:5432/db"
RUN npx prisma generate

# Build NestJS
RUN npm run build

# -------- Production stage --------
FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache netcat-openbsd

# Copier seulement ce qu'il faut
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts

EXPOSE 3001

#CMD ["node", "dist/src/main.js"]
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/main.js"]