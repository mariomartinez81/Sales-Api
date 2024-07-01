
# Sales-Api

## Description
`Sales-Api` is a backend API for managing sales products. It is built with TypeScript and uses Sequelize ORM for database interaction.

## Features
- CRUD operations for products
- Authentication and authorization
- User management
- API documentation with Postman

## Technologies Used
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web framework for Node.js
- **TypeScript**: Programming language that adds static types to JavaScript
- **Sequelize**: ORM for Node.js
- **PostgreSQL**: Relational database management system
- **Docker**: Container platform
- **Jest**: JavaScript testing framework
- **ESLint** and **Prettier**: Tools to maintain clean and formatted code

## Requirements
- Node.js (version 14 or higher)
- Docker
- PostgreSQL

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/mariomartinez81/Sales-Api.git
    cd Sales-Api
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Copy the environment variables example file and configure it:
    ```bash
    cp .env.example .env
    ```

4. Start the services with Docker:
    ```bash
    docker-compose up -d
    ```

## Usage
### Available Scripts
- **Start the server**: 
    ```bash
    npm run dev
    ```
- **Run tests**: 
    ```bash
    npm test
    ```
- **Linting**: 
    ```bash
    npm run lint
    ```

### Endpoints
#### Products
- **GET /api/v1/products**: Get all products
- **POST /api/v1/products**: Create a new product
- **PUT /api/v1/products/:id**: Update an existing product
- **DELETE /api/v1/products/:id**: Delete a product

#### Categories
- **GET /api/v1/products**: Get all products
- **POST /api/v1/products**: Create a new product
- **PUT /api/v1/products/:id**: Update an existing product
- **DELETE /api/v1/products/:id**: Delete a product

### Postman Collection
To test the API, a Postman collection is included in the `postman` directory. To import it:
1. Open Postman.
2. Go to "File" -> "Import".
3. Select "Upload Files" and choose `postman/your_collection.json`.
4. Click "Import".

## Contributions
Contributions are welcome. Please open an issue or a pull request to discuss any changes you would like to make.

## License
This project is licensed under the MIT License. See the `LICENSE` file for more details.

## Contact
For any inquiries, please contact Mario Martínez.
