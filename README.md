# Template Project for Firebase Cloud Functions + Express

## Setup Instructions:

### Prereqs: 
- Install Firebase CLI tools:

    ```npm install -g firebase-tools```

- Authenticate the Firebase CLI:

    ```firebase login```

### Create new Project:
1. Create a new home directory for your project.
2. Run the following command to initialize firebase functions (you may also want to user other services, like firestore):

    ```firebase init functions```

3. Emulate the functions on your local machine:

    ```firebase emulators:start```

4. Deploy to prod:

    ```firebase deploy functions```

## Integrating Express:
Look through the structure of this repo to get a sense of how to setup the project in general. You are probably need to do the following though:

- Install express in the local project. Make sure to run from the `functions` directory.

    ```npm install express --save```

- Add the following to `~/firebase.json`:

```
{
  ...
  "hosting": {
    "rewrites": [
      {
        "source": "**", 
        "function": "app"
      }
    ]
  }
}
```

- Only init express in `index.js`, handle routing and controllers separately.

- Create a `route.js` file under `functions` that defines routes for the api. Note that you could have multiple route files (ex: 1 per controller). In this case, you'd want to create a separate `routes` directory.

- Put controllers in a `controllers` directory. This is where you can handle business logic. Make sure to include all controllers in the `modules.exports`.