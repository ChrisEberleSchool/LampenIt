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

- This generates a `<UUID>.json` file inside the `~/.cloudflared` directory—this UUID is your **Tunnel ID**.

---
### 3. Create the config.yaml file in this dir, Adding in the tunnel ID you just created and adding your domain in the slots where it asks. Make sure the credentials-file and origincert paths match that of your computer.
```bash
tunnel: <tunnel-id>
credentials-file: /home/<usr>/.cloudflared/<tunnel-id>.json
origincert: /home/<usr>/.cloudflared/cert.pem 

ingress:
  - hostname: <domain>ca
    service: https://<domain>:443
    originRequest:
      originServerName: <domain>.ca
      insecureSkipVerify: true
  - hostname: www.<domain>.ca
    service: https://<domain>:443
    originRequest:
      originServerName: <domain>.ca
      insecureSkipVerify: true
  - service: http_status:404

```

### 4. Also add the config.yaml you just modified to the `~/.cloudflared` dir you created in step 1.

---
### 5. Generate DNS routes

Run the following commands to create your DNS records:

```bash
cloudflared tunnel route dns <tunnel-name> <domain-url>
cloudflared tunnel route dns <tunnel-name> www.<domain-url>
```
- These are automatically added after running onto your cloudflare dashboard.
---

### 6. Start the tunnel

```bash
sudo cloudflared tunnel run <tunnel-name>
```

---

## ✅ Tunnel is Live

Your Cloudflare tunnel should now be active and routing traffic through your domain.