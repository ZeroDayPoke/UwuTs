FROM ubuntu:22.04

# Update and install dependencies
RUN apt-get update && apt-get install -y \
    curl \
    git \
    gnupg \
    build-essential

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install -y nodejs

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy project files into the container
COPY . .

# Install project dependencies
RUN npm install

# Expose the port
EXPOSE 3000

# Run the command to start the app
CMD ["npm", "run", "dev"]
