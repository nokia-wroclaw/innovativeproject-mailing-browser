var express = require('express');
var router = express.Router();

router.get('/:searchPhrase', function (req, res, next) {
    Thread.findAll({
            where: {
                    [Op.or]: [
                        { Subject : { [Op.iLike]: '%'+req.params.searchPhrase+'%' }},
                        { Text: { [Op.iLike]: '%'+req.params.searchPhrase+'%' }}                     
                    ]
                },
            order: [
                ['Date', 'ASC'],
            ]
        }).then((thread) => {
            var threadlist=[];
                    for(i = 0; i < thread.length; i++) {
                        threadlist.push(thread[i].messageId);
                    }
            Mail.findAll({
                where: {
                    [Op.or]: [
                        { Subject : { [Op.iLike]: '%'+req.params.searchPhrase+'%' }},
                        { Text: { [Op.iLike]: '%'+req.params.searchPhrase+'%' }}                
                    ]
                }
            }).then((answer)=>{
                var list=[];
                var check = false;
                    for(i = 0; i < answer.length; i++) {
                        for(j = 0; j < threadlist.length; j++) {
                            if(answer[i].reference == threadlist[j]) {
                                check = true;
                                break;
                            }
                        }
                        if(check == false) list.push(answer[i].reference);
                        check = false;
                    }
                if(list.length == 0) {
                    res.json(thread);
                    res.end();
                } else {
                    Thread.findAll({
                    where: {
                        messageId: {
                            [Op.or]: list
                          }
                    },
                    order: [
                        ['Date', 'ASC'],
                    ]
                    }).then((thread2)=>{
                        res.json([...thread,...thread2]);
                        res.end();
                    })
                }          
            })    
        });    
});


module.exports = router;