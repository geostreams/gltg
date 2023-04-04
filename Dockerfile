FROM node:14 as build

ARG GEODASHBOARD_VERSION
ARG GEOSERVER_URL=https://gltg-geoserver.ncsa.illinois.edu/geoserver
ARG GEOSTREAMS_URL=/geostreams
ARG BMP_API_URL=/bmp-api
ARG GA_TOKEN=UA-8681001-7

ENV GEOSERVER_URL=$GEOSERVER_URL
ENV GEOSTREAMS_URL=$GEOSTREAMS_URL
ENV BMP_API_URL=$BMP_API_URL
ENV GA_TOKEN=$GA_TOKEN

RUN git clone https://github.com/geostreams/geodashboard.git /tmp/geodashboard
WORKDIR /tmp/geodashboard
RUN if [[ -z "${GEODASHBOARD_VERSION}" ]] ; then git switch --detach $GEODASHBOARD_VERSION ; fi
RUN yarn && yarn link:all

COPY ./ /tmp/gltg/
WORKDIR /tmp/gltg/
RUN yarn
RUN yarn link @geostreams/core && \
    yarn link @geostreams/core__old && \
    yarn link @geostreams/geostreaming
RUN yarn build

FROM nginx:stable-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY docker/nginx.conf /etc/nginx/conf.d

COPY --from=build /tmp/gltg/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
