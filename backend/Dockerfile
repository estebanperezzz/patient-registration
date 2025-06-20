# backend/Dockerfile

# --- Stage 1: Install dependencies ---
FROM node:20-alpine AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install

# --- Stage 2: Build the application ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

# --- Stage 3: Final Production image ---
FROM node:20-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev

# Copy the compiled JavaScript code from the 'builder' stage.
COPY --from=builder /app/dist ./dist

# Copy the Prisma schema (needed by Prisma Client at runtime).
COPY prisma/schema.prisma ./prisma/

# --- LÍNEA AÑADIDA Y CRUCIAL ---
# Copy the generated Prisma Client files from the 'builder' stage.
# This ensures the production container has the ready-to-use client.
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Expose the port on which our application will run.
EXPOSE 3001

# The default command to run when the container starts.
CMD ["node", "dist/server.js"]