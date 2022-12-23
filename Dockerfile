FROM node:18

WORKDIR /gapp

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install
RUN npm run build

COPY . .

ENV PORT=5173

EXPOSE 5173

CMD [ "npm", "run", "dev" ]