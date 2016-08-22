var https = require("https");

var options = {
 host:'api.github.com',
    path: '/gists',
    method: 'POST',
    headers: {'User-Agent':'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)'}
};

var input = JSON.stringify( {
     "description":"Created via API",
    "public":"true",
    "files":{"file1.txt":{"content":"Demo"}}
  } );

var post = https.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('Response data: ' + chunk)
  });
});

post.on('error', function(e) {
  console.log('problem with postuest: ' + e.message);
});

post.write(input);
post.end();
