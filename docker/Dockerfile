# Development stage
FROM node:20-alpine AS development
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Expose port
EXPOSE 5173

# Default command for development
CMD ["npm", "run", "dev"]

# Production dependencies stage
FROM node:20-alpine AS production-dependencies
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS production
WORKDIR /app

# Copy package files
COPY package*.json ./

# Copy production dependencies
COPY --from=production-dependencies /app/node_modules ./node_modules

# Copy built application
COPY --from=build /app/build ./build

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]