FROM node:18
ENV NODE_ENV=local

ENV JWT_SECRET=starboy

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

# Install app dependencies and rebuild native addons
RUN npm install

EXPOSE 8080

CMD [ "npm", "run", "start:local"]