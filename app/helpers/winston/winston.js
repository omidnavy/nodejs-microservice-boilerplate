const {fork} = require('child_process');
const path = require('path');
let forked = spawn();

forked.on('exit',()=>{
    setTimeout(()=>{forked = spawn()},5000)
});
forked.on('error',()=>{
    setTimeout(()=>{forked = spawn()},5000)
});

function spawn(){
    return fork(path.join(__dirname,'../../core/child-process','winston.js'))
}

module.exports = class winston {
    /**
     *  Log within another process.
     * @param {string} level
     * @param {string} msg
     */
    logger(level, msg){
        forked.send({level:level,msg:msg})
    }

}