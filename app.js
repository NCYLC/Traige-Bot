var watson = require('watson-developer-cloud');
const keys=require('./Keys');
var conversation = watson.conversation({
    username: keys.watson.username,//'98cb1a45-715e-4c3c-bdff-2f397a4d6473',
    password: keys.watson.password,//'GjSqKInjGtUz',
    version: 'v1',
    version_date: '2017-11-20'
  });

  module.exports=conversation;