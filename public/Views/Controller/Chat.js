var app=angular.module('Chat',['ngStorage']);
app.controller('ChatController',['$scope','$localStorage','$filter','$location','$http','$anchorScroll','$timeout',function(scope,local,filter,location,http,anchorScroll,timeout){
    scope.message=[];
    scope.isChatOpenFlag=false;
    var serverurl=location.absUrl();
    console.log(serverurl);
    scope.sendData={};
<<<<<<< HEAD
    scope.Text;
=======
    scope.Text='';
>>>>>>> Adding to ncylc
    scope.regions=["ACT","NSW","NT","QLD","SA","TAS","VIC","WA"];
    scope.showButtons=false;
    scope.TextSent='';
    scope.OpenFeedback=false;
<<<<<<< HEAD
    scope.rating;
=======
    scope.rating='';
>>>>>>> Adding to ncylc
    scope.ratingText=["Hated it","Disliked it","It's OK","Liked it","Loved it"];
    var StartofConv=false;
    if(!StartofConv){
      StartofConv=true;
        
        http.post(serverurl+"watson?m="+true+"&y="+''+"&z="+'Sandip'+"&t="+new Date()).then(function(request,response){
          
         console.log("success",JSON.stringify(request.data));
         scope.message.push(request.data);
         var old='';
<<<<<<< HEAD
         location.hash(scope.message.length-1)
      
               anchorScroll();
               timeout(function(){location.hash(old)},100);
=======
         location.hash(scope.message.length-1);
      
               anchorScroll();
               timeout(function(){location.hash(old);},100);
>>>>>>> Adding to ncylc
       }),function error(response){
           
           console.log(response);
      
<<<<<<< HEAD
       }
      
      
=======
       };  
>>>>>>> Adding to ncylc
    }
    //rating
    scope.storeRating=function(rating){
      scope.OpenFeedback=true;
      scope.rating=rating+1;
    
<<<<<<< HEAD
    }
=======
    };
>>>>>>> Adding to ncylc
//.unloacking Chats
  scope.UnlockChat=function(){
    scope.isChatOpenFlag=true;

<<<<<<< HEAD
}
=======
};
>>>>>>> Adding to ncylc
//Locking Chat
scope.LockChat=function(){
  scope.isChatOpenFlag=false;

<<<<<<< HEAD
}
=======
};
>>>>>>> Adding to ncylc
// scope.Feedback=function(data){
//     scope.showButtons=false;
//    var data1=data;
//     scope.sendMessage(data1);
//     //window.location.href='http://www.lawstuff.org.au/';
// }

//Init Message//


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
<<<<<<< HEAD
  scope.sendData={"Type":"Sent","Author":"Sandip","Text":scope.Text,"Time":Timestamp}
=======
  scope.sendData={"Type":"Sent","Author":"Sandip","Text":scope.Text,"Time":Timestamp};
>>>>>>> Adding to ncylc
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
<<<<<<< HEAD
  location.hash(scope.message.length-1)

        anchorScroll();
        timeout(function(){location.hash(old)},100);
scope.Text=''
=======
  location.hash(scope.message.length-1);

        anchorScroll();
        timeout(function(){location.hash(old);},100);
scope.Text='';
>>>>>>> Adding to ncylc
    http.post(serverurl+"watson?m="+false+"&y="+message.Text+"&z="+message.Author+"&t="+message.Time).then(function(request,response){
       
      console.log("success",JSON.stringify(request.data));
      scope.message.push(request.data);
      var old='';
<<<<<<< HEAD
      location.hash(scope.message.length-1)
   
            anchorScroll();
            timeout(function(){location.hash(old)},100);
    }),function error(response){
        
        console.log(response);

    }
    }
}
=======
      location.hash(scope.message.length-1);
   
            anchorScroll();
            timeout(function(){location.hash(old);},100);
    }),function error(response){
        console.log(response);  
      };
    }
};
>>>>>>> Adding to ncylc

}]);

