# Lampen It - Developer Setup

```bash
# 1. Build & Start backend Docker servers
docker compose up --build -d

# 2. Test and start NGINX
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl status nginx

# 3. Run Cloudflare Tunnel
# Ensure you have .cloudflared/config.yaml set up:
# tunnel: <tunnel-uuid>
# credentials-file: /home/user/.cloudflared/<tunnel-uuid>.json
# ingress:
#   - hostname: <domain-name>
#     service: https://localhost:443
#     originRequest:
#       insecureSkipVerify: true
#   - hostname: www.fishhub.ca
#     service: https://localhost:443
#     originRequest:
#       insecureSkipVerify: true
#   - service: http_status:404

cloudflared tunnel run lampenit-tunnel
```

**Notes:**
- Start backend Docker servers → NGINX → Cloudflare Tunnel (order matters)
- Cloudflare DNS must point to this tunnel
- Self-signed SSL requires `insecureSkipVerify: true` in config