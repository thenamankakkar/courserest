const config = require('../config.json');

module.exports = {
    DEV: process.env.MONGOURI || "mongodb+srv://meanhive:Pruthvi143@cluster0.rqxjp.mongodb.net/bepractical?authSource=admin&ssl=true" ,
    PROD: process.env.MONGOURI || require('../config.json').mongo_uri,

};