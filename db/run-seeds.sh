#!/bin/bash

# Wait for PostgreSQL to be ready
until pg_isready -h db -p 5432 -U todouser; do
  echo "Waiting for PostgreSQL to be ready..."
  sleep 2
done

# Run seed files
echo "Running seed files..."
for file in /app/db/seeds/*.sql; do
  if [ -f "$file" ]; then
    echo "Running seed: $file"
    psql -h db -U todouser -d tododb -f "$file"
  fi
done

echo "Seeds completed!"