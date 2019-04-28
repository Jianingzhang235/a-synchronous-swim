const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messagesQueue = require('./messageQueue')

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
// module.exports.backgroundImageFile = './background.jpg';
////////////////////////////////////////////////////////

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);

  if (req.method === 'OPTIONS'){
    res.writeHead(200, headers);
    res.end();
  } else if (req.method === 'GET'){
    if(req.url === '/command'){
      res.writeHead(200, headers);
      res.write(messagesQueue.dequeue() || '');
      res.end();
    } else if (req.url === '/background.jpg'){
      var { backgroundImageFile } = module.exports;
      fs.readFile(backgroundImageFile,(err,results) => {
        if (err){
          console.log('-------------' + err);
          res.writeHead(404,headers);
          res.end();
        } else {
          res.writeHead(200, headers);
          res.write(results);
          res.end();
        }
      });

    }
  } else if (req.method === 'POST'){
    if (req.url === '/background.jpg'){
      var imageData = Buffer.alloc(0);
      req.on('data', (chunk) => {
        imageData = Buffer.concat([imageData, chunk]);
      });

      req.on('end',() => {
        var file = multipart.getFile(imageData);
        var { backgroundImageFile } = module.exports;
        fs.writeFile(backgroundImageFile, file.data, (err) => {
          if (err) {
            res.writeHead(400,headers);
            res.end();
          } else {
            res.writeHead(201,headers);
            res.end();
          }
        });
      });

      res.writeHead(201,headers);
      res.end();
    }
  }
};
