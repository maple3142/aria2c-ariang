FROM node:lts-buster

WORKDIR /app
COPY package.json .
COPY setup.sh .
RUN bash setup.sh
COPY yarn.lock .
RUN yarn
COPY . .
CMD ["bash", "start.sh"]
