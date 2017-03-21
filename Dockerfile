FROM node:boron


#Create app directory
RUN echo 'Start running.......'
RUN mkdir -p /usr/src/node_app
WORKDIR /usr/src/node_app

COPY package.json /usr/src/node_app
RUN npm install 
#Bundle app source

COPY . /usr/src/node_app
EXPOSE 8080

CMD [ "npm","start"]


