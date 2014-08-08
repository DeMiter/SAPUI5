var http = require('http');
var url = require('url');
var qString = require('querystring');

var port = 2727;
var data = [];
var pName = "Name";
var pPass = "Word";
var pStatus = "Status";
var pPrivacy = "Privacy";
var pLatitude = "Latitude";
var pLongitude = "Longitude";
var pAltitude = "Altitude";
var db = {"people": [
    {pName: "John", pPass: "welcome", pStatus: "active", pPrivacy: "public", pLatitude: "0", pLongitude: "0", pAltitude: "0"},
  ]		
}; 
var template = {pName: "", pPass: "", pStatus: "inactive", pPrivacy: "public", pLatitude: "0", pLongitude: "0", pAltitude: "0"};
var found = 0; 

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
    		if(db.people[found].pPass === parsedQuery.p) {
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
    		 
    		data[ind] = JSON.parse(template);    	
    		data[ind].pName = parsedUrl.name;
    		data[ind].pPass = parsedUrl.p;
    		response.writeHead(200, {
			'Content-Type': 'text/plain',    	      
		}); //return success header
		response.write("User : " + parsedQuery.name + " registered!")
    	}
    } else { 
	    response.writeHead(400, {
	        'Content-Type': 'text/plain',    	      
	    }); // Unauthorized
    	response.write('Wrong operation!');    
    }    
    response.end(); //finish processing current request
}).listen(port);

function findRecord (s) {
	var found = -1;	
	var data = db.people;	
	for (i = 0 ; i < data.length; i++) {
		if (data[i].pName === s) {			
			found = i;
			break;
		}
	}
	return found;
};

console.log('Server is running on port ' + port);