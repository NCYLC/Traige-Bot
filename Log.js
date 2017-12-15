const fs = require('fs');
var Log={};
var date=new Date();
var file_name="Logs/WatsonLog"+"-"+date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()+".txt";// Node logs
var facebookfile_name="Logs/FacebookLog"+"-"+date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()+".txt";// messanger logs
var Error_File="Logs/WatsonErrorLog"+"-"+date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()+".txt";
var facebookError_File="Logs/FacebookErrorLog"+"-"+date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()+".txt";
var feedBack="Logs/feedBack"+"-"+(date.getMonth()+1)+"-"+date.getFullYear()+".txt";

console.log(file_name);


Log.CreateLog=function(Data){
    fs.appendFile(file_name,Data, (err) => {
        if (err) throw err;
        console.log('The '+Data+' was appended'+ file_name+' to file!');
      });
    };
    Log.CreatefacebookLog=function(Data){
        fs.appendFile(facebookfile_name,Data, (err) => {
            if (err) throw err;
            console.log('The '+Data+' was appended to'+ facebookfile_name+'  file!');
          });
        };
        Log.ErrorLog= function(Data){
            data=new Date()+Data+'\n';
            fs.appendFile(Error_File,data, (err) => {
                if (err) throw err;
                console.log('The '+data+' was appended to'+ Error_File+' file!');
              });
            };
            Log.facebookErrorLog=function(Data){
                data=new Date()+Data+'\n';
                fs.appendFile(facebookError_File,data, (err) => {
                    if (err) throw err;
                    console.log('The '+data+' was appended to'+ facebookError_File+' file!');
                  });
                };

                Log.feedBack=function(Data){
                    data=new Date()+Data+'\n';
                    fs.appendFile(feedBack,data, (err) => {
                        if (err) throw err;
                        console.log('The '+data+' was appended to'+ feedBack+' file!');
                      });
                    };feedBack
    module.exports=Log
