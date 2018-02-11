
var express=require('express');//requiring Express to create server
 const Helmet=require ('helmet')
var keys=require('./Keys');//requiring Keys file which has all keys like watson creds and all
const workspaceID=keys.watson.workspaceID //Fetching watson workspaceid from keys file
//'38282176-f16f-4e2f-bd7d-4969793f9220'

var bodyParser = require('body-parser');//requiring body-parser node module
var facebookApp=express();// Creating express object
var watson=require('.//app.js');//Requering app.js
var Log = require('.//Log');//requering Logs. js module
const request=require('request');//Requering node request module
const accesstoken=keys.facebook.accesstoken//facebook access token is stored from keys file  
var fs = require('.//Log');//requiring log.js module for using loging

var flag=false;//to show up  in facebook URLS
var quickreply=false;//to show quickreplies in facebook reply
var template=false;//to show templates
var FacebookContext=null;//context for facebook app
var Facebookaction={};// storing facebook actions in an object
facebookApp.use(bodyParser.json()); // for parsing reuest data into Object this will use bodyparser as a middleware in each req and response
facebookApp.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
var contextIndex;
var Facebookcontexts=[];
console.log("I am here at facebookBot.js");
 // facebook module starts here
  facebookApp.post('/', (req, res) => {  
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
          // if(received_message.text=='template'){
          //   template=true;
          // }
        //  else{
          var str=new Date()+"   "+"Author : "+ sender_psid + "   Message :  "+ received_message.text+"\r\n" ;
          Log.CreatefacebookLog(str);
          console.log("At line no 282 before call"+JSON.stringify(FacebookContext));
          watson.message({
            input:{ text: received_message.text },
            workspace_id: workspaceID,
           context:FacebookContext
        }, function(err, response) {
          // console.log("Facebook response"+JSON.stringify(response));
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
                         
               if(response.output.text.length>1){
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
         
          
        // }  
        
        // Sends the response message
          
      }

    
        // Return a '200 OK' response to all events
        res.status(200).send('EVENT_RECEIVED');
    
      } else {
        // Return a '404 Not Found' if event is not from a page subscription
        Log.facebookErrorLog('Return a 404 Not Found if event is not from a page subscription');
        res.sendStatus(404);
      }
    
    });
    facebookApp.get('/', (req, res) => {
//   console.log(req.query);
if(req.query['hub.verify_token']==='Test')
res.send(req.query['hub.challenge']);
    
  });
 function callSendAPI(sender_psid, response,action) {

     FacebookContext = null;
  var index = 0;
  Facebookcontexts.forEach(function(value) {
    console.log(value.From);
    if (value.From == sender_psid) {
      FacebookContext = value.FacebookContext;
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
  }
module.exports=facebookApp;