# Recipe API with node and neo4j

## Prerequisites

### Must be installed
- Docker

Must be available in the command line

## Development

### To start app run

```
./build.sh
```

### To hot-reload app

To run the app for development, comment in lines in docker-compose.yml file.

Environment variable means that node-dev is run instead of node

Volumes is mounting out local files into the container so that changes locally will propagte to the container

## TODO

- Security (frontend and API)
- Backup (neo4j database)
- Continuous deployment (with tests)
- OWASP
- refine responses from endpoints
