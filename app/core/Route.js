/*
This class will assign your grpc function to its controller main() function.
ATTENTION: There is no need of modifying this file.
For every function assigned in your PROTO , you have to make a controller and model with exact same name of its grpc function.
Everything else is automated;
 */

const path = require('path');
const fs = require('fs');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = path.join(__dirname, '../protos/hello.proto');
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const proto = protoDescriptor;
const server = new grpc.Server();
const packageName = "Hello";
const serviceName = "Greeter";
module.exports = class MyClass {
    constructor() {
        this.server = server;
        this.MapRoutes()
    }

    MapRoutes() {
        let Controller, controllerInstance = [], counter = 0, basePath, functionsObject = {}, route;
        functionsObject.Controllers = {};
        fs.readdirSync(path.join(__dirname, '../controllers')).forEach(function (file) {
            if (file.substr(-3) === ".js") {
                Controller = require(path.join(__dirname, '../controllers', file));
                basePath = path.basename(file, ".js");
                functionsObject.Controllers[basePath]=( new Controller());
                counter++
            }
        });
        route = new Proxy(functionsObject, {
            get: function(functionsObject, field) {
                return function (call,callback) {
                    functionsObject.Controllers[field].main(call,callback);
                }
            }
        });
        this.server.addService(proto[packageName][serviceName].service, route);
        this.server.bind(`0.0.0.0:${process.argv.slice(2)[0] || '50051'}`, grpc.ServerCredentials.createInsecure());
        this.server.start();
    }
};