FROM node:18
WORKDIR /app
COPY package.json ./

RUN if [ "$NODE_ENV" = "development" ]; \
    then yarn; \
    else yarn --only=production; \ 
    fi

COPY ./ ./
# EXPOSE 3001
CMD ["yarn", "start:dev"]
