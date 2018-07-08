/*
Controllers should extends the "BaseController"
Model initialize in constructor of Controller
"main" functions is your gateway ! you have to declare it .
 */

const BaseController = require("../core/BaseController");
const Model = require("../models/SayHello");

module.exports = class SayHello extends BaseController {
    constructor() {
        super();
        this.model = new Model();
    }

    main(call, callback) {
        console.log(this.model);
        console.log(call.request);
        let test = this.model.reverse(call.request.name);
        callback(null, {message: `Hello ${test}`});

        //DB Example:
        // If choose to use "async/await" you need to define async function for its awaited result
        /*
        (async()=>{
            let items = await this.model.retrieve();
            logger('info',items)
        })()
        */

    }
}