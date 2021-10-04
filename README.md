# Humanz Assignment

This README would normally document whatever steps are necessary to get your application up and running.

### How to set up CONFIG

### Important setup:

1. Create config folder under backend (./backend/config)

2. Create a default.json file inside config (./backend/config/default.json)

3. Add the variables below with the relevant DB information:

```
{
    "mongoURI": "mongodb+srv://<USERNAME>:<PASSWORD>@<DB_URL>/<DB_NAME>?retryWrites=true&w=majority"
}
```

### How to run the app

1. Run backend:

```
cd backend
npm i
npm run start
```

2. Run frontend:

```
cd frontend
npm i
npm run start
```
