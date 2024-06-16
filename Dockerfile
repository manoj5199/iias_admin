FROM node:21-alpine

WORKDIR /IIAS

COPY . . 

RUN npm install

EXPOSE 3000

CMD npm run dev

