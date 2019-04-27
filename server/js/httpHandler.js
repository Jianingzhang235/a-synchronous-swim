const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messagesQueue = require('./messageQueue')

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////
module.exports.randomCommand = () => {
  var arr = ['up','down','left','right'];
  return arr[Math.floor(Math.random() * arr.length)];
}
module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  res.writeHead(200, headers);
  if (req.method === 'OPTIONS'){
    res.end();
  }
  if (req.method === 'GET' && req['content-type'] === 'image'){
    //return image as an src
  }
  if (req.method === 'GET'){
    var command = messagesQueue.dequeue()||'';
    res.write(command);
    res.end(messagesQueue.dequeue());
  };
};
