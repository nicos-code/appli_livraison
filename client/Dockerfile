FROM node:18-alpine

COPY . .

EXPOSE 3001

RUN pwd

RUN ["npm", "ci"]

CMD ["npm", "start"]