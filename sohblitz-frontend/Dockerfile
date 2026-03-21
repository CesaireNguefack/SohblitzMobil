# -------- 1. Build stage --------
FROM node:20-alpine AS builder

WORKDIR /app

# Installer dépendances
COPY package*.json ./
RUN npm install

# Copier le reste du code
COPY . .

# Build Next.js
RUN npm run build

# -------- 2. Production stage --------
FROM node:20-alpine

WORKDIR /app

# Copier uniquement le nécessaire depuis builder
COPY --from=builder /app ./

# Exposer le port Next.js
EXPOSE 3000

# Lancer en mode production
CMD ["npm", "run", "start", "--", "-H", "0.0.0.0"]