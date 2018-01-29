var app=angular.module('Chat',['ngStorage']);
app.controller('ChatController',['$scope','$localStorage','$filter','$location','$http','$anchorScroll','$timeout',function(scope,local,filter,location,http,anchorScroll,timeout){
    scope.message=[];
    scope.isChatOpenFlag=false;
    var serverurl=location.absUrl();
    console.log(serverurl);
    scope.sendData={};
    scope.Text;
    scope.nodata=false;//none has provided feedback in this month
    // scope.Textarea;
    scope.regions=["ACT","NSW","NT","QLD","SA","TAS","VIC","WA"];
    scope.showButtons=false;
    scope.TextSent='';
    scope.OpenFeedback=false;
    scope.FeedbackData={};
    scope.rating;
    scope.ratingText=["Hated it","Disliked it","It's OK","Liked it","Loved it"];
    var StartofConv=false;
    scope.quickreplyflag=false;
    scope.UrlButtonFlag=false;
    scope.form={};
    scope.form.showall=true;
    //list view
    scope.listview=false;
    scope.listviewArray=[];
    scope.quickreply=[];//quick reply array
    scope.UrlButton=[];//Url navigator
    scope.Textarea='';
    scope.prevrate=false;
    scope.showoptions=false;
    var Context={};//Context for Node app
    scope.Dontsave=function(){
        if(scope.rating!=undefined)
            {
                swal({
                    title: "Are you sure?",
                    text: "Your data will not be saved .\n If you don't want to rate us click on cancel button  ",
                    icon: "warning",
                    buttons: ['Save','Cancel'],
                    dangerMode: true,
                  })
                  .then((willDelete) => {
                    if (willDelete) {
                      swal("Your data was not saved\n We hope you will rate us later .", {
                        icon: "success",
                      });
                    } else {
                        
                        swal("Feedback Submitted", "Thanks for your valuable feedback", "success");
                        // console.log(data1+data2);
                        
                        scope.FeedbackData.rate=scope.ratingText[scope.rating-1];
                       
                        scope.FeedbackData.Text=scope.Textarea;
                        http.post(serverurl+"Feedback",scope.FeedbackData).then(function(request,response){
                            
                        console.log(JSON.stringify(response));
                        
                        }),function error(response){
                            
                            console.log(response);
                            
                        
                        }
                        scope.rating=undefined;
                        // scope.showoption();
                    }
                  }); 
            }

            scope.showoption()
    }
    scope.showoption=function(){
        
            
        //set the initial window width
        
        scope.showoptions=(scope.showoptions==false)?true:false;
    }
    var saveWindowHeight= true;
    var savedWindowHeight,savedWindowWidth,windowHeight;
    scope.Fetchreport=function(){
        http.get(serverurl+'Viewreport').then(function(request,response){
            
            let maindata=request.data;
            if(maindata.length==0){
                scope.nodata=true;
                
            }
            else{
                scope.nodata=false;
            let datalables=[];
            let lable=["Hated it","Disliked it","It's OK",'Liked it','Loved it',''];
            for(let j=0;j<lable.length;j++){
                let counter=0;
            for(let d=0;d<maindata.length;d++){
                if(maindata[d]==lable[j]){
                    counter++;
                }
            }
            datalables.push(counter);
        }
            console.log(request.data);
            console.log(datalables);

            loadchart(datalables,lable);
    }
        }).catch(function(error){
            console.log(error)
        });
    }
    // check whether user had alrady provided feedbackor not
    scope.checkFeedback=function(){
        if(scope.FeedbackData.rate !=null || scope.FeedbackData.rate !=undefined)
            {
                swal({
                    title: "Are you sure?",
                    text: "You have rated \'"+scope.FeedbackData.rate+"'\ our chat. \n"+"Do you want to rate us again?",
                    icon: "success",
                    buttons: ["No", "Rate Again"],
                    dangerMode: true,
                  })
                  .then((willDelete) => {
                    if (willDelete) {
                        $("#Feedback").modal();
                    } else {
                      swal("Thanks for your feedback!");
                    }
                  });
            }
            else{
                swal("To rate us select the stars and provide any comments and then click on save to cloud button");
                $("#Feedback").modal();
            }

    }
scope.Feedbackupload=function(data1,data2){
    swal("Feedback Submitted", "Thanks for your valuable feedback", "success");
console.log(data1+data2);

scope.FeedbackData.rate=data1;
scope.FeedbackData.Text=data2;
http.post(serverurl+"Feedback",scope.FeedbackData).then(function(request,response){
    
console.log(JSON.stringify(response));

}),function error(response){
    
    console.log(response);
    

}
scope.showoption();
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
         scope.receiveddata=request.data;
         scope.receiveddata.Type='Received';
         Context=request.data.Context;//geeting context data from backend
         console.log(JSON.stringify(Context));
         scope.message.push(request.data);
        //  scope.message.push(request.data);
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
    //   alert(scope.Text.indexOf("#"))
      //document.getElementById('input').innerHTML='Type your message…';
    if((scope.Text!=null ||scope.Text!=undefined) &&(scope.Text.indexOf("#")<0))
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
    http.post(serverurl+"watson?m="+false+"&y="+message.Text+"&z="+message.Author+"&t="+message.Time+"&c="+JSON.stringify(Context)).then(function(request,response){
        Context=request.data.Context;//geeting context data from backend
        scope.quickreplyflag=false;
        scope.UrlButtonFlag=false;
        scope.listview=false;//resiting listview
       if(request.data.quickreply!=null || request.data.quickreply!=undefined){
        scope.quickreply=request.data.quickreply;
        scope.quickreplyflag=true;
           }
           else if(request.data.URL!=null || request.data.URL!=undefined){
            scope.UrlButton=request.data.URL;
            scope.Urltitle=request.data.title;
            scope.UrlButtonFlag=true;
               }
               else if(request.data.List!=null || request.data.List!=undefined){
                scope.listview=true;
                scope.listviewArray=request.data.List;
                   }
      console.log("success",JSON.stringify(request.data));
      scope.receiveddata=request.data;
      scope.receiveddata.Type='Received';
      scope.message.push(request.data);
      var old='';
      location.hash(scope.message.length-1)
   
            anchorScroll();
            timeout(function(){location.hash(old)},100);
    }),function error(response){
        
        console.log(response);

    }
    }
    else{
        swal("Data could not be send \n Please try again");
        scope.Text="";
    }
}

}]);

var loadchart=function(datalables,lable){
    new Chart(document.getElementById("bar-chart"), {
        type: 'bar',
        data: {
          labels: lable,
          datasets: [
            {
              label: "Rates this month",
              backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
              data: datalables
            }
          ]
        },
        options: {
          legend: { display: false },
          title: {
            display: true,
            text: "User's Response in this month"
          }
        }
    });
}
