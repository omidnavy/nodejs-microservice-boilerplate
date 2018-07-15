/*
Simple MYSQL DB Class using pools and basic query function.
you can extend this class as you need or change it to another DB
 */

const mysql = require('mysql');
const config = require('./config/database').development;
const BaseModel = require('./BaseModel');

const createPool = () => {
    console.log(config);
    console.log({...config, ...{connectionLimit: 10, supportBigNumbers: true}})
    let pool = mysql.createPool({...config, ...{connectionLimit: 10, supportBigNumbers: true}});
    if (pool) {
        pool.on('error', (e) => {
            reconnect()
        });
        return pool
    }
};
const getConnection = (callback) => {
    pool.getConnection((e, connection) => {
        if (e) {
            logger('error', e);
            reconnect();
            return callback(true)
        }

        connection.on('error', (e) => {
            logger('error', e);
            connection.release()
        });
        return callback(false, connection);
    })
};

const reconnect = () => {
    pool.end(() => {
        pool = createPool()
    })
};
let pool = createPool();

module.exports = class BaseDBModel extends BaseModel {
    constructor() {
        super()
    }

    /**
     *
     * @param {string} query
     * @param items
     * @returns {Promise<any>}
     */
    query(query, items) {
        return new Promise((resolve, reject) => {
            if (typeof items === 'undefined') {
                items = false;
            }
            getConnection((e, connection) => {
                if (e) {
                    return reject(true)
                }
                let q = connection.query(query, items, (e, results) => {
                    connection.release();
                    if (e) {
                        logger('error', e);
                        logger('info', q.sql);
                        return reject(true)
                    }
                    return resolve(results)
                })
            })
        })
    }


};