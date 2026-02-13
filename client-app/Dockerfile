FROM node:latest
WORKDIR /app
COPY package*.json ./
RUN yarn install --frozen-lockfile
COPY . .
EXPOSE 3002
CMD [ "yarn", "dev" ]