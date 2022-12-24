FROM node:18

WORKDIR /gapp

COPY package*.json ./

COPY prisma ./prisma/

COPY .env ./

COPY tsconfig.json ./

RUN npm install

COPY . .

RUN npx prisma generate

ENV PORT=5173

EXPOSE 5173

CMD [ "npm", "run", "dev" ]