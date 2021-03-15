/*
var http = require('http');
var fs = require('fs');
function OnRequest(req,res){
  res.writeHead(200,{'Content-Type':'text/html'});
  fs.readFile('./thietke.html',null,function(err,data){
    if(err)
    {
      res.writeHead(404);
      res.write("file is not found!");
    }
    else{
      res.write(data);
    }
    res.end();
  });
}
http.createServer(OnRequest).listen(8080);*/

// File system
/*var http = require('http');
var fs = require('fs');
http.createServer(function (req, res) {
  fs.readFile('./thietke.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}).listen(8080);*/



/*var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function(req,res){
  var q = url.parse(req.url,true); // lay cai chuoi url tren thanh tim kiem
  var filename = "."+ q.pathname; // địa chỉ của file
  fs.readFile(filename,function(err,data){
      if(err)
      {
        res.writeHead(404,{'Contend-Type':'text/html'});
        res.write("404 not found");
        return res.end();
      }
      else
      {
        res.writeHead(200,{'Contend-Type':'text/html'});
        res.write(data);
        return res.end();
      }
  });
}).listen(8080);*/


//////////////////*************** */
// notified with ReadFile Stream
/*var http = require('http');
var fs = require('fs');
var rs = fs.createReadStream('./testReadStream.txt');
rs.on('open',function(){
  console.log('the file is open');
});*/

var http = require('http');
var formidable = require('formidable');
var fs = require('fs');

http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      var newpath = './images/' + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
      });
 });
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(8080);