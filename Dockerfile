# syntax=docker/dockerfile:1

# --- build ---
FROM node:22-alpine AS builder
WORKDIR /app

RUN corepack enable

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
# Optional: pass API URL at image build time, e.g.
# docker build --build-arg VITE_API_URL=https://api.example.com .
ARG VITE_API_URL=
ENV VITE_API_URL=${VITE_API_URL}

RUN yarn build

# --- serve static ---
FROM nginx:1.27-alpine AS runner

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
