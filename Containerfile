FROM docker.io/node:16-bullseye
ENV REACT_APP_BACKEND_URL="https://api.elementum-project.uk"
WORKDIR /var/lib/elementum-frontend
COPY . .
RUN npm ci --silent
RUN npm run build

FROM docker.io/nginx:latest
COPY --from=0 /var/lib/elementum-frontend/build /usr/share/nginx/html
