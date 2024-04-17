FROM nginx:1.21.4
# FROM ubuntu:latest


RUN apt-get update 

RUN apt-get install -y nginx-extras
    # rm -rf /var/lib/apt/lists/*


RUN rm /etc/nginx/conf.d/default.conf && \
    rm -rf /usr/share/nginx/html/* && \
    mkdir -p /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/


CMD ["nginx", "-g", "daemon off;"]