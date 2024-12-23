# Backend Dockerfile

# Stage 1: Build the application
FROM node:alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the source code
COPY . .

# Generate the prisma client schema
RUN npx prisma generate

# Copy the seed script
COPY prisma/seed.ts ./prisma/seed.ts

# Build the application
RUN npm run build

# Stage 2: Run the application
FROM node:alpine

WORKDIR /app

#@@ This was necessary because Prisma requires OpenSSL to run properly
#@@ I believe this is what was causing the issues with docker builds.
RUN apk add --no-cache openssl

# Copy the necessary files
COPY package*.json ./
RUN npm install


# Copy build files from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/entrypoint.sh ./entrypoint.sh

# Make entrypoint.sh executable in the final image
RUN chmod +x ./entrypoint.sh

# Expose the port
EXPOSE 3000

# Set the entrypoint
ENTRYPOINT ["./entrypoint.sh"]
#@@ The `entrypoint.sh` file runs the `prisma generate` and `prisma migrate` commands and starts
#@@ the production build.