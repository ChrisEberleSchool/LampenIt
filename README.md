# Lampen IT

Dockerized full-stack infrastructure with Node.js backend, react/vite frontend, Nginx reverse proxy, Cloudflared tunnel, API, and game server. Ready for self-hosting secure web services.

---

## Project Structure

Each directory in this repository includes its own **README** detailing how to set up and understand that specific component.

---

## Cloudflare Tunnel Integration

Lampen IT uses **Cloudflared Tunnels** instead of open firewall ports. This gives you:

* Encrypted communication from Cloudflare → your server
* No need to expose ports to the public internet
* Automatic DNS wiring through Cloudflare
* Stable connections even on dynamic IPs

Setup instructions for the Cloudflare tunnel live in:

```
web-server/cloudflared/README.md
```

---

# Developer Build Guide (LINUX)

1. Setup Cloudflare tunnel (See README in nginx/cloudflared)

2. install packages following READMEs in game-server & web-server.

3. Create the docker Architecture
    
        sudo docker compose up --build -d

4. Start cloudflared tunnel in persistent foreground terminal
    
        cloudflared tunnel run
---
