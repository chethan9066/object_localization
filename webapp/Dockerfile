FROM node:latest

WORKDIR /webapp

copy . /webapp

RUN npm install

RUN npm build 

CMD ["npm","start"]
