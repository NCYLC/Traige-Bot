

const util = require('util');
const fs = require('fs');
var Log={};
var date=new Date();
var file_name="Logs/WatsonLog"+"-"+date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()+".txt";// Node logs
var facebookfile_name="Logs/FacebookLog"+"-"+date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()+".txt";// messanger logs
var Error_File="Logs/WatsonErrorLog"+"-"+date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()+".txt";
var facebookError_File="Logs/FacebookErrorLog"+"-"+date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()+".txt";
var feedBack="Logs/feedBack"+"-"+(date.getMonth()+1)+"-"+date.getFullYear()+".txt";
var  appendFile= util.promisify(fs.appendFile);
// console.log(file_name);


    Log.CreateLog=async function(Data){
    try{
    await appendFile(file_name,Data);
    // console.log(Data +"is been printen to "+file_name);
    }
    catch(err){
        console.log(err);
    }

        };

        Log.CreatefacebookLog=async function(Data){
            try{
                await appendFile(facebookfile_name,Data);
//                 console.log(Data +"is been printen to "+facebookfile_name);
                }
                catch(err){
                    console.log(err);
                }
            };
        Log.ErrorLog=async function(Data){
            data=new Date()+Data+'\n';
            try{
               await appendFile(Error_File,data);
                console.log(data +"is been printen to "+Error_File);
                }
                catch(err){
                    console.log(err);
                }
            };
            Log.facebookErrorLog=async function(Data){

                data=new Date()+Data+'\n';
                try{
                    await appendFile(facebookError_File,data);
                    console.log(data +"is been printen to "+facebookError_File);
                    }
                    catch(err){
                        console.log(err);
                    }
               
                };

                Log.feedBack=async function(Data){
                    data=new Date()+Data;
                    try{
                        await appendFile(feedBack,data);
                        console.log(data +"is been printen to "+feedBack);
                        }
                        catch(err){
                            console.log(err);
                        }
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
