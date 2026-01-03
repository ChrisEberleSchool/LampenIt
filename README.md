# Lampen IT

Dockerized full-stack infrastructure with Node.js backend, react/vite frontend, Nginx reverse proxy, Cloudflared tunnel, API, and game server. Ready for self-hosting secure web services.

---

## System Architecture Overview

This diagram shows how requests flow through the system and how containers communicate via Docker’s private network.

### Containers & Roles
- **cloudflared** – Connects Cloudflare to home network via a secure tunnel.  
- **NGINX** – Reverse proxy, routes requests to backend services, applies security headers.  
- **frontend-server-0 / frontend-server-1** – Web API containers serving the frontend endpoints.  
- **game-server-0 / game-server-1** – Game API containers handling real-time game logic.  
- **db** – PostgreSQL database, accessible only by backend containers.  

### Communication Flow
```text
               Client
                 |
                 | HTTPS
                 v
           Cloudflare CDN
                 |
                 | Encrypted Tunnel (Cloudflared)
                 v
    LAMPEN-IT LOCAL DOCKER NETWORK   
--------------------------------------                
|                                    |
|               Nginx                |
|               /   \   HTTP         | # HTTPS is not required internally.
|              /     \               |
|  web-server-0  <->  web-server-1   |
| game-server-0  <->  game-server-1  |
|             \      /               |
|              \    /                |
|                db                  |
--------------------------------------               
```

### Network Notes
- All backend containers run on a **Docker bridge network** (`lampenit-net`) with **private IPs**.  
- Containers can use the same internal ports (e.g., `3000`) without conflicts.  
- No public ports are exposed directly; all external traffic passes through Cloudflare and the tunnel.  
- Internal communication between containers is private, isolated from the host network. Which allows us to use http for internal comms.

---

## Project Structure

- Each directory in this repository includes its own **README** detailing how to set up and understand that specific component.

---

# Developer Build Guide (LINUX)

1. Ensure you have Docker Desktop installed on PC.
2. Setup Cloudflare tunnel (See README in nginx/cloudflared)
3. install packages and follow setup guide READMEs in folders game-server, web-server, front-end & nginx.
4. Create the docker Architecture
    
        docker compose up --build --force-recreate --remove-orphans -d
---

# Additional useful commands

## KVM error with docker
1. Enabling KVM extension to run Docker on Ubuntu:

        sudo modprobe kvm                                               
        sudo modprobe kvm_amd

2. Disabling KVM extension to run VM on Ubuntu:

        sudo modprobe -r kvm_amd
        sudo modprobe -r kvm

## Docker commands
1. Reading each docker container:

        docker ps

2. Live logs of docker processes:

        docker logs -f <container-id>

3. Docker build with errors logged to terminal for debug:

        docker compose up --build --force-recreate --remove-orphans

4. Docker build regular:

        ocker compose up --build --force-recreate -d

## git helper commands
1. Reset tracking

        git rm -r --cached . 