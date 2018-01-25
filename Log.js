const util = require('util');
const fs = require('fs');
var Log={};
var date=new Date();
var file_name="Logs/WatsonLog"+"-"+date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()+".txt";// Node logs
var facebookfile_name="Logs/FacebookLog"+"-"+date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()+".txt";// messanger logs
var Error_File="Logs/WatsonErrorLog"+"-"+date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()+".txt";
var facebookError_File="Logs/FacebookErrorLog"+"-"+date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()+".txt";
var feedBack="Logs/feedBack"+"-"+(date.getMonth()+1)+"-"+date.getFullYear()+".txt";

// console.log(file_name);


Log.CreateLog=function(Data){
    fs.appendFile(file_name,Data, (err) => {
        if (err) throw err;
        // console.log('The '+Data+' was appended'+ file_name+' to file!');
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
                    data=new Date()+Data;
                    fs.appendFile(feedBack,data, (err) => {
                        if (err) throw err;
                        console.log('The '+data+' was appended to'+ feedBack+' file!');
                      });
                    };
                   
                    
                    
                    
                    Log.CreateReport=async function() {
                        const readFile = util.promisify(fs.readFile);
                        let dataarray=[];
                        try{
                      const data = await readFile(feedBack,'UTF8');
                      var array=data.split('\n');
                      for(var i=0;i<array.length-1;i++){
                          var splited =array[i].split('has ');
                           var dataNode=splited[1].split(' and')
                          
                          dataarray.push(dataNode[0]);
                      }
                    }catch(err){
                        dataarray=[];
                        console.log("couldn't find file")
                    }
                    //   console.log(data);
                      
                        // array=data.split('\n');
                        // console.log('returned array    '+dataarray);
                        // console.log(array)
                     return dataarray;
                    }
                    
                
                //   Log.CreateReport();
    module.exports=Log
