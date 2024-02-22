## Dev step

- Install node
- Install nest cli "npm install -g @nestjs/cli"
  https://docs.nestjs.com/cli/overview
- Install pnpm
  npm i -g pnpm
- Install Docker Desktop
  https://www.docker.com/products/docker-desktop/
- Clone repo
- In command-prompt/terminal, go to project root and execute "docker-compose up"

## Micro services

- 1. Auth microservice (http://localhost:3003)
- 2. product microservice (http://localhost:3002)

### Test

- Create user
  curl --location 'http://localhost:3003/api/v1/users' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "email":"",
  "password":"abc123##A",
  }'

- Login
  curl --location 'http://localhost:3003/api/v1/auth/login' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "email":"",
  "password":"abc123##A"
  }'

- CRUD
  GET 'http://localhost:3002/api/v1/products'

