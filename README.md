# Recipease

An app to create, store and share recipease.

## Technologies

-   Yarn
-   Vue.js
-   TypeScript
-   Node
-   GraphQL
-   Neo4j

## Working locally

To run the application you will need `Node 12` and `yarn` installed and a `Neo4j` server up and running.

### Neo4j

On a mac you can use brew:

```
brew install neo4j
```

Or download from the website:
https://neo4j.com/download/

Once it is installed and open you will need ot create a new project (there is a button at the top). In the main pane click "Add Database" and then choose "Create a Local Graph". Give it a name and set a password, noting the password for later. Once the graph is created click the start button to get it going.

That's it, the DB is now ready to run the app.

### Env file

In the root of the project there is a `.env.example` file. Copy it and rename it to `.env`. Your will then need to populate it with the needed values:

The deafult user for a Neo4j database is `neo4j` and the password is whatever you set earlier. If you make a different user for the Neo4j project then set that.

```
DATABASE_USER=''
DATABASE_PASSWORD=''
```

The Auth0 settings can be obtained from the project maintainers or by logging into the Auth0 account.

```
AUTH0_DOMAIN=https://dev-27tztdxd.eu.auth0.com/
AUTH0_AUDIENCE=https://auth.recipease.com
```

The rest can be left as is unless you want to change the ports things are running on.

### Server

Now the DB is up and running it is time to start the back end. Open a terminal inside the the directory you cloned the repository into. Run `yarn` and all of the dependencies needed to run the app will be installed.

You should now be able to run the server with:

```
cd server
yarn start
```

The nest cli should have been installed for you and you can use `yarn nest ...` to utilise the nestjs cli. However if you have issues you may need to have it installed globally. You can do this with the following:

```
yarn global add @nestjs/cli
yarn global add @nestjs/schematics
```

To run the server in development mode and have it watch for changes then run:

```
yarn start:dev
```

When in development mode a GraphQL playground will be started and you can access it in the browser at `http://localhost:3000/graphql`. This should allow you to browse and use the API.

### Client

Now that the server is up and running you can start the front end. There is one more config file that needs setting. In the `client` directory there is an `auth0_config.json.example`, copy it and populate it with the required values. Again these can be obtained from the maintainer.

With that file in place you are ready to start. Open a new terminal, navigate to the project root and run the following:

```
yarn start
```

The development server will be run in watch mdoe and will automatically recompile when changes are detected.

The Vue CLI should have been installed for you and can be used with `yarn vue ...` but if you have trouble then you may need to install it globally. You can do this with the following:

```
yarn global add @vue/cli
```

The browser should open automatically and the app should be running. Navigate to profile or recipes pages to login/sign up.

Currently there is no UI to add recipes but they can be added and updated using the GraphQL API via the playground.

## CLI Scripts

There are several utility scripts inside both the client and server `package.json` files. You can use these to run tests, lint the source code or build the project. Linting and testing can also be performed from the project root directory.

**This whole installation process will get automated at some point soon.**

## IDE

We highly recommend using Microsoft Visual Studio Code (VSCode) for the best working experience and recommend the following extensions for this project:

-   ESLint
-   Cypher Query Language
-   Prettier
-   Vetur
-   Node.js modules intellisense
-   GraphQL for VSCode

For quality of life improvements:

-   Auto rename tag
-   Bracket pair colorizer
-   Babel javascript
-   Github Markdown Preview
