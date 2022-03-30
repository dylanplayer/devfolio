---
sidebar_position: 2
slug: "getting-started"
---

# Getting Started
We are going to use [Homebrew](https://brew.sh/) to install [NodeJS](https://nodejs.org/en/). When we install [NodeJS](https://nodejs.org/en/), the **Node Package Manager (npm)** will be installed as well, so we can install node packages. 

## Install
Open your terminal and run the following commands.

```bash title="Install Homebrew"
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

```bash title="Install NodeJS"
brew install node
```
If you do not already have a text editor, download and install [Visual Studio Code](https://code.visualstudio.com/). After you download [VSCode](https://code.visualstudio.com/) launch the application and press `CMD+Shift+P`. You should see a search box appear enter `shell command` into the search box and select the option that says `Shell Command: Install 'code' command in PATH`. Then relauch your terminal.

## Create Project
You have the tools to create your project now you just need somewhere for it to go. Open your terminal and run the following commands.

```bash title="Create a folder for your projects"
mkdir projects
```

```bash title="Change the current directory to your projects folder"
cd projects
```

Now that you have a folder for your projects; go to [GitHub](https://github.com) and create an account if you don't have one. After you have logged into your [GitHub](https://github.com) account click this [link](https://github.com/new) or click the plus button, to create a new repository for your project according to the specs below.

| Property    | Value |
| ----------- | ----- |
| Template    | No Template  |
| Name        | Node Gif Search  |
| Description | Search for Gifs using NodeJS, ExpressJS, and Tenor. |
| Privacy     | *Either option* |

After you've created your repository on [GitHub](https://github.com) you should see a link like `https://github.com/dylanplayer/Node-Gif-Search-Tutorial.git` under quick setup. Copy that link and run the following commands in your terminal. *Make sure you are still in your projects directory*

```bash title="Clone your GitHub repository. (Don't include the quotes)"
git clone "your link"
```

```bash title="Change the current directory to your project."
cd Node-Gif-Search
```

## Initalize Node Project
In your terminal run the following commands, to initalize your project.

```bash title="Initalize a your project as a node project. (The -y flag tells npm to use the default configuration)"
npm init -y
```

```bash title="Open your project in VSCode."
code .
```

Now that your code is open in VSCode press `CTRL + ~` to open the terminal. Run the following command.

```bash title="Create a new file called app.js"
touch app.js
```

Open `package.json` and set the `main` file to `app.js`. This will tell node that our code is in the app file.

```json title="package.json"
{
  ...
  "main": "app.js",
  ...
}
```

## Push To GitHub
In your terminal run the following commands, to push your current project to GitHub.

```bash title="Add current changes to staging."
git add .
```

```bash title="Commit current changes and call the commit Init. (The -m flag lets us add a message)"
git commit -m "Init"
```

```bash title="Push local changes to the remote repository. (origin is the name of the remote repository and main is the branch name)"
git push origin main
```
