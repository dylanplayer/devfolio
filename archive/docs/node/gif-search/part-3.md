---
sidebar_position: 3
slug: "search-gifs"
---

# Search Gifs
In this step of the tutorial we will add the gif search functionality.

## Change Branches
Whenever we want to make changes to our code we should do this on a new branch. Run the following command in your terminal.

```bash title="Create and move to a new branch called add-gif-search."
git checkout -b add-gif-search
```

## Add Search
Right now we aren't able to accept users' input. Let's add a form to our homepage that allows users to input search terms.

```html title="Add form to home.handlebars"
<form action="/" method="GET">
  <input type="text" name="term">
  <button type="submit">Search</button>
</form>
```

Now our view shows a search bar but it doesn't do anything let's update our server to use it.

```js title="Update our root route to accept a search term as a parameter and log it"
app.get('/', 
  (req, res) => {
    let term = "";
    if (req.query.term) {
      term = req.query.term
    }
    console.log(term);
    res.render('home');
  }
);
```

Nice! You should see your search term in the terminal, whenever you submit the form.

## Connect Tenor
You might be wondering how we are going to get some gifs. We're going to scrape the entire internet for them... just kidding. A company called [Tenor](https://tenor.com/) has an Application Programming Interface (API) that we can use. Head over to this [link](https://tenor.com/developer/keyregistration) and get an API key. Once you have your API key store it somewhere safe, we are going to use it in a sec. We are going to use something called [Node Fetch](https://www.npmjs.com/package/node-fetch) to make requests to Tenor's API. Let's get [Node Fetch](https://www.npmjs.com/package/node-fetch) setup.

```bash title="Install Node Fetch"
npm install node-fetch@2.6.7
```

```js title="Import Node Fetch at the top of app.js"
const fetch = require('node-fetch');
```

We are also going to want to install the [dotenv package](https://www.npmjs.com/package/dotenv). The [dotenv package](https://www.npmjs.com/package/dotenv) package will allow us to get variables from a `.env` file. We want to store our API keys in a `.env` file because we want to keep them private. Let's get [dotenv](https://www.npmjs.com/package/dotenv) setup.

```bash title="Install Dotenv"
npm install dotenv@16.0.0
```

```js title="Import our .env variables at the top of app.js"
require('dotenv').config();
```

```bash title="Create a .env file"
touch .env
```

```env title="Add API key to .env file (replace yourkey with your Tenor api key)"
API_KEY=yourkey
```

Now we should have everything setup to get some gifs from [Tenor](https://tenor.com). Let's make some reqests. We will be using the fetch function we imported earlier to make requests to [Tenor](https://tenor.com). `fetch()` makes a `GET` request to a url and then we use the `then()` function to use the data returned from the url.

```js title="Update your root route in app.js to make a request to tenor then pass the gifs into our home view"
app.get('/', 
  (req, res) => {
    let term = "";
    if (req.query.term) {
      term = req.query.term
    }
    fetch(`https://g.tenor.com/v1/search?q=${term}&key=${process.env.API_KEY}&limit=10`)
    .then(response => response.json())
    .then(
      (data) => {
        const gifs = data.results;
        res.render('home', { gifs });
      }
    );
  }
);
```

Now we are sending gifs to the home view but we aren't using them. Let's update our home view to show the gifs. Handlebars has a for each loop that looks like `{{#each}}  {{/each}}` we will use this to display each gif.

```html title="Add an #each loop to home.handlebars to display each"
{{#each gifs}}
  <div class="tenor-gif-embed" data-postid="{{this.id}}" data-share-method="host" data-width="300px" data-height="300px">
    <a href="{{this.url}}"></a>
  </div>
  <script type="text/javascript" src="https://tenor.com/embed.js"></script>
{{/each}}
```

Nice! If you go to [http://localhost:3000/](http://localhost:3000/) you should see gifs appear and your gif search should be working.

## Push To GitHub
In your terminal run the following commands, to push your current code to the add-gif-search branch on GitHub.

```bash title="Add current changes to staging."
git add .
```

```bash title="Commit current changes and call the commit Added Gif Search. (The -m flag lets us add a message)"
git commit -m "Added Gif Search"
```

```bash title="Push local changes to the remote repository. (origin is the name of the remote repository and add-gif-search is the branch name)"
git push origin add-gif-search
```

You should see a link in your terminal following `Create a pull request for 'add-gif-search' on GitHub by visiting:`. Hold `CMD` and click the link. You will be brought to a pull request called Add Server. Press the button that says `Create Pull Request` then press the `Merge Pull Request` button. This will merge the add-gif-search branch with your main branch. In order to get the up to date main branch, locally, enter the following commands in your terminal. 

```bash title="Change to the main branch"
git checkout main
```

```bash title="Pull the updated main branch"
git pull
```
