FROM oven/bun:1.1.30 AS base

WORKDIR /usr/src/app

FROM base AS install

RUN mkdir -p /tmp/dev

COPY package.json bun.lockb /tmp/dev/
RUN cd /tmp/dev && bun install --frozen-lockfile

RUN mkdir -p /tmp/prod

COPY package.json bun.lockb /tmp/prod/
RUN cd /tmp/prod && bun install --frozen-lockfile --production

FROM base AS prerelease

COPY --from=install /tmp/dev/node_modules node_modules
COPY . .

ENV NODE_ENV=production
RUN bun test
RUN bun run build

FROM base AS release

COPY --from=install /tmp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/dist dist
COPY --from=prerelease /usr/src/app/package.json package.json

USER bun
ENV PORT=3000
EXPOSE 3000/tcp 

ENTRYPOINT [ "bun", "run", "start" ]
