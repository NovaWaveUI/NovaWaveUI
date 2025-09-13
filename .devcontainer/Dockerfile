# Get the official Node.js 22 image based on Debian Bookworm
FROM node:22-bookworm

# Install essential tools and libraries
RUN apt-get update && apt-get install -y \
    git \
    bash-completion \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /workspace

# Install bash completion for git
RUN echo "source /usr/share/bash-completion/bash_completion" >> ~/.bashrc && \
    echo "complete -o bashdefault -o default -o nospace -F _git git" >> ~/.bashrc

# Install pnpm globally
RUN npm install --global corepack@latest
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set the default command to bash
CMD ["bash"]

# Default user is node, can be changed in devcontainer.json
ENV USERNAME=node
USER $USERNAME
