'use strict'
var https = require("https");
var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What do you want to do? Get your repos (Enter "1") or Post a gist (enter "2") ', (answer) => {
    var reply = new ApiRequest();
    if (answer == '1') {
        rl.question("enter your username:  ", (username) => {
             reply.getRequest(username)
             rl.close();
            })
        }
    else if (answer == 2) {
        rl.question("Enter your post:  ", (gist_post) => {
             reply.postRequest(gist_post)
             rl.close();
            })
        }
    else {
        console.log('Enter either "1" or "2"')
        rl.close();
        }
});


class ApiRequest {
    constructor() {

    }

    getRequest (userName) {
        var options = {
        host:'api.github.com',
        path: '/users/' + userName+ '/repos',
        method: 'GET',
        headers: {'User-Agent':'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)'}
            };
        var request = https.request(options, function(response) {
        var body = '';
        response.on('data',function(chunk) {
            body+=chunk;
            });
        response.on('end',function() {
            var json = JSON.parse(body);
            var repos =[];
            json.forEach(function(repo){
                repos.push(repo.name)
            });
            console.log("You have the following repositories:")
            for (var i = 0; i < repos.length; i++) {
                console.log(repos[i]);
                }
            });
        });
        request.on('error', function(e) {
        console.error('and the error is '+e);
        });
        request.end();
    }

    postRequest(gist) {
        var options = {
        host:'api.github.com',
        path: '/gists',
        method: 'POST',
        headers: {'User-Agent':'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)'}
        };

        var input = JSON.stringify( {
        "description":"Created via API",
        "public":"true",
        "files":{"file1.txt":{"content":gist}}
        });

        var post = https.request(options, function(res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
        console.log('Response data: ' + chunk)
            });
        });
        post.on('error', function(e) {
        console.log('problem with postrequest: ' + e.message);
        });
        post.write(input);
        post.end();
        }

}


