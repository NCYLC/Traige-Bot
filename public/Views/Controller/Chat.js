var app=angular.module('Chat',['ngStorage']);
app.controller('ChatController',['$scope','$localStorage','$filter','$location','$http','$anchorScroll','$timeout',function(scope,local,filter,location,http,anchorScroll,timeout){
    scope.message=[];
    scope.isChatOpenFlag=false;
    var serverurl=location.absUrl();
    console.log(serverurl);
    scope.sendData={};
    scope.Text;
    // scope.Textarea;
    scope.regions=["ACT","NSW","NT","QLD","SA","TAS","VIC","WA"];
    scope.showButtons=false;
    scope.TextSent='';
    scope.OpenFeedback=false;
    scope.rating;
    scope.ratingText=["Hated it","Disliked it","It's OK","Liked it","Loved it"];
    var StartofConv=false;
    scope.quickreplyflag=false;
    scope.UrlButtonFlag=false;
    scope.quickreply=[];//quick reply array
    scope.UrlButton=[];//Url navigator
    scope.Textarea='';
scope.Feedbackupload=function(data1,data2){

console.log(data1+data2);
scope.FeedbackData={};
scope.FeedbackData.rate=data1;
scope.FeedbackData.Text=data2;
http.post(serverurl+"Feedback",scope.FeedbackData).then(function(request,response){
console.log(JSON.stringify(response));
}),function error(response){
    
    console.log(response);

}

}

    var saveWindowHeight= true;
    var savedWindowHeight,savedWindowWidth,windowHeight;
//set the initial window width



//then on resize...
if (saveWindowHeight = true){
    savedWindowWidth = window.innerWidth;
    savedWindowHeight=window.innerHeight;
    saveWindowHeight = false;

}

 window.onresize =function() {
    windowHeight =window.innerHeight ;
// alert(windowHeight);
     if(window.orientation="landscape")
     {

        if(windowHeight/(savedWindowHeight) >=0.38 ){
            var form=document.getElementById("chat-history");
            var Header=document.getElementById("Header");
            Header.style.display='block';
            form.style.display='block';
            // scope.message=scope.message;
            // var old='';
            // location.hash(scope.message.length-1)
          
            //       anchorScroll();
            //       timeout(function(){location.hash(old)},100);
            return;

        }
        else{
            var form=document.getElementById("chat-history");
            var Header=document.getElementById("Header");
            Header.style.display='none';
            form.style.display='none';

            return;
        }


     }

else{
    var form=document.getElementById("chat-history");
    
    form.style.display='block';
    // scope.message=scope.message;
    var Header=document.getElementById("Header");
    Header.style.display='block';

    
    // var old='';
    // location.hash(scope.message.length-1)
  
    //       anchorScroll();
    //       timeout(function(){location.hash(old)},100);
    return;

}

// //if the screen has resized then the window width variable will update
       


// //if the saved window width is still equal to the current window width do nothing
//         if (savedWindowHeight == windowHeight){
           

//         }


// // if saved window width not equal to the current window width do something
//         if((savedWindowHeight >= windowHeight)&&(window.orientation="landscape")) {
//             if (saveWindowHeight = true){
//                 savedWindowWidth = window.innerWidth;
//                 saveWindowHeight = false;
//             }
//            // do something
//            var form=document.getElementById("chat-history");
           
//            form.style.display='none';
          
//             // savedWindowWidth = windowWidth;
//         }

    };



    if(!StartofConv){
      StartofConv=true;
        
        http.post(serverurl+"watson?m="+true+"&y="+''+"&z="+'Sandip'+"&t="+new Date()).then(function(request,response){
          
         console.log("success",JSON.stringify(request.data));
         scope.message.push(request.data);
         var old='';
         location.hash(scope.message.length-1)
      
               anchorScroll();
               timeout(function(){location.hash(old)},100);
       }),function error(response){
           
           console.log(response);
      
       }
      
      
    }
    //rating
    scope.storeRating=function(rating){
      scope.OpenFeedback=true;
      scope.rating=rating+1;
    
    }
//.unloacking Chats
  scope.UnlockChat=function(){
    scope.isChatOpenFlag=true;

}
//Locking Chat
scope.LockChat=function(){
  scope.isChatOpenFlag=false;

}
scope.Feedback=function(data){
    scope.quickreplyflag=false;
   var data1=data;
    scope.sendMessage(data1);
    //window.location.href='http://www.lawstuff.org.au/';
}

// Init Message//


    scope.sendMessage=function(data){
      scope.Text=data;
      //document.getElementById('input').innerHTML='Type your message…';
    if(scope.Text!=null ||scope.Text!=undefined)
    {
    var message={};

   
  //   var keySize = 256;//Will be edited later
  //   var ivSize = 128;//Will be edited later
  //   var iterations = 100;//Will be edited later
 
  
  // function encrypt (msg, pass) {
  //   var salt = CryptoJS.lib.WordArray.random(128/8);
    
  //   var key = CryptoJS.PBKDF2(pass, salt, {
  //       keySize: keySize/32,
  //       iterations: iterations
  //     });
  
  //   var iv = CryptoJS.lib.WordArray.random(128/8);
    
  //   var encrypted = CryptoJS.AES.encrypt(msg, key, { 
  //     iv: iv, 
  //     padding: CryptoJS.pad.Pkcs7,
  //     mode: CryptoJS.mode.CBC
      
  //   });

  //   var transitmessage = salt.toString()+ iv.toString() + encrypted.toString();
  //   return transitmessage;
  // }
  //rating 

  var date=new Date();
  Timestamp=date.toString();
  var password = "Secret Password";// Will be edited later
  scope.sendData={"Type":"Sent","Author":"Sandip","Text":scope.Text,"Time":Timestamp}
  // var Type = encrypt(scope.sendData.Type, password);
  message.Type=scope.sendData.Type;
  // var Text = encrypt(scope.sendData.Text, password);
  message.Text=scope.sendData.Text;
  // var Author = encrypt(scope.sendData.Author, password);
  message.Author=scope.sendData.Author;
  // var Time = encrypt(scope.sendData.Time, password);
  message.Time=date;
  scope.message.push(message);
  var old='';
  location.hash(scope.message.length-1)

        anchorScroll();
        timeout(function(){location.hash(old)},100);
scope.Text=''
    http.post(serverurl+"watson?m="+false+"&y="+message.Text+"&z="+message.Author+"&t="+message.Time).then(function(request,response){
        scope.quickreplyflag=false;
        scope.UrlButtonFlag=false;
       if(request.data.quickreply!=null || request.data.quickreply!=undefined){
        scope.quickreply=request.data.quickreply;
        scope.quickreplyflag=true;
           }
           else if(request.data.URL!=null || request.data.URL!=undefined){
            scope.UrlButton=request.data.URL;
            scope.Urltitle=request.data.title;
            scope.UrlButtonFlag=true;
               }
      console.log("success",JSON.stringify(request.data));
      scope.message.push(request.data);
      var old='';
      location.hash(scope.message.length-1)
   
            anchorScroll();
            timeout(function(){location.hash(old)},100);
    }),function error(response){
        
        console.log(response);

    }
    }
}

}]);

