FROM node:20-alpine

WORKDIR /usr/src/app

# Copy package + tsconfig first
COPY package*.json tsconfig.json ./

RUN apk add --no-cache python3 make g++

# Install deps (including devDependencies)
RUN npm install

# Copy the rest of the code
COPY . .

# Build TS -> dist
RUN npm run build

EXPOSE 4000

CMD ["node", "dist/index.js"]
