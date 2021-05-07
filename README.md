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

### Environment variables

| Variable | Type | Default Dev | Default Prod | Description |
|----------|------|-------------|--------------|-------------|
| GEOSERVER_URL | string | https://gltg-dev.ncsa.illinois.edu/geoserver | /geoserver | |
| GEOSTREAMS_URL | string | https://gltg-dev.ncsa.illinois.edu/geostreams | /geostreams | |
| GA_TOKEN | string | | | Google Analytics Token |
| BMP_API_URL | string | https://gltg-dev.ncsa.illinois.edu/bmp-api/v1.0 | /bmp | |


