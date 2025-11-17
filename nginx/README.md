
# Developer Build Guide (LINUX)
1. Create a nginx.conf in this directory:
- Copy and paste the code below ensuring to fill in your domain & secret-api-key where applicable. 

```bash
worker_processes 2;

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

    # --- HTTP ONLY (AS NGINX IS INTERNAL)---
    server {
        listen 80;
        server_name <domain> www.<domain>;

        # --- Cross-Origin Policies ---
        add_header Cross-Origin-Opener-Policy "same-origin" always;
        add_header Cross-Origin-Resource-Policy "same-origin" always;
        add_header Cross-Origin-Embedder-Policy "require-corp" always;

        add_header Permissions-Policy "accelerometer=(), camera=(), microphone=(), geolocation=()" always;

        # --- Standard Security Headers ---
        add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
        add_header X-Frame-Options "DENY" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;

        # --- Content Security Policy ---
        add_header Content-Security-Policy "
            default-src 'self';
            script-src 'self' https://static.cloudflareinsights.com;
            object-src 'none';
            frame-ancestors 'none';
        " always;

        # --- Caching ---
        add_header Cache-Control "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0" always;
        add_header Pragma "no-cache" always;

        # --- Identity Obfuscation ---
        add_header Server "Secure" always;

        # --- Referrer Policy ---
        add_header Referrer-Policy "strict-origin-when-cross-origin" always;

        # --- Hide Server-Side Headers From Upstream ---
        proxy_hide_header X-Powered-By;


        # ====== STATIC FRONTEND (React/Vite) ======

        # Serves index.html and all assets directly from Nginx
        location / {
            root /usr/share/nginx/html;
            try_files $uri /index.html;
        }

        # ====== Web API (Auth, profiles, user backend) ======
        location /api/web/ { 
            proxy_pass http://frontend_servers;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $http_cf_connecting_ip;
            proxy_set_header X-Forwarded-For $http_cf_connecting_ip;
        
            # Auth Key for Internal API calls
            proxy_set_header X-Internal-Auth <created-auth-token>;
        }
        # ====== Game API (lobbies, match, sockets) ======
        location /api/game/ {
            proxy_pass http://game_servers;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $http_cf_connecting_ip;
            proxy_set_header X-Forwarded-For $http_cf_connecting_ip;
            
            # Auth Key for Internal API calls
            proxy_set_header X-Internal-Auth <created-auth-token>;
        }
    }
}
```
