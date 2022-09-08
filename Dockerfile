#Using Node base image for NPM

#FROM registry.hub.docker.com/library/node:14.18.1-alpine as NPM_BUILD_IMAGE
#FROM reg.citytech.global/cityremit/node:14.18.1-alpine as NPM_BUILD_IMAGE
#FROM reg.citytech.global/cityremit/node:14.18.1 as NPM_BUILD_IMAGE
FROM registry.hub.docker.com/library/node:14.18.1 as NPM_BUILD_IMAGE
ARG API_URL
ENV APP_HOME=/home/app/
ENV PATH $APP_HOME/node_modules/.bin:$PATH
ENV REACT_APP_REST_API_HOST=$API_URL
WORKDIR $APP_HOME

COPY package.json $APP_HOME/package.json
COPY yarn.lock $APP_HOME/yarn.lock
# install node dependencies
RUN yarn install

# Sometime "react-scripts" is required to install globally (not compulsary)
# RUN npm install react-scripts@4.0.3 -g --silent

# copy src codes
COPY . $APP_HOME
# create single deployable package
ENV NODE_PATH=src/
RUN yarn build

# production stage
#FROM registry.hub.docker.com/library/nginx:stable-alpine as production-stage
FROM nginx:alpine as production-stage
# Copy deployable package above to nginx image
COPY --from=NPM_BUILD_IMAGE /home/app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

# Port on which server is running
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
