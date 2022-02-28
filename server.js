const express = require('express');
const app = express();
const config = require('./config')
const bodyParser = require('body-parser');
const http = require('http');
var path = require('path');
var fs = require('fs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb'}));
 
app.use(config.cors);

app.use(express.static('build'));

app.use('/', (req,res)=>{

    res.sendFile(path.join(__dirname + '/build/index.html'));
    // fs.readFile('index.html',function (err, data){

    //     res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
    //     res.write(data);
    //     res.end();
    // });

    // res.sendFile('D:/Work/JavascriptProject/RecordRTC/testing/index.html');
    // res.end(); 
});

const server = http.createServer(app);

server.listen(3000);