---
sidebar_position: 2
slug: "create-server"
---

# Create Server
In this step of the tutorial we will start creating our express server.

## Change Branches
Whenever we want to make changes to our code we should do this on a new branch. Run the following command in your terminal.

```bash title="Create and move to a new branch called add-server. (git checkout allows us to move to a new branch and the -b flag is used to create a new branch)"
git checkout -b add-server
```

## Add Gitignore
A `.gitignore` file is used to prevent certain files from being added to our `.git` history. We want to do this to minimize the size of our remote repositories. Run the following command to create a `.gitignore` file.

```bash
touch .gitignore
```

Go to this [website](https://www.toptal.com/developers/gitignore/api/node). Copy the generated text and paste it into your `.gitignore` file. This will prevent any of our unnecessary files from entering our `.git` history.

## Install Express
[ExpressJS](https://expressjs.com) is a [NodeJS](https://nodejs.dev) package that allows us to, easily, create a web server. Run the following command to install [ExpressJS](https://expressjs.com).

```bash title="Install express with npm"
npm install express@4.17.3
```

## Create Server
Add the following code to your `app.js` file

```js title="Import express using require"
const express = require('express');
```

```js title="Create a variable called app to store our application"
const app = express();
```

```js title="Create a variable called PORT to store the port for our server."
const PORT = process.env.PORT || 3000;
```

```js title="Create a route that responds to a GET request with Hello, World!"
app.get('/', 
  (req, res) => {
    res.send('Hello, World!');
  }
);
```

```js title="Tell app to listen to port 3000"
app.listen(PORT, 
  () => {
    console.log(`Evently listening on http://localhost:${PORT}/`);
  }
);
```

Now our server is ready to go. Run the following command in the terminal.
```bash
node app.js
```

You should see `Evently listening on http://localhost:3000/` in the terminal. If you navigate to [http://localhost:3000/](http://localhost:3000/) you should see `Hello, World!`. Nice, this means that your server is running.

Let's make making changes easier by installing a package called [Nodemon](https://www.npmjs.com/package/nodemon). [Nodemon](https://www.npmjs.com/package/nodemon) will automatically restart your server when you save changes. Run the following command to install [Nodemon](https://www.npmjs.com/package/nodemon).

```bash title="Install Nodemon (The -g flag installs the package globally and allows us to use the package in other projects)"
npm install nodemon -g
```

Now our project will automatically update if we run it with the following command.
```bash title="Run project using Nodemon"
nodemon
```

## Respond With HTML
Right now our server is just responding with text, let's get it to respond with `<html>`. Handlebars is an express view engine that allows us to render data in our `<html>`. Run the following commands to use Handlebars.

```bash title="Install Handlebars"
npm install express-handlebars@6.0.3
```

```bash title="Create folder for html"
mkdir views
```

```bash title="Create home view"
touch views/home.handlebars
```

```bash title="Create layouts folder"
mkdir views/layouts
```

```bash title="Create main view layout"
touch views/layouts/main.handlebars
```

Now that we have our view files created let's add some html to them.

```html title="Add html boilerplate to main.handlebars"
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Evently</title>
  </head>
  <body>
    {{{body}}}
  </body>
</html>
```

```html title="Add html to home.handlebars"
<h1>Evently</h1>
```

Now that our views have some html lets get our server to render them. In order to render our Handlebars html we are going to need to add the handlebars middleware to our server. Middleware are like plugins for ExpressJS, they allow us to modify the function of ExpressJS. All of your middleware should come after you declare your app and before any of your routes.

```js title="Import Handlebars engine function into your project"
const { engine } = require('express-handlebars');
```

```js title="Set handlebars as the view engine for your app"
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
```

```js title="Set express views to our views folder"
app.set("views", "./views");
```

Now that we have our middleware setup we can render some `<html>`. We can do this using the `res.render()` function. This function takes in the view name and configuration options. We are going to pass in `'home'` as the view name and use the default configuration by not passing in a second parameter.

```js title="Update our root route to show the home view"
app.get('/', 
  (req, res) => {
    res.render('home');
  }
);
```

## Push To GitHub
In your terminal run the following commands, to push your current code to the add-server branch on GitHub.

```bash title="Add current changes to staging."
git add .
```

```bash title="Commit current changes and call the commit Added Server. (The -m flag lets us add a message)"
git commit -m "Added Server"
```

```bash title="Push local changes to the remote repository. (origin is the name of the remote repository and add-server is the branch name)"
git push origin add-server
```

You should see a link in your terminal following `Create a pull request for 'add-server' on GitHub by visiting:`. Hold `CMD` and click the link. You will be brought to a pull request called Add Server. Press the button that says `Create Pull Request` then press the `Merge Pull Request` button. This will merge the add-server branch with your main branch. In order to get the up to date main branch, locally, enter the following commands in your terminal. 

```bash title="Change to the main branch"
git checkout main
```

```bash title="Pull the updated main branch"
git pull
```
