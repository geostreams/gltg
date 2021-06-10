FROM node:14 as build

RUN git clone https://github.com/geostreams/geodashboard.git /tmp/geodashboard
WORKDIR /tmp/geodashboard
RUN yarn && yarn link:all

COPY ./ /tmp/gltg/
WORKDIR /tmp/gltg/
RUN yarn
RUN yarn link:geostreams
RUN yarn build

FROM nginx:stable-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY docker/nginx.conf /etc/nginx/conf.d

COPY --from=build /tmp/gltg/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
