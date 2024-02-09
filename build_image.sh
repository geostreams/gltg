#!/bin/bash

# Default Dockerfile is no_auth
DOCKERFILE="Dockerfiles/no_auth.Dockerfile"

# If 'with_auth' argument is provided, use the corresponding Dockerfile
if [ "$1" == "protected" ]; then
    DOCKERFILE="Dockerfiles/with_auth.Dockerfile"
fi

# Set the image name
IMAGE_NAME="gltg"

# Build the Docker image
echo "Building Docker image using $DOCKERFILE"
docker build -t $IMAGE_NAME -f $DOCKERFILE .

# Check if the build was successful
if [ $? -eq 0 ]; then
    echo "Docker image built successfully."
else
    echo "Failed to build Docker image."
    exit 1
fi
