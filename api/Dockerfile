# Use Node.js 22.2.0 (or your desired version)
FROM node:23-alpine

# Install dependencies for node-gyp and native module compilation
RUN apk add --no-cache \
  python3 \
  py3-pip \
  make \
  g++ \
  bash

# Set working directory
WORKDIR /app

# Define build arguments for the ports
ARG S_PORT
ARG PORT

# Set environment variables for runtime
ENV S_PORT=${S_PORT}
ENV PORT=${PORT}

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the ports
EXPOSE ${S_PORT}
EXPOSE ${PORT}

# Start the application
CMD ["npm", "start"]
