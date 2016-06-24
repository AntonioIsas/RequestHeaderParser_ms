var express = require('express');
var app = express();

app.get('/', function(req, res) {
    
    var s = req.get('user-agent');
    var software_start = s.search(/\(/)+1;
    var software_end = s.search(/\)/);
    var software = s.slice(software_start, software_end);
    
    var result = {
        "ipaddress": req.get('x-forwarded-for').split(',')[0],
        "language": req.get('accept-language').split(',')[0],
        "software": software
    };
    
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result));
});

var port = process.env.PORT || 8080; 
app.listen(port);