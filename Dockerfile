# Use official Node.js LTS image
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy app files
COPY package*.json ./
COPY application.js ./

# Install dependencies (if any)
RUN npm install --only=prod

# Expose port
EXPOSE 3000

# Start the app
CMD ["node", "application.js"]