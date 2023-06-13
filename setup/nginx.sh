#!/usr/bin/env bash
# Nginx setup script for tulsahousesales.com

set -e

# Define variables for domain and project path
domain="tulsahousesales.com"

# Create a new Nginx configuration file
sudo bash -c "cat > /etc/nginx/sites-available/$domain << 'EOL'
server {
    listen 80;
    server_name $domain www.$domain;

    location / {
        proxy_pass http://127.0.0.1:3100;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    }
}
EOL"

# Create a symbolic link to enable the new site configuration
sudo ln -sf /etc/nginx/sites-available/$domain /etc/nginx/sites-enabled/

# Test the Nginx configuration
sudo nginx -t

# Reload the Nginx service to apply the new configuration
sudo systemctl reload nginx
