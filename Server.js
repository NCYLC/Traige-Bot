

var express=require('express');
var app=express();
var path = require('path');
var watson=require('.//app.js');
var Sync = require('sync');//synchronising
var Log = require('.//Log');//Calling Log Js
//var FacebookMessanger=require('.//messenger-webhook/Webhook')
app.use(express.static(__dirname + '/public'));
var router = express.Router();
var  message=[{"Type":"Received","Author":"Watson","Text":"This is watson","TimeStamp":new Date()}];
var CryptoJS =require('crypto-js');
var fs = require('.//Log');//Calling Node Fs
//TimeOut ----------
var util = require('util');
var StartOfConv=false; 
var ContextVariable=[];//Capture all context variables
var Context={};//Context for Node app
var FacebookContext={};//context for facebook app
var flag=false;//to show up URLS
var quickreply=false;//to show quick reply
var template=false;//to show templates

router.get('/',function(req,res){
    
    res.sendFile(path.join(__dirname, '/', 'public','/','Views', 'index.html'));

});

var bodyParser = require('body-parser');// to read data from req.body
//var multer = require('multer');//to read objectified data
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
var sentdata={};
var  message=[];

app.post('/watson',function (req, res, next) {
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
    ReceivedData.Author=req.query.z;
    ReceivedData.Text=req.query.y;
    ReceivedData.Time=new Date();
     ReceivedData.Type="Sent";
     var start=req.query.m;
    //console.log("start"+start+"Typew of start"+typeof(start));
    setTimeout(function(){ var str=new Date()+"   "+"Author : "+ ReceivedData.Author + "   Message :  "+ ReceivedData.Text+"\r\n" ;
    Log.CreateLog(str);

console.log("decrypted"+JSON.stringify(ReceivedData));
if(start=="true"){
  console.log("This is start of message");
  watson.message({
    input:{ text: '' },
    workspace_id: 'c4365db3-9e85-4417-9d71-12cdb55925a9'
}, function(err, response) {
    if (err) {
      console.error(err);
    } else {
            var text='';
        sentdata.Author="Watson";
        sentdata.Type="Received";
        if(response.output.text.length>1){
            for(var data in response.output.text ){
            text=text+'\n'+response.output.text[data];
            }
        }
        else
        text=response.output.text[0];
        Context=response.context;
        StartOfConv=response.context.StartOfConv;
        sentdata.Text=text;
        sentdata.Time=new Date();
        console.log(JSON.stringify(response));
        var str=new Date()+"   "+"Author : "+ "Watson" + "   Message :  "+ sentdata.Text+"\r\n" ;
        Log.CreateLog(str);
    
        res.json(sentdata);
    }
}); 

}


          else{
            console.log("After Start conversation");
         watson.message({
            input:{ text: ReceivedData.Text },
            workspace_id: 'c4365db3-9e85-4417-9d71-12cdb55925a9',
            context:Context  
        }, function(err, response) {
            if (err) {
              console.error(err);
            } else {
              Context=response.context;
                    var text='';
                sentdata.Author="Watson";
                sentdata.Type="Received";
                if(response.output.text.length>1){
                    for(var data in response.output.text ){
                    text=text+'\n'+response.output.text[data];
                    }
                }
                else
                text=response.output.text[0];
                var action=response.output.action;
                if(action!=null||action!=undefined){
                  //callAction(action);
                  if(action[0]=="ConfirmCarbooking"){
                    response.context.CarBookingDate=null;
                    response.context.CarBookingTime=null;
                    response.context.CarBookingConfirmation=null;
                  }
                  console.log("Actions is"+action);
                }
                sentdata.Text=text;
                sentdata.Time=new Date();
                console.log(JSON.stringify(response));
                var str=new Date()+"   "+"Author : "+ "Watson" + "   Message :  "+ sentdata.Text+"\r\n"; 
                Log.CreateLog(str);
                
                res.json(sentdata);
            }
          
        }); 
      }//End of else
 }, 300);


           
//res.sendStatus;
  });


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
        res.sendStatus(404);
      }
    
    });
    function handleMessage(sender_psid, received_message) {
      
        let response;
        var text='';
        // Check if the message contains text
        if (received_message.text) {    
        console.log("In watson received_message.text"+received_message.text);
          var text='';
          if(received_message.text=='Test'){
            flag=true;
          }
          if(received_message.text=='quickreply'){
            quickreply=true;
          }
          if(received_message.text=='template'){
            template=true;
          }
          
          watson.message({
            input:{ text: received_message.text },
            context:FacebookContext,
            workspace_id: 'c4365db3-9e85-4417-9d71-12cdb55925a9'
        }, function(err, response) {
          console.log("Facebook response"+JSON.stringify(response));
            if (err) {
              console.error(err);
            } else {
              FacebookContext=response.context; 
                
                if(response.output.text.length>1){
                    for(data in response.output.text ){
                    text=text+'\n'+response.output.text[data];
                    }
                }
                else
                text=response.output.text[0];
             
            }
            //console.log("In Watson text"+text);
            response = {
              "text": text
            }
            callSendAPI(sender_psid, response);  
           // console.log("In Watson"+JSON.stringify(response));
        }); 
      
          // Create the payload for a basic text message
         
          
        }  
        
        // Sends the response message
          
      }

app.get('/webhook', (req, res) => {
  console.log(req.query);
if(req.query['hub.verify_token']==='Test')
res.send(req.query['hub.challenge']);
    
  });

  function callSendAPI(sender_psid, response) {
    // Construct the message body
    console.log("Inside Send api line2"+JSON.stringify(response));
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
          "text":"Do you want to navigate to our website?",
          "buttons":[
            {
              "type":"web_url",
              "url":"http://www.lawstuff.org.au/",
              "title":"Visit Messenger"
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
      "text": "Please select your state",
      "quick_replies":[
        {
          "content_type":"text",
          "title":"ACT",
          "payload":"ACT"
        },
        {
          "content_type":"text",
          "title":"NSW",
          "payload":"NSW"
        },
        {
          "content_type":"text",
          "title":"NT",
          "payload":"NT"
        },
        {
          "content_type":"text",
          "title":"QLD",
          "payload":"QLD"
        },
        {
          "content_type":"text",
          "title":"SA",
          "payload":"SA"
        },
        {
          "content_type":"text",
          "title":"TAS",
          "payload":"TAS"
        },
        {
          "content_type":"text",
          "title":"VIC",
          "payload":"VIC"
        }, {
          "content_type":"text",
          "title":"WA",
          "payload":"WA"
        },
      ]
    }
    }
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
                "image_url":"https://petersfancybrownhats.com/company_image.png",
                "subtitle":"We\'ve got the right hat for everyone.",
                "default_action": {
                  "type": "web_url",
                  "url": "https://peterssendreceiveapp.ngrok.io/view?item=103",
                  "messenger_extensions": true,
                  "webview_height_ratio": "tall",
                  "fallback_url": "https://peterssendreceiveapp.ngrok.io/"
                },
                "buttons":[
                  {
                    "type":"web_url",
                    "url":"https://petersfancybrownhats.com",
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
    
     
   
  console.log(request_body );
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
        console.error("Unable to send message:" + err);
      }
    }); 

  }//Messanger post webhook
app.use('/',router);
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
console.log(process.env);
app.listen(3001);
//console.log(process.env);
module.exports=app;