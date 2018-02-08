

var express=require('express');//requiring Express to create server
 const Helmet=require ('helmet')
var keys=require('./Keys');//requiring Keys file which has all keys like watson creds and all
const workspaceID=keys.watson.workspaceID //Fetching watson workspaceid from keys file
//'38282176-f16f-4e2f-bd7d-4969793f9220'
var app=express();// Creating express object
var path = require('path');// requiring  node path module to access local path
var watson=require('.//app.js');//Requering app.js
var Sync = require('sync');//requering Sync module
var Log = require('.//Log');//requering Logs. js module
const request=require('request');//Requering node request module
const accesstoken=keys.facebook.accesstoken//facebook access token is stored from keys file                                                'EAAWK2Wgv6DMBAKMYlzmUo10Kg9fLp9ZARYUUGvyxIuIbsoCcsEduZAXesqNOiBdpOieSNbYNaJ1RxZBRgig8kt0RMI4RfdDZCHZC2s7Y5rZBOPmXjZCdLAk0IFJIPqnLW5ZCZC9EmHPZCNg4h9BwvVQUyuhEaiwx1CTNp0ZCSJtYJ3hvPoQVezQW3bM';
//var FacebookMessanger=require('.//messenger-webhook/Webhook')
app.use(express.static(__dirname + '/public'));//Making public folder visible in browser tree
app.use(Helmet());
var router = express.Router();//Initialising express router
var  message=[{"Type":"Received","Author":"Watson","Text":"This is watson","TimeStamp":new Date()}];
var CryptoJS =require('crypto-js');
var fs = require('.//Log');//requiring log.js module for using loging
//TimeOut ----------
var util = require('util');//requiring node utils module
var StartOfConv=false; //setting of startofconv flag to false
var ContextVariable=[];//Capture all context variables
var CleareContext=false;//setting CleareContext flag to false

var FacebookContext={};//context for facebook app
var Facebookcontexts=[];
var flag=false;//to show up  in facebook URLS
var quickreply=false;//to show quickreplies in facebook reply
var template=false;//to show templates
var Facebookaction={};// storing facebook actions in an object
router.get('/',function(req,res){
    
    res.sendFile(path.join(__dirname, '/', 'public','/','Views', 'Index.html'));//as a reponse sendding index.html to client browser


});//Creting function which will be rendered when url wil be hitted


var bodyParser = require('body-parser');//requiring body-parser node module
//var multer = require('multer');//to read objectified data
app.use(bodyParser.json()); // for parsing reuest data into Object this will use bodyparser as a middleware in each req and response
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
var sentdata={};//initialising senddata onject
var  message=[];// creating empty array

// storing feedback here
app.post('/Feedback',function(req,res){
  var Data="User has "+req.body.rate+" and commented "+req.body.Text+"\n"// creating Data string
  Log.feedBack(Data)//for logggging user feedback into feedback logs
  // console.log(JSON.stringify(req.body));

  res.sendStatus;// response sent back to user
});//Craeting post request for feedback functionality
 app.get('/Viewreport',async function(req,res){
 
  var ReportData=await Log.CreateReport();//creating report data 
// console.log("ReportData         "+JSON.stringify(ReportData));


                        
  res.json(ReportData);//sending reporting data to client browser
});//creating get req to fetch report 

//receiving message for watsokn
app.post('/watson',function (req, res, next) {//post method for sending message
  
var Context={};//Context for Node app
  var keySize = 256;
  var ivSize = 128;
  var iterations = 100;
  var password = "Secret Password";
  function decrypt (transitmessage, pass) {
    var salt = CryptoJS.enc.Hex.parse(transitmessage.substr(0, 32));
    var iv = CryptoJS.enc.Hex.parse(transitmessage.substr(32, 32));
    var encrypted = transitmessage.substring(64);
    
    var key = CryptoJS.PBKDF2(pass, salt, {
        keySize: keySize/32,
        iterations: iterations
      });
  
    var decrypted = CryptoJS.AES.decrypt(encrypted, key, { 
      iv: iv, 
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
      
    });
    return decrypted;
  }
 
var ReceivedData={};

    // decrypted = decrypt(req.query.y, password);
    // ReceivedData.Text = decrypted.toString(CryptoJS.enc.Utf8);
    // decrypted = decrypt(req.query.z, password);
    // ReceivedData.Author = decrypted.toString(CryptoJS.enc.Utf8);
    ReceivedData.Author=req.query.z;//capturing send message author info
    ReceivedData.Text=req.query.y;//capturing message text
    ReceivedData.Time=new Date();//getting at what time message came to middleware
     ReceivedData.Type="Sent";//setting message type
    var start=req.query.m;
    //console.log("start"+start+"Typew of start"+typeof(start));
    setTimeout(function(){ var str=new Date()+"   "+"Author : "+ ReceivedData.Author + "   Message :  "+ ReceivedData.Text+"\r\n" ;
    Log.CreateLog(str);// creating log to capture each request and response from user

// console.log("decrypted"+JSON.stringify(ReceivedData));
if(start=="true"){// will trigger if user ha refresed there browser thus will trigger Welcome node in watson
  // console.log("This is start of message");
  watson.message({
    input:{ text: '' },// passing null data to trigger  welcome node in watson
    workspace_id: workspaceID//passing workspace idinto mesage property

}, function(err, response) {
    if (err) {
      Log.ErrorLog(err);//loggig error if error occured
      console.error(err);
    } else {
            var text='';
        sentdata.Author="Ayla";//if success set Author
        sentdata.Type="Received";//set type as received
        if(response.output.text.length>1){// will be triggered if text has more than 1 item 
            for(var data in response.output.text ){
            text=text+'\n'+response.output.text[data];
            }
        }
        else
        text=response.output.text[0];// will be triggered if text has only one item
        Context=response.context;//setting incoming context into a variable
        console.log(JSON.stringify(response));//printing context
        StartOfConv=response.context.StartOfConv;
        sentdata.Text=text;
        sentdata.Time=new Date();
        sentdata.Context=Context;//giving user back his context
        // console.log(JSON.stringify(response));
        var str=new Date()+"   "+"Author : "+ "Ayla" + "   Message :  "+ sentdata.Text+"\r\n" ;
        Log.CreateLog(str);
    
        res.json(sentdata);//sending reponse back to user
    }
}); //end of watson message

}// end of start of conv module


          else{// if user has active session with watson
            Context=JSON.parse(req.query.c);//Getting context data fro user
            // console.log("Line 147"+typeof(Context)+JSON.stringify(Context));
            // console.log("After Start conversation");
            debugger;
         watson.message({
            input:{ text: ReceivedData.Text },
            workspace_id: workspaceID,
            context:Context  //passing incoming context varaible to watson context
        }, function(err, response) {
            if (err) {
              Log.ErrorLog(err);
              console.error(err);
            } else {
              Context=response.context;//storing output  context into same context variable thus updating context
              sentdata.Context=Context;
              // console.log(JSON.stringify(Context));
              CleareContext=response.output.CleareContext;//if we detect clearecontext
              if(CleareContext=="true"){//if cleare context is set
                console.log("Context Cleared.");
                var arr=Object.keys(response.context);//storing conntext into variable
              
                for (var data=2;data<arr.length;data++){
                  console.log("Nullifying contexts"+Context[arr[data]]+arr[data]);//nullfying user defined contexts
                  Context[arr[data]]=null;
                  
                }
                }
              
                    var text='';
                sentdata.Author="Ayla";
                sentdata.Type="Received";
                if(response.output.text.length>1){
                    for(var data in response.output.text ){
                    text=text+'\n'+response.output.text[data];
                    }
                }
                else
                text=response.output.text[0];
                var action=response.output.Actions;//storing actions
                console.log(JSON.stringify(action));
                if(action!=null||action!=undefined){
                  //callAction(action);
                  if(Object.keys(action)[0]=="Quickreply"){// if we detect quickreplies from watson json
                    var data=Object.keys(action)[0];
                    sentdata.quickreply=action[data];// storing quickreplies and sending to user
                  }
                  else if(Object.keys(action)[0]=="URL"){// if we detect URL in watson json
                    var data=Object.keys(action)[0];
                    sentdata.URL=action[data];
                    sentdata.title=action.title;//storing quickreplies and sending it back to users
                  }
                 
                  console.log("Actions is"+action);
                }
                else if(response.output.List!=null || response.output.List!=undefined){// checking if watson Json has any list data
                  console.log("List is been detected")
                  sentdata.List=response.output.List;//sending list data back to users
                  
                }
                sentdata.Text=text;
                sentdata.Time=new Date();
                // console.log(JSON.stringify(response));
                var str=new Date()+"   "+"Author : "+ "Ayla" + "   Message :  "+ sentdata.Text+"\r\n"; 
                Log.CreateLog(str);//upadting log data
                console.log(JSON.stringify(sentdata));
                res.json(sentdata);//sending data back to users
                
               
                sentdata={};// nullifing send object once its send to users
            }
          
        }); 
      }//End of else
 }, 300);


           
//res.sendStatus;
  });



  
var contextIndex;

 // facebook module starts here
  app.post('/webhook', (req, res) => {  
    console.log("Iside Post");
      // Parse the request body from the POST
      let body = req.body;
    
      // Check the webhook event is from a Page subscription
      if (body.object === 'page') {
    
        // Iterate over each entry - there may be multiple if batched
        body.entry.forEach(function(entry) {
    
          // Get the webhook event. entry.messaging is an array, but 
          // will only ever contain one event, so we get index 0
          let webhook_event = entry.messaging[0];
                   console.log(webhook_event);
                   sender_psid=webhook_event.sender.id;
                   
          if (sender_psid) {
            handleMessage(sender_psid, webhook_event.message);        
          }
          
        });
    
        // Return a '200 OK' response to all events
        res.status(200).send('EVENT_RECEIVED');
    
      } else {
        // Return a '404 Not Found' if event is not from a page subscription
        Log.facebookErrorLog('Return a 404 Not Found if event is not from a page subscription');
        res.sendStatus(404);
      }
    
    });
    function handleMessage(sender_psid, received_message) {
      
        let response;
        var text='';
        // Check if the message contains text
        if (received_message.text) {    
//         console.log("In watson received_message.text"+received_message.text);
          var text='';
          // if(received_message.text=='Test'){
           
          // }
          // if(received_message.text=='quickreply'){
            
//           }
          if(received_message.text=='template'){
            template=true;
          }
         else{
          var str=new Date()+"   "+"Author : "+ sender_psid + "   Message :  "+ received_message.text+"\r\n" ;
          Log.CreatefacebookLog(str);
          console.log("At line no 282 before call"+JSON.stringify(FacebookContext.context));
          watson.message({
            input:{ text: received_message.text },
            workspace_id: workspaceID,
           context:FacebookContext.context
        }, function(err, response) {
          console.log("Facebook response"+JSON.stringify(response));
            if (err) {
              Log.facebookErrorLog(err);
              console.error(err);
            } else {
         
            if(Facebookcontexts.find(v=>v.From==sender_psid)!=undefined){
              console.log("am at Facebook Bot and where  Sender has came already");
              Facebookcontexts[contextIndex].FacebookContext=response.context;
              }  
         
              else if(Facebookcontexts.find(v=>v.From==sender_psid)==undefined){
                console.log("am at Facebook Bot and where Sender has came for first time");
              Facebookcontexts.push({"From":sender_psid,"FacebookContext":response.context})
              }
            else if(FacebookContext==null){
               console.log("am at Facebook Bot and where context is null ");
              Facebookcontexts.push({"From":sender_psid,"FacebookContext":response.context})
            }              
               else if(response.output.text.length>1){
                    for(data in response.output.text ){
                    text=text+'\n'+response.output.text[data];
                    }
                }
                else
                text=response.output.text[0];

                var Faceaction=response.output.Actions;
//                console.log(JSON.stringify(action));
                if(Faceaction!=null||Faceaction!=undefined){
                  //callAction(action);
                  var action1=[];
                  
                 // var  dataHead=Object.keys(action[0])
                 
                  if(Object.keys(Faceaction)[0]=="Quickreply"){
                    var mainData=Faceaction['Quickreply'];
//                     console.log("We came to quick reply.");
                    // var data=action[Object.keys(action[0])];
                    for(var i=0;i<mainData.length;i++){
                    var data1={};
                    data1.content_type="text";
                    data1.payload=mainData[i];
                    data1.title=mainData[i];
                    action1.push(data1);
                    }
                    Facebookaction.quickreply=action1;
//                     console.log("facebook Quick reply"+JSON.stringify(action1));
                    quickreply=true;
                  }

                  // else if(response.output.List){

                  // }
                  else if(Object.keys(Faceaction)[0]=="URL"){
                    var data=Object.keys(Faceaction)[0];
                    Facebookaction.URL=Faceaction[data];
                    Facebookaction.title=Faceaction.title;
                    flag=true;//for buttons in face book.
                  }
//                   console.log("Actions is"+JSON.stringify(Facebookaction));
                }
            }
            //console.log("In Watson text"+text);
            response = {
              "text": text
            }
          
            callSendAPI(sender_psid, response,Facebookaction);  
           console.log("In Watson"+JSON.stringify(response));
        }); 
         }//test
          // Create the payload for a basic text message
         
          
        }  
        
        // Sends the response message
          
      }

app.get('/webhook', (req, res) => {
//   console.log(req.query);
if(req.query['hub.verify_token']==='Test')
res.send(req.query['hub.challenge']);
    
  });

  function callSendAPI(sender_psid, response,action) {


  var index = 0;
  Facebookcontexts.forEach(function(value) {
    console.log(value.From);
    if (value.From == sender_psid) {
      FacebookContext.context = value.FacebookContext;
      contextIndex = index;
    }
    index = index + 1;
  });
    // Construct the message body
    console.log("Inside Send api line2"+JSON.stringify(response)+JSON.stringify(action));
    let request_body = {};
    if(flag){
      request_body = { "recipient": {
        "id": sender_psid
      },
    "message":{
      "attachment":{
        "type":"template",
        "payload":{
          "template_type":"button",
          "text":response.text,
          "buttons":[
            {
              "type":"web_url",
              "url":action.URL,
              "title":action.title
            },
          ]
        }
      }
    }
    }
    flag=false;

    }
    else if(quickreply){
      request_body = { "recipient": {
        "id": sender_psid
      },
    "message":{
      "text": response.text,
      "quick_replies":action.quickreply
    }
    }
    //console.log("Quickreply response"+JSON.stringify(request_body))
    quickreply=false;
    }

    else if(template){
      request_body = { "recipient": {
        "id": sender_psid
      },
      "message":{
        "attachment":{
          "type":"template",
          "payload":{
            "template_type":"generic",
            "elements":[
               {
                "title":"Welcome to Peter\'s Hats",
                // "image_url":"https://petersfancybrownhats.com/company_image.png",
                "subtitle":"We\'ve got the right hat for everyone.",
                "default_action": {
                  "type": "web_url",
                  "url": "https://ncylcworkspace.slack.com/",
                  "messenger_extensions": true,
                  "webview_height_ratio": "tall",
                  "fallback_url": "https://ncylcworkspace.slack.com/"
                },
                "buttons":[
                  {
                    "type":"web_url",
                    "url":"https://ncylcworkspace.slack.com/",
                    "title":"View Website"
                  },{
                    "type":"postback",
                    "title":"Start Chatting",
                    "payload":"DEVELOPER_DEFINED_PAYLOAD"
                  }              
                ]      
              }
            ]
          }
        }
      }
    }
    template=false;
  }
    else{ request_body = {"recipient": {
      "id": sender_psid
    },
    "message": response
  }}
    
     
   
//   console.log(JSON.stringify(request_body )+"\n request body");
    // Send the HTTP request to the Messenger Platform
    //error coming here
 request({
      "uri": "https://graph.facebook.com/v2.6/me/messages",
      "qs": { "access_token": accesstoken },
      "method": "POST",
      "json": request_body
    }, (err, res, body) => {
      if (!err) {
        console.log('message sent!')
      } else {
        Log.facebookErrorLog(err);
        console.error("Unable to send message:" + err);
      }
    }); 
    var str=new Date()+"   "+"Author : "+ "watson" + "   Message :  "+ response.text+"\r\n" ;
    Log.CreateLog(str);
Facebookaction={};//resetting facebookaction
  }//Messanger post webhook
app.use('/',router);
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
// console.log(process.env);


const cluster = require('cluster');

const numCPUs = require('os').cpus().length;
if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    cluster.fork();// if worker dies it will restart
    console.log(`worker ${worker.process.pid} died`);

  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
 
  app.listen(process.env.PORT || 3001);
  console.log(`Worker ${process.pid} started`);
}
// app.listen(process.env.PORT || 3001);
//console.log(process.env);
module.exports=app;
