# SSL Certificates

This folder is intentionally excluded from version control.
SSL certificate and key files will **not** be included in the Git repository for security reasons.

## Generating Local Development Certificates

To generate a self-signed certificate for local development:

1. Open a terminal
2. Navigate into this directory:

   cd ssl

3. Run the following command:

   openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout nginx-selfsigned.key -out nginx-selfsigned.crt

This will create:

- nginx-selfsigned.crt — the certificate
- nginx-selfsigned.key — the private key

These files should **never** be committed to Git.
