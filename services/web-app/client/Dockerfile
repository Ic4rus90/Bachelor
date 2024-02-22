FROM node:18-alpine

WORKDIR /app

COPY public/ /app/public
COPY src/ /app/src
COPY package.json /app/package.json

RUN npm install

EXPOSE 8500

# Override React default port
ENV PORT=8500

# Start the app in production mode 
CMD ["npm", "start"]
