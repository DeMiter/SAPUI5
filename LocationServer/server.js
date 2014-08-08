var http = require('http');
var url = require('url');
var qString = require('querystring');

var port = 2727;
var data = [];

var db = {"people": [
    {"name": "John", "word": "welcome", "status": "active", "privacy": "public", "latitude": "39.882528", "longitude": "116.514189", "altitude": "0"},
    {"name": "Peter", "word": "welcome", "status": "active", "privacy": "public", "latitude": "45.496508", "longitude": "-73.556062", "altitude": "0"},
  ]		
}; 

var found = 0; 

function findRecord (s) {
	var found = -1;	
	var data = db.people;
	var i = 0;
	for (i = 0 ; i < data.length; i++) {
		if (data[i].name === s) {			
			found = i;
			break;
		}
	}
	return found;
};

http.createServer(function(request, response) {

    response.writeHead(200, {
        'Content-Type': 'text/plain',
        'Set-Cookie': ['type=nonsence', 'language=javascript']
    }); //return success header

    
    var parsedUrl = url.parse(request.url);
    var parsedQuery = qString.parse(parsedUrl.query);    
    record = '';
    
    if (parsedUrl.pathname === '/login') {    	    	
    	found = findRecord(parsedQuery.name);
    	if (found === -1) {
    	    response.writeHead(401, {
    	        'Content-Type': 'text/plain',    	      
    	    }); // Unauthorized
    	    response.write("User or password are wrong!")    		
    	} else {
    		if(db.people[found].word === parsedQuery.p) {
    			response.writeHead(200, {
    				'Content-Type': 'text/plain',    	      
    			}); //return success header
    			response.write("User : " + parsedQuery.name + " logged!")
    		} else {
        	    response.writeHead(401, {
        	        'Content-Type': 'text/plain',    	      
        	    }); // Unauthorized
        	    response.write("User or password are wrong!")   
    		}
    	}
    } else if (parsedUrl.pathname === '/signin') {      	
    	found = findRecord(parsedQuery.name);
    	if (found !== -1) {
    	    response.writeHead(401, {
    	        'Content-Type': 'text/plain',    	      
    	    }); // Unauthorized
    	    response.write("User already exists!")   
    	} else {
    		data = db.people;    		    		
    		var ind = data.length;
    				    	
    		data[ind] = {"name": "", "word": "", "status": "active", "privacy": "public", "latitude": "0", "longitude": "0", "altitude": "0"};
    		data[ind].name = parsedQuery.name;
    		data[ind].word = parsedQuery.p;
    		response.writeHead(200, {
			'Content-Type': 'text/plain',    	      
		}); //return success header
		response.write("User : " + parsedQuery.name + " registered!")
    	}
    } else if (parsedUrl.pathname === '/search') {
    	found = findRecord(parsedQuery.name);
    	if (found === -1) {
    	    response.writeHead(400, {
    	        'Content-Type': 'text/plain',    	      
    	    }); // No data!
    	    response.write("No data!")    		
    		
    	} else {
    	    response.writeHead(200, {
    	        'Content-Type': 'text/plain',    	      
    	    }); // Found
    	    data = db.people[found];
    	    response.write(JSON.stringify(data));  		
    		
    	}
    } else if (parsedUrl.pathname === '/update') {
    	
    	found = findRecord(parsedQuery.name);
    	if (found === -1) {
    		response.writeHead(400, {'Content-Type': 'text/plain',});
    		response.write("User does not exist!");
    	} else {
    		data = db.people[found];
    		data.latitude = parsedQuery.latitude;
    		data.longitude = parsedQuery.longitude;
    		data.altitude = parsedQuery.altitude;
    		response.writeHead(200, {'Content-Type': 'text/plain',});
    		response.write("Updated!" + JSON.stringify(data));

    	}
    	
    } else { 
	    response.writeHead(400, {
	    	'Content-Type': 'text/plain',
	    	'Set-Cookie': ['type=nonsence', 'language=javascript']}); // Wrong operation
    	response.write('Wrong operation!');    
    }
    response.end(); //finish processing current request
}).listen(port);

console.log('Server is running on port ' + port);
console.log('Possible commands:');
console.log('/login?name<Name>=&p=<Password>');
console.log('/search?name=<Name>');
console.log('/update?name=<Name>&p=<password>&latitude=<latitude>&longitude=<longitude>&altitude=<altitude>');
console.log('/signin?name<Name>=&p=<Password>');
