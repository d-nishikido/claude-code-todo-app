# Todo App Project

## Overview
A simple Todo application built with modern web technologies, featuring task management capabilities with PostgreSQL for data persistence and comprehensive testing.

## Technology Stack
- **Frontend Framework**: React Router v7
- **Language**: TypeScript 5.x
- **Database**: PostgreSQL 16
- **Testing**: Vitest (unit/integration), Playwright (E2E)
- **Containerization**: Docker & Docker Compose
- **Package Manager**: npm
- **Build Tool**: Vite
- **Styling**: CSS Modules / Tailwind CSS (TBD)
- **Linting**: ESLint
- **Formatting**: Prettier

## Project Structure
```
todo-app/
├── src/
│   ├── components/     # React components
│   ├── routes/         # React Router v7 routes
│   ├── hooks/          # Custom React hooks
│   ├── services/       # API services and business logic
│   ├── utils/          # Utility functions
│   ├── types/          # TypeScript type definitions
│   └── styles/         # Global styles
├── tests/
│   ├── unit/           # Vitest unit tests
│   ├── integration/    # Vitest integration tests
│   └── e2e/            # Playwright E2E tests
├── db/
│   ├── migrations/     # Database migrations
│   └── seeds/          # Database seed data
├── docker/
│   ├── Dockerfile      # Multi-stage build
│   └── docker-compose.yml
└── public/             # Static assets
```

## Development Commands
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run test` - Run Vitest unit/integration tests
- `npm run test:e2e` - Run Playwright E2E tests
- `npm run lint` - Run ESLint
- `npm run format` - Run Prettier
- `npm run typecheck` - Run TypeScript type checking
- `docker-compose up` - Start all services in Docker
- `docker-compose down` - Stop all Docker services
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with sample data

## Docker Commands
- `docker-compose up -d` - Start services in detached mode
- `docker-compose logs -f app` - Follow app logs
- `docker-compose exec db psql -U todouser -d tododb` - Access PostgreSQL CLI
- `docker-compose build --no-cache` - Rebuild images from scratch

## Database Schema
```sql
-- todos table
CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## API Endpoints
- `GET /api/todos` - Get all todos
- `GET /api/todos/:id` - Get single todo
- `POST /api/todos` - Create new todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo

## Coding Conventions
- Use functional components with TypeScript
- Follow React Router v7 patterns for routing
- Use custom hooks for shared logic
- Keep components small and focused
- Write tests for all new features
- Use semantic commit messages (feat:, fix:, docs:, etc.)
- Use 2-space indentation
- Prefer const over let
- Use async/await over promises
- Always define TypeScript types/interfaces
- No any types unless absolutely necessary

## Testing Guidelines
- Write unit tests for utility functions and hooks
- Write integration tests for API services
- Write E2E tests for critical user flows
- Maintain test coverage above 80%
- Use data-testid attributes for E2E test selectors
- Mock external dependencies in tests

## Git Workflow
- Feature branches: `feature/description`
- Bug fix branches: `fix/description`
- Always create PR for main branch
- Squash commits when merging
- Delete branches after merge

## Environment Variables
```env
# .env.example
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://todouser:todopass@localhost:5432/tododb
VITE_API_URL=http://localhost:3000/api
```

## Performance Considerations
- Implement pagination for todo lists
- Use React.memo for expensive components
- Lazy load routes with React Router v7
- Optimize database queries with indexes
- Use connection pooling for PostgreSQL

## Security Best Practices
- Validate all user inputs
- Use parameterized queries (no SQL injection)
- Implement CORS properly
- Sanitize HTML content
- Use environment variables for secrets
- Never commit .env files

## Deployment Checklist
- [ ] Run all tests
- [ ] Update version number
- [ ] Build production Docker image
- [ ] Run database migrations
- [ ] Update documentation
- [ ] Tag release in Git