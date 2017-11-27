const fs = require('fs');
var Log={};
var date=new Date();
var file_name="Logs/WatsonLog"+"-"+date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()+".txt";
console.log(file_name);


Log.CreateLog=function(Data){
    fs.appendFile(file_name,Data, (err) => {
        if (err) throw err;
        console.log('The '+Data+' was appended to file!');
      });
    };
    module.exports=Log
