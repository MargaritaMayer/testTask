# docker build -t rita-website .
# docker run -it --rm -p 80:80 rita-website

FROM node:16.10.0 as build-image

ENV DEBIAN_FRONTEND=noninteractive

COPY . /app

RUN set -ex \
	&& cd /app \
	&& npm install -g @angular/cli@^14.0.0 \
	&& npm install \
	&& ng build


FROM nginx

RUN cat > /etc/nginx/conf.d/default.conf <<EOF
server {
    listen 80;
    server_name default;
    index index.html;
    root /usr/share/nginx/html;
    location / {
        try_files \$uri \$uri/ /index.html;
    }
}
EOF

COPY --from=build-image /app/dist/* /usr/share/nginx/html