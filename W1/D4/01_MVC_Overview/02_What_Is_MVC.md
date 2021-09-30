# What's MVC?

## Models - Data Layer
We'll take a little bit of a pass on models for now, as it's gonna come up when we get into the ORM side.

## Views - UI Layer
Think HTML, CSS, and JavaScript. 

`Razor` - View Engine (think Jinja from Python).

`ViewBag` - think of this as a bag that we can put any kind of data into, and pass the bag to the View Engine, where `Razor` will be able to reach in, and access the data put inside. 

```py
return render_template("file.html", p1 = v1, p2 = v2, p3 = v3, ....)
```

## Controllers - Layer handling requests and providing responses

The internet works via a series of HTTP requests and responses, so we need our application to handle those requests, and dish out the appropriate responses. 

We're going to see a very familiar structure (or at least we will if we've been paying attention over the past 2 days). 