# Lampen It — Developer Setup Guide (LINUX)

## Starting the Web Server After a PC Shutdown

1. Navigate to the web-server directory:
    
        cd /path/to/web-server

2. Start the Docker services:
    
        sudo docker compose up -d

3. Start the NGINX reverse proxy:
    
        sudo nginx -t
        sudo systemctl restart nginx
        sudo systemctl status nginx

4. Start the Cloudflare Tunnel (currently runs in the foreground):
    
        sudo cloudflared tunnel run <tunnel-name>

   This may be converted to a background systemd service in the future.

---

## Rebuilding the Project From Scratch

### Prerequisites
- NGINX
- Docker Desktop

### Steps

1. Update the NGINX configuration  
   Edit the nginx.conf file in this repository and replace placeholder URLs with your actual domain.

2. Replace your system's NGINX configuration  
   Copy the updated config into your system’s NGINX directory (commonly /etc/nginx).

3. Update the Docker Compose file  
   Edit docker-compose.yaml and change container/server names as needed.

4. Set up the Cloudflare Tunnel  
   Follow the instructions in the /cloudflared directory.

5. Build and start the Docker containers:
    
        docker compose up --build -d

6. Start NGINX:
    
        sudo nginx -t
        sudo systemctl restart nginx
        sudo systemctl status nginx

7. Start the Cloudflare Tunnel:
    
        sudo cloudflared tunnel run <tunnel-name>

---

## Important Notes
- Startup order matters: Docker containers → NGINX → Cloudflare Tunnel
- Cloudflare DNS must point to this tunnel.
- If using self-signed SSL, include this in your Cloudflare config:

        insecureSkipVerify: true
