var watson = require('watson-developer-cloud');

var conversation = watson.conversation({
    username: '4061a633-e383-4963-aee8-4a386429ec33',
    password: 'OxnvbJuCIxIY',
    version: 'v1',
    version_date: '2017-11-20'
  });

  module.exports=conversation;