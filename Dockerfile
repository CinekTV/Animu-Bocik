## this is stage two, installing packages
FROM node:16-alpine
WORKDIR /dist
COPY package.json ./
RUN npm install --only=production --target_arch=arm64/v8 --target_platform=linux
## run app
FROM --platform=linux/arm64/v8 node:16-alpine
WORKDIR /dist
COPY *.js ./
COPY models/ ./models
COPY karty/ ./karty
COPY package.json ./
COPY --from=0 ./dist/node_modules ./node_modules
CMD [ "node", "." ]