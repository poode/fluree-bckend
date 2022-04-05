FROM node:16.13.1-alpine3.13

ARG APPPATH='/application'
RUN mkdir "$APPPATH"
COPY . "$APPPATH"
WORKDIR "$APPPATH"
RUN npm ci
CMD ["npm", "start"]
