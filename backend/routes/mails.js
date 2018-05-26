var express = require('express');
var router = express.Router();
const MyClient = require('../mailbox_connect')
var client = MyClient.client;

router.get('/deleteall', function (req, res, next) {
    client.indices.delete({
        index: '*'
    }, function (error, response) {
        res.end();
    });
});

router.get('/threads', function (req, res, next) {

    client.search({
        index: 'threads',
        size: 1000,
        body: {
            sort: [{"ThreadDate": { "order": "desc"}}],
            query: { match_all: {}}
        }
    }, function(error, response) {
        console.log("Response:");
        res.json(response.hits.hits);
        console.log(response);
    });   
});

router.get('/mails', function (req, res, next) {

    client.search({
        index: 'mails',
        size: 1000,
        body: {
            sort: [{"Date": { "order": "desc"}}],
            query: { match_all: {}}
        }
    }, function(error, response) {
        console.log("Response:");
        res.json(response.hits.hits);
        console.log(response);
    });   

});
router.get('/threads/:id', function(req, res, next) {
    client.search({
        index: 'threads',
        body: {
            query: {
                match_phrase: {
                    MessageId: req.params.id
                }
            }
        }
    }, function (error, response) {
        client.search({
            index: 'mails',
            body: {
                sort: [{"Date": { "order": "asc"}}],
                query: {
                    match_phrase: {
                        reference: response.hits.hits[0]._source.MessageId
                    }
                }
            }
        }, function (error, response2) {
            res.json([...response.hits.hits,...response2.hits.hits]);
            res.end();
        })
    })
})



module.exports = router;