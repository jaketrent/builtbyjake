var http = require('http');
var fs = require('fs');
var path = require('path');

var port = process.env.PORT || 3000;

http.createServer(function (request, response) {

  console.log('starting requst..');

	var filePath = '.' + request.url;
	if (filePath == './')
		filePath = './index.html';

	var extname = path.extname(filePath);
	var contentType = 'text/html';
	switch (extname) {
		case '.js':
			contentType = 'text/javascript';
			break;
		case '.css':
			contentType = 'text/css';
			break;
		case '.jpg':
			contentType = 'image/jpeg';
			break;
		case '.png':
			contentType = 'image/png';
			break;
	}

	path.exists(filePath, function(exists) {

		if (exists) {
			fs.readFile(filePath, function(error, content) {
				if (error) {
					response.writeHead(500);
					response.end();
				}
				else {
					response.writeHead(200, { 'Content-Type': contentType });
					response.end(content, 'utf-8');
				}
			});
		}
		else {
			response.writeHead(404);
			response.end();
		}
	});

}).listen(port);

console.log("Listening on " + port);
