FROM node:14
WORKDIR /app
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port
EXPOSE 3000

# Build extension
RUN npm run compile

# Start the application
CMD ["npm", "run"]
