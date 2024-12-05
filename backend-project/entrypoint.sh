#!/bin/sh

npx prisma generate

# Run database migrations
npx prisma migrate deploy

npx prisma db push

# Start the application
exec npm run start:prod