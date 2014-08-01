var http = require('http');
var url = require('url');
var qString = require('querystring');

var port = 2727;
var data = [];
var record = ''; 
var found = 0; 

http.createServer(function(request, response) {

    response.writeHead(200, {
        'Content-Type': 'text/plain',
        'Set-Cookie': ['type=ninja', 'language=javascript']
    }); //return success header

    
    var parsedUrl = url.parse(request.url);
    var parsedQuery = qString.parse(parsedUrl.query);
    var lName = parsedQuery.name;    
    record = '';
        
    if (parsedUrl.pathname === '/add') {
    	found = 0;
    	if (lName) {
    		record = lName + '#' + parsedQuery.location;
    		for (i = 0 ; i < data.length; i++) {
    			if (data[i].indexOf(lName) > -1) {
    				data[i] = record;
    				response.write('Updated');
    				found = 1;
    				break;
    			}
    		}
    		if (found !== 1) {
    			data[i] = record;
    			response.write('Added');
    		}
    	}
    } else {    	    
    	if (lName) {
    		for (i = 0 ; i < data.length; i++) {
    			if (data[i].indexOf(lName) > -1 ) {
    				record = data[i]; 
    				break;
    			}
    		}
    		if (record.length > 0) {
    			response.write(record);
    		} else {
    			response.write('Inavailable');
    		}
    	} else {
    		response.write('Wrong operation');
    	} 
    }
    
    response.end(); //finish processing current request
}).listen(port);

console.log('Server is running on port ' + port);