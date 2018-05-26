var express = require('express');
var router = express.Router();
const MyClient = require('../mailbox_connect')
var client = MyClient.client;

/* GET users listing. */

router.get('/threads/HotThreads', function (req, res, next) {
    client.search({
        index: 'threads',
        size: 1000,
        body: {
            sort: [{"NumberOfReplies": { "order": "desc"}}],
            query: { match_all: {}}
        }
    }, function(error, response) {
        console.log("Response:");
        res.json(response.hits.hits);
        console.log(response);
    });   
});


router.get('/threads/sort=ASC', function (req, res, next) {
    client.search({
        index: 'threads',
        size: 1000,
        body: {
            sort: [{"ThreadDate": { "order": "asc"}}],
            query: { match_all: {}}
        }
    }, function(error, response) {
        console.log("Response:");
        res.json(response.hits.hits);
        console.log(response);
    });   
});

module.exports = router;