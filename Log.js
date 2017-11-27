<<<<<<< HEAD
const fs = require('fs');
=======
var fs = require('fs');
>>>>>>> Adding to ncylc
var Log={};
var date=new Date();
var file_name="Logs/WatsonLog"+"-"+date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()+".txt";
console.log(file_name);


Log.CreateLog=function(Data){
<<<<<<< HEAD
    fs.appendFile(file_name,Data, (err) => {
=======
    fs.appendFile(file_name,Data, function(err){
>>>>>>> Adding to ncylc
        if (err) throw err;
        console.log('The '+Data+' was appended to file!');
      });
    };
<<<<<<< HEAD
    module.exports=Log
=======
    module.exports=Log;
>>>>>>> Adding to ncylc
