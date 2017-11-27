var watson = require('watson-developer-cloud');

var conversation = watson.conversation({
    username: 'dda2bbce-3f40-4497-ad9b-035916129a42',
    password: 'uekXeW8L3QKu',
    version: 'v1',
    version_date: '2017-11-20'
  });

  module.exports=conversation;