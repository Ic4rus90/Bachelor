# Stage 1: Build React app
FROM node:18-alpine

WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json /app/

# Install the dependencies
RUN npm install

# Copy the rest of the files
COPY public/ /app/public
COPY src/ /app/src
COPY cair-gpu12.uia.no.crt .
COPY cair-gpu12.uia.no.key .

# Remove the EXPOSE, ENV and CMD when going for production, and uncomment following:
# RUN npm run build
EXPOSE 8500

# Override React default port
ENV PORT=8500

# Start the app
CMD ["npm", "start"]

# Stage 2: Serve React app
# FROM nginx:alpine
#
# COPY --from=build /app/build /usr/share/nginx/html
#
# EXPOSE 80
#


