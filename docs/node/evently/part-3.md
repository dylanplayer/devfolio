---
sidebar_position: 3
slug: "add-events-route"
---

# Add Events Route
In this step of the tutorial we will create and display events on our application.

## Change Branches
Whenever we want to make changes to our code we should do this on a new branch. Run the following command in your terminal.

```bash title="Create and move to a new branch called add-events-route"
git checkout -b add-events-route
```

## Restful Routes
You see this term **restful routes** all over the place, but what does it mean? Restful routing is pretty simple. You know the term CRUD ( Create, Read, Update, Destroy )? Well Restful routing attempts to map these actions together with the **HTTP** methods: GET, POST, PATCH, PUT, and DELETE.

Here is a table that shows how we can use restful routes for our events resource.

| URL | HTTP Verb | Action(function name) | What it Does |
| --- | --------- | --------------------- | ------------ |
| /events | GET | index | Shows all events |
| /events/:id | GET | show | Shows single event |
| /events/new | GET | new | Shows new event form |
| /events | POST | create | Accepts new event form input & creates new event |
| /events/edit | GET | edit | Shows the edit event form |
| /events/:id | PUT/PATCH | update | Accepts edit event form input & updates the event |
| /events/:id | DELETE | destroy | Deletes single event |

## Events Index Route
Let's start by adding the events index route, to show all events. Add the following code into `app.js`.

```js title="Create some event data"
let events = [
  { title: "TECHSPO Silicon Valley 2022", desc: "TECHSPO Silicon Valley, two-day technology expo returns June 2nd and 3rd, 2022 to the luxurious Westin San Francisco Airport Hotel in San Francisco, California. TECHSPO Silicon Valley brings together some of the best developers, brands, marketers, technology providers, designers, innovators and evangelists looking to set the pace in our advanced world of technology. Watch exhibitors showcase the next generation of advances in technology & innovation, including; Internet, Mobile, AdTech, MarTech and SaaS technologies. Be prepared to be inspired, amazed and educated on how these evolving technologies will impact your business for greater growth.", img: "https://dylanplayer.com/img/techspo.png", location: "The Westin San Francisco Airport Hotel, 1 Old Bayshore Hwy, San Francisco, CA 94030", date: "Thu, Jun 2, 2022, 9:00 AM – Fri, Jun 3, 2022, 4:00 PM PDT"},
  { title: "Tech Summit 2022", desc: "Two days of incredible masterclasses, workshops, speakers, tech leaders, leading tech brands, networking, opportunities, recruiters and more. This is set to be an unmissable event for anyone in Tech.", img: "https://dylanplayer.com/img/techsummit.jpg", location: "San Francisco Marriott Marquis, 780 Mission St, San Francisco, CA 94103", date: "Tue, 28 Jun 2022, 08:30 – Wed, 29 Jun 2022, 15:30 PDT"},
  { title: "IoT Tech Expo North America 2022", desc: "The IoT Tech Expo North America 2022 will bring together key industries from across the globe for two days of top-level content and discussion across 6 co-located events covering Blockchain, Digital Transformation, IoT, 5G, Cyber Security & Cloud, AI and Big data. 5,000 attendees are expected to congregate at the Santa Clara Convention Center, including CTO’s, Heads of Innovation and Technology, IT Directors, Developers, Start-Up’s, OEM’s, Government, Automotive, Operators, Technology Providers, Investors, VCs and many more.", img: "https://dylanplayer.com/img/iottechexpo.jpg", location: "Santa Clara Convention Center, 5001 Great America Parkway, Santa Clara, CA 95054", date: "Wed, 11 May 2022, 09:00 – Thu, 12 May 2022, 17:00 PDT"},
];
```

```js title="Create events index route"
app.get('/events',
  (req, res) => {
    res.render('events/index', { events: events });
  }
);
```

:::warning
If you were to navigate to [http://localhost:3000/events](http://localhost:3000/events) right now you would get an error because we don't have a view called `events/index`.
:::

## Events Index View
Let's create our events index and add some html to it.

```bash title="Create events folder in views"
mkdir views/events
```

```bash title="Create events index view in views/events"
touch views/events/index.handlebars
```

```html title="Add html to views/events/index.handlebars"
<h1>Events</h1>
<div>
  {{#each events}}
    <h2>{{this.title}}</h2>
    <p>{{this.date}}</p>
    <p>{{this.desc}}</p>
  {{/each}}
</div>
```

Nice, now if you navigate to [http://localhost:3000/events](http://localhost:3000/events) you should see all of your events and their information.

## Push To GitHub
In your terminal run the following commands, to push your current code to GitHub.

```bash title="Add current changes to staging."
git add .
```

```bash title="Commit staged changes"
git commit -m "Added Events Index Route"
```

```bash title="Push local changes to your remote repository."
git push origin add-events-route
```

Create a pull request and merge it, on [GitHub](https://github.com).

```bash title="Change to the main branch"
git checkout main
```

```bash title="Pull the updated main branch"
git pull
```
