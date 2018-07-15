/*
Models may extends the "BaseModel" ,"BaseDBModel" or nothing , depends on you and your system.
 */

const DatabaseModel = require('../../core/BaseDBModel');

module.exports = class SayHelloModel extends DatabaseModel {

    constructor() {
        super();
    }

    reverse(string) {
        let tmp = '';
        if ((typeof string === "number" || typeof string === "string")) {
            for (let i = string.length - 1; i >= 0; i--) {
                tmp += string[i]
            }
        }
        return tmp
    }

    //DB Example:
    // You can call query function in "async/await" format or as a normal "promise"
    /*
    async retrieve() {
        let result ;
        try{
            result = await this.query('SELECT * FROM users');
        }
        catch (e) {
            result = [];
        }
        return result;

    }
    */
};

