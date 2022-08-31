---
sidebar_position: 4
slug: "styling"
---

# Styling
In this step of the tutorial we will turn our 90s vibe, unstyled, application into a sleek, modern, application.

## Change Branches
Move to a new branch

```bash title="Create and move to a new branch called add-styles."
git checkout -b add-styles
```

## Create Stylesheet
Now that we are on a new branch we can start adding our styles. 

First let's create a folder to serve files from. We are going to call this `public/`.

```bash title="Create public folder"
mkdir public
```

Then let's create our stylesheet inside the `public/` folder.

```bash title="Create stylesheet"
touch public/styles.css
```

Now let's update our server to serve all of the files in our public folder.

```js title="Add to app.js before routes"
app.use(express.static('public'));
```

Finally lets link our stylesheet to our application

```html title="Add link to head of main.handlebars"
<link rel="stylesheet" href="styles.css">
```

## Update HTML
Now that our stylesheet is linked let's update our `<html>` a bit.

```html title="Update home.handlebars"
<header>
  <h1>Gif Search</h1>
  <form action="/" method="GET">
    <input type="text" name="term" autocomplete="off">
    <button type="submit">Search</button>
  </form>
</header>
<div class="gifs">
  {{#each gifs}}
    <div class="tenor-gif-embed" data-postid="{{this.id}}" data-share-method="host" data-width="300px" data-height="300px">
      <a href="{{this.url}}"></a>
    </div>
    <script type="text/javascript" src="https://tenor.com/embed.js"></script>
  {{/each}}
</div>
```

## Add Styles
Now that our `<html>` has been updated we can update our styles.

```css title="Update styles.css"
* {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

body {
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: #E6E6E6;
  margin: 0;
}

header {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #5C7AEA;
  color: #E6E6E6;
  padding: 2rem;
  margin-bottom: 2rem;
}

header > h1 {
  font-size: 4rem;
}

header > form {
  width: 35%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

header > form > input {
  margin-right: 0;
  border: 2px solid #E6E6E6;
  border-right: none;
  width: 80%;
  font-size: 1rem;
  border-radius: 10px 0px 0px 10px;
  padding: .5rem;
}

header > form > button {
  margin-left: 0;
  border: 2px solid #E6E6E6;
  border-left: none;
  width: 15%;
  font-size: 1rem;
  padding: .5rem;
  border-radius: 0px 10px 10px 0px;
}

.gifs {
  width: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}
```

## Push To GitHub
In your terminal run the following commands, to push your current code to the add-styles branch on GitHub.

```bash title="Add current changes to staging."
git add .
```

```bash title="Commit current changes and call the commit Added Styling. (The -m flag lets us add a message)"
git commit -m "Added Styling"
```

```bash title="Push local changes to the remote repository. (origin is the name of the remote repository and add-styles is the branch name)"
git push origin add-styles
```

You should see a link in your terminal following `Create a pull request for 'add-styles' on GitHub by visiting:`. Hold `CMD` and click the link. You will be brought to a pull request called Add Server. Press the button that says `Create Pull Request` then press the `Merge Pull Request` button. This will merge the add-styles branch with your main branch. In order to get the up to date main branch, locally, enter the following commands in your terminal. 

```bash title="Change to the main branch"
git checkout main
```

```bash title="Pull the updated main branch"
git pull
```

## 🎉 Congrats 🎉
Nice! You just finished Dylan Player's Gif Search NodeJS Tutorial. Hope you enjoyed! Feel free to checkout other tutorials [here](https://dylanplayer.com/tutorials). If you noticed any problems feel free to make a pull request [here](https://github.com/dylanplayer/devfolio/tree/main/docs/node/gif-search). 
