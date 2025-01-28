FROM node:20-alpine AS create-build
ARG BUILD_ID
ARG IMAGE_NAME
ARG IMAGE_TAG

LABEL stage=create-build \
    image=$IMAGE_NAME-$IMAGE_TAG \
    build_id=$BUILD_ID

WORKDIR /build

COPY package*.json yarn.lock ./
RUN yarn install --frozen-lockfile --verbose

COPY . .
RUN yarn build

FROM node:20-alpine AS production
ARG BUILD_ID
ARG IMAGE_NAME
ARG IMAGE_TAG

LABEL stage=production \
    image=$IMAGE_NAME-$IMAGE_TAG \
    build_id=$BUILD_ID

WORKDIR /app

COPY --chown=node:node --from=create-build /build/package*.json ./
COPY --chown=node:node --from=create-build /build/dist ./dist
COPY --chown=node:node --from=create-build /build/certs /app/certs
COPY --chown=node:node --from=create-build /build/.env.prod ./.env

RUN mkdir -p /app/logs && chown -R node:node /app/logs

RUN yarn install --production --frozen-lockfile --silent

USER node

CMD ["yarn", "run", "start:prod"]