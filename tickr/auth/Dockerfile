FROM node:20-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /usr/tickr/auth


COPY ./package.json ./

RUN pnpm install

COPY ./ ./

RUN pnpm install typescript -g
RUN tsc

EXPOSE 4000

CMD [ "pnpm", "start" ]
