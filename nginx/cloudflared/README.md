# Cloudflared Tunnel Setup Guide

This folder is intentionally excluded from version control.

---

## 🚀 Pre-requisites

* You must already have a purchased domain connected to Cloudflare.

---

## 🔧 Configuring a Cloudflare Tunnel

Follow these steps to generate and configure your Cloudflare tunnel.

### 1. Log in to Cloudflare from your terminal

```bash
cloudflared login
```

This creates a `~/.cloudflared` directory containing a `cert.pem` file.

---

### 2. Create your Cloudflare tunnel

```bash
cloudflared tunnel create <tunnel-name>
```

This generates a `<UUID>.json` file inside the `~/.cloudflared` directory—this UUID is your **Tunnel ID**.

---

### 3. Generate DNS routes

Run the following commands to create your DNS records:

```bash
cloudflared tunnel route dns <tunnel-name> <domain-url>
cloudflared tunnel route dns <tunnel-name> www.<domain-url>
```

---

### 4. Start the tunnel

```bash
sudo cloudflared tunnel run <tunnel-name>
```

---

## ✅ Tunnel is Live

Your Cloudflare tunnel should now be active and routing traffic through your domain.
