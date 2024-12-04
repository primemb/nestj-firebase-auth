# Nestjs - Firebase Blog Role Based Access Control

This project was generated with [Nest](https://nestjs.com/)
This project is a simple blog with role based access control using Firebase Authentication.

## Installation

```bash
$ npm install
```

## Setup environment variables

Create a `.env` file in the root of the project fill it like `.env.example` file.

```bash
DATABASE_URL='your-postgres-database-url'
FIREBASE_API_KEY='your-firebase-api-key'
```

## Setup Firebase

in `src/firebase/config` folder create new json file called `firebaseServiceAccountKey.json` and fill it with your firebase service account key.

## Running the app

```bash
$ npx prisma db push
$ npm run start:dev
```

## Test

They are postman collection in the root of the project called `blog.postman_collection.json` and postman environment called `blog.postman_environment.json` you can import them in your postman and test the api.
