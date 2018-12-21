FROM node:10
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY . /home/node/app
RUN npm install
EXPOSE 4000
CMD [ "npm", "start" ]