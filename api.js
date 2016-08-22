
var https = require("https");

var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What is your github username? ', (userName) => {

    // var userName='mohyour';
    var options = {
    host:'api.github.com',
    path: '/users/' + userName+ '/repos',
    method: 'GET',
    headers: {'User-Agent':'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)'}

    };
    var request = https.request(options, function(response){
    var body = '';
    response.on('data',function(chunk){
        body+=chunk;
    });
    response.on('end',function(){
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
rl.close();
});
