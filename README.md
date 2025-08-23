# Docker Test Project with PostgreSQL

A Node.js application with PostgreSQL database running in Docker containers, featuring a complete CRUD API for user management.

## 🚀 Features

- **Node.js Express Server** with RESTful API
- **PostgreSQL Database** with persistent data storage
- **Complete CRUD Operations** for user management
- **Docker & Docker Compose** for easy deployment
- **Health Checks** and monitoring endpoints
- **Development & Production** configurations

## 🏗️ Project Structure

```
docker_test_project/
├── src/
│   ├── app.js              # Main application server
│   ├── config/
│   │   └── database.js     # Database configuration
│   ├── models/
│   │   └── User.js         # User model with CRUD operations
│   └── routes/
│       └── users.js        # User API routes
├── test/
│   └── test.js             # Test files
├── Dockerfile               # Production Docker image
├── Dockerfile.dev          # Development Docker image
├── compose.yaml            # Production Docker Compose
├── compose.dev.yaml        # Development Docker Compose
├── init.sql                # Database initialization script
└── package.json            # Node.js dependencies
```

## 🛠️ Prerequisites

- Docker Desktop
- Docker Compose
- Node.js 18+ (for local development)

## 🚀 Quick Start

### 1. Clone and Setup

```bash
git clone <your-repo>
cd docker_test_project
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run with Docker Compose

#### Production Mode
```bash
docker-compose up --build
```

#### Development Mode (with hot reload)
```bash
docker-compose -f compose.dev.yaml up --build
```

### 4. Access the Application

- **Main App**: http://localhost:9000
- **Health Check**: http://localhost:9000/health
- **API Info**: http://localhost:9000/info
- **Users API**: http://localhost:9000/api/users

## 📊 Database

The PostgreSQL database includes:

- **Database Name**: `testdb`
- **Username**: `postgres`
- **Password**: `postgres123`
- **Port**: `5432` (exposed in dev mode)

### Sample Data

The database is initialized with sample users:
- John Doe (john@example.com, age 30)
- Jane Smith (jane@example.com, age 25)
- Bob Johnson (bob@example.com, age 35)

## 🔌 API Endpoints

### Users API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/users` | Get all users |
| `GET` | `/api/users/count` | Get total user count |
| `GET` | `/api/users/search?q=term` | Search users by name |
| `GET` | `/api/users/:id` | Get user by ID |
| `POST` | `/api/users` | Create new user |
| `PUT` | `/api/users/:id` | Update user |
| `DELETE` | `/api/users/:id` | Delete user |

### Request/Response Examples

#### Create User
```bash
curl -X POST http://localhost:9000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "age": 28
  }'
```

#### Get All Users
```bash
curl http://localhost:9000/api/users
```

#### Update User
```bash
curl -X PUT http://localhost:9000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Updated",
    "email": "john.updated@example.com",
    "age": 31
  }'
```

#### Delete User
```bash
curl -X DELETE http://localhost:9000/api/users/1
```

## 🐳 Docker Commands

### Build and Run
```bash
# Build images
docker-compose build

# Run services
docker-compose up

# Run in background
docker-compose up -d

# View logs
docker-compose logs -f
```

### Development Mode
```bash
# Run development environment
docker-compose -f compose.dev.yaml up --build

# View development logs
docker-compose -f compose.dev.yaml logs -f server
```

### Stop Services
```bash
# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

## 🔧 Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NODE_ENV` | `development` | Environment mode |
| `PORT` | `9000` | Server port |
| `DB_HOST` | `db` | Database host |
| `DB_PORT` | `5432` | Database port |
| `DB_NAME` | `testdb` | Database name |
| `DB_USER` | `postgres` | Database user |
| `DB_PASSWORD` | `postgres123` | Database password |

### Database Configuration

The database connection uses connection pooling with:
- **Max Connections**: 20
- **Idle Timeout**: 30 seconds
- **Connection Timeout**: 2 seconds

## 🧪 Testing

### Run Tests
```bash
npm test
```

### Manual API Testing

You can use tools like:
- **Postman**
- **Insomnia**
- **cURL**
- **Thunder Client** (VS Code extension)

## 📝 Development

### Local Development (without Docker)

1. Install PostgreSQL locally
2. Create database `testdb`
3. Run `npm install`
4. Set environment variables
5. Run `npm run dev`

### Code Structure

- **Models**: Database operations and business logic
- **Routes**: API endpoint handlers
- **Config**: Database and application configuration
- **Middleware**: Express middleware (CORS, JSON parsing)

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check if PostgreSQL container is running
   - Verify environment variables
   - Check container logs: `docker-compose logs db`

2. **Port Already in Use**
   - Change port in compose files
   - Stop conflicting services

3. **Permission Denied**
   - Run Docker commands with appropriate permissions
   - Check file ownership

### View Logs
```bash
# All services
docker-compose logs

# Specific service
docker-compose logs server
docker-compose logs db

# Follow logs
docker-compose logs -f
```

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Reference](https://docs.docker.com/compose/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Express.js Documentation](https://expressjs.com/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
