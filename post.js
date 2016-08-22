// var rq = require('request')
var http = require('http')
var options = {
    host:'api.github.com',
    path: '/gists',
    method: 'POST',
    headers: {'User-Agent':'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)'}
}
var input = JSON.stringify({
    "description":"Created via API",
    "public":"true",
    "files":{"file1.txt":{"content":"Demo"}}
});

 var post_req = http.request(options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('Response: ' + chunk);
      });
  });

    post_req.on('error', function(e) {
        console.error('and the error is '+e);
    });
    post_req.write(input);
    post_req.end();

