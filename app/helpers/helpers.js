/*
    Require all your helpers classes here , and assign you desired function to global variables
 */
const winston = require('./winston/winston');
const winstonClass = new winston();
logger = winstonClass.logger; //Or you can use static functions
