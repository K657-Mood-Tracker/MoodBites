# MoodBites 🎂

## docker compose example

```yaml
services:
  postgres:
    image: postgres:15-alpine
    container_name: moodbites_db
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: admin1234
      POSTGRES_DB: moodbites
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U admin -d moodbites"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
```

## starting project
- docker compose up -d
- cd backend && npm install
- nodemon ./server.js
- cd ../MoodBites && npm install
- npm run dev

## migrate to db
npx sequelize-cli db:migrate

## create new model
npx sequelize-cli model:generate --name User --attributes username:string,email:string

## create new seed
npx sequelize-cli seed:generate --name demo-users

## seed db
npx sequelize-cli db:seed:all
