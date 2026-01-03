# Cloudflared Tunnel Setup Guide

This folder is intentionally excluded from version control.

---

## Pre-requisites

* You must already have a purchased domain connected to Cloudflare.

---

## Configuring a Cloudflare Tunnel

- Follow these steps to generate and configure your Cloudflare tunnel.

---
### 1. Log in to Cloudflare fashboard

- Once logged in you can navigate to zero-trust->Networks->Tunnels and create your tunnel

---
### 2. Create your Cloudflare tunnel


- Keep everything to default values except enter in your domain, pick HTTP, and set service url to nginx:80

## Tunnel is Live

Your Cloudflare tunnel should now be active upon begining building the docker network.