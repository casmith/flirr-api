FROM node:current-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

RUN npm run build
RUN npm install --global pm2

EXPOSE 8000
CMD [ "pm2", "start", "dist/index.js", "--no-daemon" ]

