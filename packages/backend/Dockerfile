# Check out https://hub.docker.com/_/node to select a new base image
FROM docker.io/library/node:22-slim

# Install pnpm globally before switching to non-root user
RUN npm install -g pnpm

# Set to a non-root built-in user `node`
USER node

# Create app directory (with user `node`)
RUN mkdir -p /home/node/app

WORKDIR /home/node/app

# Install app dependencies
COPY --chown=node package*.json ./
COPY --chown=node pnpm-lock.yaml ./

RUN pnpm install

# Bundle app source code
COPY --chown=node . .

RUN pnpm run build

# Bind to all network interfaces
ENV HOST=0.0.0.0

EXPOSE 10000
CMD [ "pnpm", "start" ]
