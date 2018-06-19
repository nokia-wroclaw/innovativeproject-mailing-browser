var express = require('express');
var router = express.Router();
const MyClient = require('../mailbox_connect')
var client = MyClient.client;

router.get('/:searchPhrase', function (req, res, next) {
    client.search({
        index: 'threads',
        q: req.params.searchPhrase
    }, function (error, response) {
        var threadlist = [];
        for(i = 0; i < response.hits.hits.length; i++)
            threadlist.push(response.hits.hits[i]._source.MessageId);
        
            client.search({
                index: 'mails',
                q: req.params.searchPhrase
            }, function (error, response2) {
                var list=[];
                var check = false;
                    for(i = 0; i < response2.hits.hits.length; i++) {
                        for(j = 0; j < threadlist.length; j++) {
                            if(response2.hits.hits[i]._source.reference == threadlist[j]) {
                                check = true;
                                break;
                            }
                        }
                        if(check == false) list.push(response2.hits.hits[i]._source.reference);
                        check = false;
                    }
                   if(list.length == 0) {
                    res.json(response.hits.hits);
                    res.end();
                } else {
                    var resp = [];
                    var iter = 0;
                    var check2 = false;
                    for(i = 0; i < list.length; i++) {
                        client.search({
                            index: 'threads',
                            body: {
                                sort: [{"Date": { "order": "asc"}}],
                                query: {
                                    match_phrase: {
                                        MessageId: list[i]
                                    }
                                }
                            }
                        }, function (error, response3) {
                            for(j = 0; j < resp.length; j++) {
                                if(response3.hits.hits[0]._source.MessageId == resp[j]._source.MessageId) {
                                    check2 = true;
                                    break;
                                }
                            }
                            if(check2 == false) resp.push(response3.hits.hits[0]);
                            check2 = false;
                            iter++;
                            if(iter == (list.length)) {
                                res.json([...response.hits.hits,...resp]);
                            }
                        })                        
                    }
                }          
            })
    })
});


module.exports = router;