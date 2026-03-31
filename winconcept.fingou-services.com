server {
    listen 80;
    server_name winconcept.fingou-services.com www.winconcept.fingou-services.com;

    access_log /var/log/nginx/client1_access.log;
    error_log /var/log/nginx/client1_error.log;

    location / {
        proxy_pass http://127.0.0.1:5172;

        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

