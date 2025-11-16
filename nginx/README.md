
# Developer Build Guide (LINUX)
1. Create a nginx.conf in this directory:
- Copy and paste the code below ensuring to fill in your domain & secret-api-key where applicable. 

```bash
worker_processes 1;

events {
    worker_connections 1024;
}

http {
    server_tokens off;
    include mime.types;
    default_type text/html;

    # --- Load balancers ---
    upstream frontend_servers {
        least_conn;
        server frontend-server-0:3000;
        server frontend-server-1:3000;
    }

    upstream game_servers {
        least_conn;
        server game-server-0:3000;
        server game-server-1:3000;
    }

    # --- HTTP redirect to HTTPS ---
    server {
        listen 80;
        server_name <domain>.ca www.<domain>.ca;
        return 301 https://$host$request_uri;
    }

    # --- MAIN HTTPS SERVER ---
    server {
        listen 443 ssl;
        server_name <domain>.ca www.<domain>.ca;

        ssl_certificate /etc/nginx/ssl/nginx-selfsigned.crt;
        ssl_certificate_key /etc/nginx/ssl/nginx-selfsigned.key;

        # Security headers
        add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
        add_header X-Frame-Options "DENY" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header Content-Security-Policy "default-src 'self'; script-src 'self' https://static.cloudflareinsights.com; object-src 'none'; frame-ancestors 'none';" always;
        add_header Cache-Control "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0" always;
        add_header Pragma "no-cache" always;
        add_header Referrer-Policy "no-referrer-when-downgrade" always;

        proxy_hide_header X-Powered-By;


        # ---- ROUTING ----

        # Web API (Auth, profiles, user backend)
        location /api/web/ { 
            proxy_pass http://frontend_servers;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Internal-Auth <secret-api-goes-here>;
        }

        # Game API (lobbies, match, sockets)
        location /api/game/ {
            proxy_pass http://game_servers;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Internal-Auth <secret-api-goes-here>;
        }

        # ====== STATIC FRONTEND (React/Vite) ======

        # Serves index.html and all assets directly from Nginx
        location / {
            root /usr/share/nginx/html;
            try_files $uri /index.html;
        }
    }
}
```

2. After completing the ./cloudflare readme instructions come back here and create a ssl folder. Then store certs created from that README found in the ./cloudflared folder into the ssl folder.

