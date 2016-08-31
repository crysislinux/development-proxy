# Before using

copy the example files and make your own(without .example ). Those files include:

## config/backend-api-map.example.js

This file define how to map request to the backend. If we set the following rule.

> '/auth|http://connect360-dev.herokuapp.com/auth'

all the request(regardless the request method) begin with /auth will be proxied to http://connect360-dev.herokuapp.com/auth.

if you want to use a specific map, for example mapping /auth/login to http://localhost:10012/auth/login. You can just set as this:

> '/auth/login|http://localhost:10012/auth/login'<br>
> '/auth|http://connect360-dev.herokuapp.com/auth'

The key is to make the special rules come before general rules.

## config/env.example.js

see the comment in env.example.js


## fakedb/custom/json/index.example.js and fakedb/custom/json/todos.example.js

>  todos: require('./todos.json')

this means there will be a restful endpoint named /todos

## fakedb/custom/routes/index.example.js

we can define custom routes in routes folder. see fakedb/shared/routes/index.js and fakedb/shared/routes/verify.js as examples.


# How does it work

The proxy comes with two server. one for proxy and the other for fake APIs.

If you just need to proxy the API requests to a backend, you only need to start the proxy server.

Let's use GET / as an example.

If we just use 'ng serve', that should be http://localhost:4200/

If we use this proxy tool, that should be http://localhost:10011/ (10011 is the default port)

When a user comes to http://localhost:10011/, the browser will try to load index.html, and then tons of javascript other resource files. After that, the client code will issue a /auth/user request to check the current user.

The proxy server will check whether the request path match any of the mapped endpoints (see config/backend-api-map.example.js). The request will be proxied to the target backend endpoint if match, otherwise to http://localhost:4200/.

## What about the fake API server?

also see config/backend-api-map.example.js

> `/svc|http://localhost:${env.fakedbPort}/svc`,

we can map endpoints to the fake API server.

# What's fakedb/custom and fakedb/shared

shared folder contains data that is very common.  custom folder contains data that is specific to you. You can make your own changes in custom and the files there are ignored by .gitignore. When something in custom folder is needed by most of us, it can go in the shared folder.

*Notice: definitions in custom folder will override the ones in shared folder if they have the same name, you can use this feature to override the shared endpoints*
