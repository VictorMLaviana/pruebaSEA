FROM node:10
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN yarn install
EXPOSE 5000
EXPOSE 9229
CMD [ "yarn", "start" ]
