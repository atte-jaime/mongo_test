const MongoClient = require('mongodb').MongoClient,
    express = require('express'),
    consolidate = require('consolidate'),
    hbs = require('handlebars');

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if (err) throw err;

    var db = client.db('test');
    var res = db.collection('countries')
        .find({
            area: {
                $gte:40,
                $lt: 200
            }
        }, {
            projection: {
                area: 1,
                'name.common': 1
            }
        }).sort({
            area: 1
        })
        .limit(5)
        .toArray((err, result) => {
            console.log(result);
        })
});


var app = express();