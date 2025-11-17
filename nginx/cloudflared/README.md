# Cloudflared Tunnel Setup Guide

This folder is intentionally excluded from version control.

---

## Pre-requisites

* You must already have a purchased domain connected to Cloudflare.

---

## Configuring a Cloudflare Tunnel

- Follow these steps to generate and configure your Cloudflare tunnel.

---
### 1. Log in to Cloudflare from your terminal

```bash
cloudflared login
```

- This creates a `~/.cloudflared` directory containing a `cert.pem` file.

---
### 2. Create your Cloudflare tunnel

```bash
cloudflared tunnel create <tunnel-name>
```

- This generates a `<UUID>.json` file inside the `~/.cloudflared` directory of your pc. This UUID is your **Tunnel ID**.

---
### 3. Adding Certs to this dir

- Grab the certs.perm file created in the `~/.cloudflared` dir and paste it into this directory.
- do the same for <tunnel-id>.json file that was created. For this file ensure you rename it to <tunnel-name>.json.

---
### 4. Create the config.yaml file in this dir

-  Adding in the tunnel ID you just created and adding your domain in the slots where it asks. 
```bash
tunnel: <tunnel-name>
credentials-file: /etc/cloudflared/<tunnel-name>.json

# We can use HTTP port 80 internally here as this network is not exposed to the internet.
ingress:
  - hostname: <domain>
    service: http://nginx:80
    originRequest:
      originServerName: <domain>
      insecureSkipVerify: true
      preserveClientIp: true

  - hostname: www.<domain>
    service: http://nginx:80
    originRequest:
      originServerName: <domain>
      insecureSkipVerify: true
      preserveClientIp: true

  - service: http_status:404


```

---
### 5. Generate DNS routes

Run the following commands to create your DNS records:

```bash
cloudflared tunnel route dns <tunnel-name> <domain-url>
cloudflared tunnel route dns <tunnel-name> www.<domain-url>
```
- These are automatically added after running onto your cloudflare dashboard.
---



## ✅ Tunnel is Live

Your Cloudflare tunnel should now be active upon begining building the docker network.