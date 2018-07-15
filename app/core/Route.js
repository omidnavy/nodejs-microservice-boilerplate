/*
This class will assign your grpc function to its controller main() function.
ATTENTION: There is no need of modifying this file.
For every function assigned in your PROTO , you have to make a controller with exact same name of its grpc function with a "Controller" appended to it.
like: SayHelloController.js for SayHello rpc defined in PROTO.
Everything else is automated;
 */

const path = require('path');
const fs = require('fs');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = path.join(__dirname, './Route.proto');
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
module.exports = class Route {
    constructor() {
        this.server = server;
        this.MapRoutes()
    }

    MapRoutes() {
        let Controller, Controllers = {}, route;
        //Seek component folder, search for controller class inside each component thhen map it to your PROTO functions
        fs.readdirSync(path.join(__dirname, '../components')).forEach(function (file) {
            Controller = require(path.join(__dirname, '../components', file, file + 'Controller'));
            Controllers[file] = (new Controller());
        });
        route = new Proxy(Controllers, {
            get: function (Controllers, ControllerName) {
                return function (call, callback) {
                    Controllers[ControllerName].main(call, callback);
                }
            }
        });
        this.server.addService(proto[packageName][serviceName].service, route);
        this.server.bind(`0.0.0.0:${process.argv.slice(2)[0] || '50051'}`, grpc.ServerCredentials.createInsecure());
        this.server.start();
    }
};