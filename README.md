# shop example for js individual project

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) version 23 or later
- [Docker](https://www.docker.com/) and Docker Compose

### Setup and Running the Application

1. **environment variables**
    In root/backend/.env configure the necesar env for this project.
    `DATABASE_URL`

2.  **Start the database:**
    Open a terminal and run the following command from the project root/backend directory:

    ```bash
    docker compose -f docker-compose.dev.yaml up -d
    ```

3.  **Install dependencies:**

    ```bash
    npm install
    ```

4.  **Migrate prisma:**

    ```bash
    npx prisma migrate reset
    ```

5.  **Start the development server:**
    This command will start the backend server.
    ```bash
    npm run dev
    ```

6.  **Start the client side:**
    This command will start the frontend, enter root/frontend.
    ```bash
    npm i -g live-server
    live-server
    ```
    Acces home.html
    Also you can run the front with whatever you want, using pre build [live-server](https://marketplace.visualstudio.com/items/?itemName=yandeu.five-server) package from VSCode extensions.

The application should now be running.
