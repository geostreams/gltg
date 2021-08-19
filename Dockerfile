FROM node:14 as build

ARG GEODASHBOARD_VERSION
ARG GEOSERVER_URL=/geoserver
ARG GEOSTREAMS_URL=/geostreams
ARG BMP_API_URL=/bmp-api

ENV GEOSERVER_URL=$GEOSERVER_URL
ENV GEOSTREAMS_URL=$GEOSTREAMS_URL
ENV BMP_API_URL=$BMP_API_URL

RUN git clone https://github.com/geostreams/geodashboard.git /tmp/geodashboard
WORKDIR /tmp/geodashboard
RUN if [[ -z "${GEODASHBOARD_VERSION}" ]] ; then git switch --detach $GEODASHBOARD_VERSION ; fi
RUN yarn && yarn link:all

COPY ./ /tmp/gltg/
WORKDIR /tmp/gltg/
RUN yarn
RUN yarn build

FROM nginx:stable-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY docker/nginx.conf /etc/nginx/conf.d

COPY --from=build /tmp/gltg/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
