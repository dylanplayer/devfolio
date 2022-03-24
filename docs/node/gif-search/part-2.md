---
sidebar_position: 3
slug: "create-server"
---

# Create Server
In this step of the tutorial you will learn how to create an express server.

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

Servers work by making responses to requests that users send them. Users will make `GET` requests to your server in order to get information. We can respond to these requests by using the `app.get()` function. This function takes in two parameters: the path and a function. The path is the address users make the request to. For example, when you go to `https://facebook.com/` you are making a get request to the `/` path. The function is called when a user visits this route, this function takes in two parameters: `req` and `res`. `req` stands for the request sent to the route and `res` stands for the response that the server is going to make. 

```js title="Create a route that responds to a GET request with Hello, World!"
app.get('/', 
  (req, res) => {
    res.send('Hello, World!');
  }
);
```

Right now our server still does not do anything. We need to tell our app to listen to a certain port for requests. To do this we will call the `app.listen()` function. This function takes two parameters: a port and a function. The port is where the app is going to listen for responses. The function will be run once the server is listening to the port specified.
```js title="Tell app to listen to port 3000"
app.listen(3000, 
  () => {
    console.log(`Gif Search listening on http://localhost:3000/`);
  }
);
```

Now our server is ready to go. Run the following command in the terminal.
```bash
node app.js
```

You should see "Gif Search listening on http://localhost:3000/" in the terminal. If you hold `CMD` and click on `http://localhost:3000/`, in your terminal, your browser will make a `GET` request to your server and you should see `Hello, World!` in your browser. 

This is great but we need to make our server a bit more interactive. We can do this by taking in url parameters. Url parameters are used to send information to a server. We can use url parameters by adding a `:` followed by the parameter name to our route path. Let's create a route that will respond with `Hello,` then a users name. Make sure you add all routes before your `app.listen()` function.

:::tip
In Javascript the backtick character is different than single quote character. The backtick allows us to do string interpolation using the `${}` syntax.
```js
`Hello, ${name}!`
```
:::

```js title="Create a route that responds to /hello/"
app.get('/hello/:name', 
  (req, res) => {
    const name = req.params.name;
    res.send(`Hello, ${name}!`);
  }
);
```

:::danger
If you visit [http://localhost:3000/hello/dylan](http://localhost:3000/hello/dylan) you will see a message that says `Cannot GET /hello/dylan`. Restart your server to see your new changes by pressing `CTRL+C` in your terminal and then running ```bash node app.js```.
:::

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
  <title>Gif Search</title>
</head>
<body>
  {{{body}}}
</body>
</html>
```

```html title="Add html to home.handlebars"
<h1>Gif Search</h1>
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
