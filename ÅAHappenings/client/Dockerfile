FROM node:lts-alpine AS builder

RUN apk add --no-cache build-base libc6-compat gcompat curl

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build


FROM nginx:stable-alpine
RUN apk --no-cache add ca-certificates
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80