## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

- node ^18.x.x
  Use your favorite Package Manager to install Node (at least v18)

- npm
  ```sh
  npm install npm@latest -g
  ```
- yarn
  ```sh
  npm install yarn -g
  ```
- Docker and Docker Compose

### Installation

1. Install the above prerequisites
2. Clone the repo
   ```sh
   git clone https://github.com/ZiiS-ND/opswat-nest-react.git
   ```
3. For client side
   ```sh
   cd client
   yarn install
   cp .env.example .env
   ```
   Then change VITE_BASE_API in .env to `http://localhost:5500/api`
4. For server side `config.js`
   ```sh
   cd server
   yarn install
   cp .env.example .env
   ```
   Then change SECRET in .env to a random string (please don't change it while developing, or else you can't decrypt password and such)
5. At the base folder run

- First time:

```sh
  docker compose up --build
```

- After 1st time:

```sh
  docker compose up
```

Then you can access:

- The frontend at: http://localhost:3333
- The backend at: http://localhost:5500
- PostgreSQL at: http://localhost:5432
  - DB: `demo`
  - USER: `admin`
  - PASS: `admin`
- PG Admin at: http://localhost:5050
  - Login into PG Admin with the following credentials:
  ```
  Email: admin@admin.com
  Password: admin
  ```
- OpenAPI document at: http://localhost:5500/api/docs#/
