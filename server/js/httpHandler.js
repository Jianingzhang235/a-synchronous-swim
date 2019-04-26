const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');

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
    res.end()
    return;
  }
  res.end(module.exports.randomCommand());
};
