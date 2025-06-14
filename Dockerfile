
FROM nginx:latest

RUN rm -rf /usr/share/nginx/html/*

COPY . /usr/share/nginx/html

EXPOSE 8000

CMD [ "nginx", "-g", "daemoon off;" ]