FROM node:18-alpine

COPY . .

EXPOSE 3000

RUN pwd

RUN npm ci

CMD npm run resetdb && npm start