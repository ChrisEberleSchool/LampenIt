# Lampen IT

A fully self-hosted, full-stack, containerized web experience built with **Node.js**, **Express**, **Nginx**, **Docker**, and secured through a **Cloudflared Tunnel**.

Lampen IT is a modern web application where people can **hang out, chat, explore, and connect** all running on your own infrastructure.

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
    
        sudo docker compose --build -d

4. Start cloudflared tunnel in persistent foreground terminal
    
        cloudflared tunnel run
---