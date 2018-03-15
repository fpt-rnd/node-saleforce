var nforce = require('nforce');
var config = require('../config');
var org = nforce.createConnection({
    clientId: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
    redirectUri: config.CALLBACK_URL + '/oauth/_callback',
    mode: 'single',
    environment: config.ENVIRONMENT  // optional, sandbox or production, production default
})

var accountArray = [];


var getAccounts = () => {
    return new Promise((resolve, reject) => {
        org.authenticate({ username: config.USERNAME, password: config.PASSWORD }, function (err, oauth) {
            if (err) {
                console.log('Authentication Failed:::::', err);
                reject(err);
            } else {
                console.log('*** Successfully connected to Salesforce ***');
                var q = 'SELECT id, name FROM account LIMIT 10';
                org.query({ query: q }, function (err, resp) {
                    if (err) {
                        console.log('Query Account Error', err);
                    }
                    if (!err && resp.records) {
                        resp.records.forEach((data) => {
                            accountArray.push(data._fields);
                        });
                        resolve(accountArray);
                    }
                });
            }
        });
    });

}

exports.getAccounts = getAccounts;