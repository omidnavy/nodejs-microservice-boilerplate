<img src="http://oi68.tinypic.com/ndap21.jpg" alt="react boilerplate banner" align="center" />

<br />

<div align="center"><strong>Start your next node.js micro-service in seconds</strong></div>
<div align="center">A highly scalable and simple node.js boilerplate based on ES6 classes [without any transpiler] and GRPC </div>

<br />


<div align="center">
  <sub>Created and maintained with ❤️by <a href="http://omid.navy">Omid Navy</a></sub>
</div>

## Features

<dl>
  <dt>Straight forward</dt>
  <dd>Build your next nodejs microservice in seconds</dd>

  <dt>GRPC based</dt>
  <dd><a href="omidnavy/nodejs-microservice-boilerplate">nodejs microservice boilerplate </a> is based on <a href="grpc.io">GRPC</a>, A high performance, open-source universal RPC framework.</dd>

  <dt>ES6 Classes</dt>
  <dd>Develope your node.js microservice using the power of ES6 classes without the need of transpilers!</dd>

  <dt>MVC pattern</dt>
  <dd>Use MVC pattern inside your micro-service</dd>

</dl>

<sub><i>Keywords: Node.js, GRPC, Micro Service, ES6</i></sub>
<br/>
## Quick start

1.  Make sure that you have Node v8 or above installed.
2.  Clone this repo using `git clone https://github.com/omidnavy/nodejs-microservice-boilerplate.git`
3.  Move to the appropriate directory: `cd nodejs-microservice-boilerplate`.<br />
4.  Run `npm install` in order to install dependencies .<br />
5.  Run `npm start` to run sample.

Now you're ready to rumble!

> Please note that this boilerplate is **production-ready**!

# Documentation

1.  First, let's make a [Protocol Buffer] (https://developers.google.com/protocol-buffers/).

1.  Open "/app/core/Route.js" and edit "packageName" and "serviceName" variable depends on you ".proto" file.

1.  For every function defined in your proto, you must have a controller.
    - Make a .js in "/app/controllers" folder, with exact name of your proto function. Use "myModel.js" as your template.
    - Models are not required. If you want to use them, Make a .js in "/app/models" folder, with any name you want, and require it in your controller class. Use "myModel.js" as your template.

1.  Time to run your app:

    ```shell
    npm run start
    ```


### Database Class

There is a simple "DatabaseModel" in "/app/core" which is using "mysql" pooled connections wrapped in a promised based function. You can remove it completely from your app if you don't need databases or modify it to use with other databases. don't forget to uninstall it using "npm uninstall -s mysql" if you choose to remove database class. You can check the commented sample code for using it.

### Helpers

Helpers are shared functions that can be called from anywhere in your app. here we use "global variables" to define our helper functions.
There is "logger" helper function defined as sample , you can call it with logger() where ever you want. there is a child process for calling logger function to reduce cpu load on main app (don't take it serious , its just a showcase).

### Process

If you want to use child process, you can use "/app/process/winston" as a template.
