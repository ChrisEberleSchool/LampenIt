# Lampen IT

A fully self-hosted, full-stack, containerized web experience built with **Node.js**, **Express**, **Nginx**, **Docker**, and secured through a **Cloudflared Tunnel**.

Lampen IT is a modern web application where people can **hang out, chat, explore, and connect** all running on your own infrastructure.

---

## Project Overview

Lampen IT is designed around a fully self-contained and reproducible environment. Everything — backend, frontend, proxy, SSL, tunneling — is managed inside Docker, giving you:

* **Consistent deployments**
* **Self-hosted control**
* **A production-ready Nginx reverse proxy**
* **Secure public access via Cloudflared tunnels**
* **A modular directory structure**, each with its own setup guide

---

## Tech Stack

### **Backend**

* Node.js
* Express.js

### **Infrastructure**

* Docker & Docker Compose
* Nginx (reverse proxy)
* Cloudflared Tunnel (secure domain exposure)

### **Other**

* Environment variable separation (`.env` per service)
* Modular configuration

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
/cloudflared/README.md
```

---

## Docker + Nginx Architecture

Your system runs inside Docker containers orchestrated with Docker Compose. Nginx acts as:

* A reverse proxy
* A traffic router
* A static asset server

This provides a clean, scalable deployment pattern.

Full details are provided in:

```
/web-server/README.md
```

---

## Running the Application

Once configured, starting your application is as simple as:

```bash
docker compose up -d --build
```

Your services — Express backend, Nginx proxy, Cloudflare Tunnel — all come online automatically.

---

## Features

* Fully self-hosted platform
* Secure Cloudflare Tunnel exposure
* Hangout & chat system
* Modular, clean directory structure
* Infrastructure built for long-term stability

---

## Contribution & Development

More detailed instructions for local development and contribution live inside each directory’s README.

If you are extending or modifying a service, always check its specific guide.

---

## About Lampen IT

Lampen IT is meant to be a fun space — a customizable, personal digital environment where people can interact and explore, powered by modern hosting practices.

Feel free to fork, customize, break, rebuild, and make it your own.

---

