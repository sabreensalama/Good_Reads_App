# extend base image of node
FROM node:10-alpine

# make dir app working dir
WORKDIR /usr/src/app

# copy package content
COPY package*.json ./

# run npm install 
RUN npm install

# install bcrypt
RUN npm install bcrypt --save

# copy all content
COPY . .

# expose app
EXPOSE 5000

# run app
CMD [ "npm", "start" ]


