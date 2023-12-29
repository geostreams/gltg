# GLTG: Geodashboard


Great Lakes to Gulf frontend based on Geostreams and Geodashboard

## Setup
- Initialize git submodule (Data Stories)
    ```bash
    git submodule init
    git submodule update
    ```
- Install dependencies
    ```bash
    yarn
    ```
- Start project
    ```bash
    yarn start
    ```
- Start BMP Project
    ```bash
    yarn bmp:start
    ```
  
## Build
- To build the docker image, a shell scrip is provided which can build two types of image:
    - A password protected image using nginx
    - A non password protected image 
      - To build the password protected image, run the following command:
          ```bash
        ./build_image.sh protected
          ```
      - To build the non password protected image, run the following command:
          ```bash
          ./build_image.sh
        ```
    Note: The password to build the protected image needs to be build using htpasswd and set in the conf folder. 

### Environment variables

| Variable | Type | Default Dev | Default Prod | Description |
|----------|------|-------------|--------------|-------------|
| GEOSERVER_URL | string | https://gltg-dev.ncsa.illinois.edu/geoserver | /geoserver | |
| GEOSTREAMS_URL | string | https://gltg-dev.ncsa.illinois.edu/geostreams | /geostreams | |
| GA_TOKEN | string | | | Google Analytics Token |
| BMP_API_URL | string | https://gltg-dev.ncsa.illinois.edu/bmp-api/v1.0 | /bmp | |


