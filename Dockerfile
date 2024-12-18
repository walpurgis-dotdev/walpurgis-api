FROM node:23.0.0-bookworm-slim
RUN apt-get update \
    && apt-get install -y ca-certificates \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /opt/app
WORKDIR /opt/app

COPY .npmrc .
COPY package.json .
COPY package-lock.json .

RUN npm i -g nodemon
RUN npm i

COPY . .

ENV PATH /opt/app/node_modules/.bin:$PATH # 

CMD ["npm", "run", "dev"]