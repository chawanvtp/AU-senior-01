//localStorage.clear();

  // Initialize Firebase
var config = {
  apiKey: "AIzaSyAXcnK39RpWb-_MokDsGudxyBnmF2tUXYo",
  authDomain: "fit4run-4d4c5.firebaseapp.com",
  databaseURL: "https://fit4run-4d4c5.firebaseio.com",
  projectId: "fit4run-4d4c5",
  storageBucket: "fit4run-4d4c5.appspot.com",
  messagingSenderId: "204682250613"
};
firebase.initializeApp(config);

  var database = firebase.database();


  /*    ----------------------------------------------------------------------
  *     ---------------------- Events TO-DO on LOAD !! -----------------------
  *     ----------------------------------------------------------------------
  */   
  
window.addEventListener('load', function() {
    // TO trigger the input box
    document.getElementById("tagID-Box").focus();

  });

  /*    ----------------------------------------------------------------------
  *     ---------------------- Events TO-DO on ENTER !! -----------------------
  *     ----------------------------------------------------------------------
  */ 

  
//var updateButton = document.getElementById("updateButton");
var tagID = document.getElementById("tagID-Box");
  //document.getElementById("tagID-Box")
  window.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    tagChecked(document.getElementById("tagID-Box").value);
    document.getElementById("tagID-Box").value = "";
  }
});

// interval delay for 10 second(s)
var delay = 1000*10;


function tagChecked(tagId){
    console.log(" * tagChecked(tagId) * called * ");
    var clock = new Date();
    var month = clock.getUTCMonth()+1; //months from 1-12
    var day = clock.getUTCDate();
    var year = clock.getUTCFullYear();
    var dayMonthYear = day+'d'+month+'m'+year+'y';
    var newDate = clock.getTime();

    console.log(newDate);
    //console.log(tagId);
  var dailyTagDB = firebase.database().ref('dailyTagsMapUsers/'+dayMonthYear+'/'+ tagId);
  dailyTagDB.once('value',function(superSnapshot){
      if(superSnapshot.val()!=null)
      {
          updateDailyDB(superSnapshot.val().userID,tagId,newDate,dayMonthYear);
          console.log("Tag is found..");
      }else{
        console.log("Tag is NOT found..");console.log("Tag is NOT found..");
          // console.log("Tag is NOT activated !!");
        }

  });

}


 /*    ----------------------------------------------------------------------
  *     ---------------------- 1 round update to DAILY-db !! -----------------------
  *     ----------------------------------------------------------------------
  */ 

  
  function updateDailyDB(tel,tagId,newDate,dayMonthYear){
    console.log(" * updateDailyDB(tagId) * called * ");
    
    var userID = localStorage.getItem(tagId);
    //console.log(userData.displayName);
    var userLocal = JSON.parse(localStorage.getItem(userID));
    if(userLocal!=null){
      var prevClock = userLocal.lastCheck;
      var newTime = parseInt((newDate-prevClock)/1000);
      if((prevClock+delay)>newDate&&userLocal.lastRunningTime!=-1){  console.log("$$ Delaying .. "); return;   }
      if(userLocal.lastRunningTime<0){
        var userData = {lastCheck:newDate, lastRunningTime:userLocal.lastRunningTime+1, runningDistance:userLocal.runningDistance, runningTime:userLocal.runningTime, displayName:userLocal.displayName, gender:userLocal.gender, faculty:userLocal.faculty};   
        console.log("IF");
      }else{
        console.log("ELSE");
        var userData = {lastCheck:newDate, lastRunningTime:newTime, runningDistance:userLocal.runningDistance+1, runningTime:userLocal.runningTime+newTime, displayName:userLocal.displayName, gender:userLocal.gender, faculty:userLocal.faculty};
      }
       localStorage.setItem(userID, JSON.stringify(userData));

       // User information declare HERE ------------->
       var userInfo = JSON.parse(localStorage.getItem(userID+'Info'));
       console.log(userInfo);
       console.log(userInfo.gender);
       console.log(userInfo.height);
       console.log(userInfo.weight);
       console.log(userInfo.birthday);
       // ------------------------------------------<

       var name = userData.displayName;
       var announce =  'Round: '+ userData.runningDistance +' - '+ parseInt(userData.lastRunningTime/60) + ' minute(s) ' + (userData.lastRunningTime%60) + ' seconds.';
       if(userData.lastRunningTime<=0){
         announce = 'Start Running at Round: '+ userData.runningDistance;
       }
       for(var i=1;i<=3;i++){
          if(i<3){
            //console.log(announce);
              document.getElementById('localAnnounce-bar'+i).innerText = document.getElementById('localAnnounce-bar'+(i+1)).innerText;
             document.getElementById('localAnnounceDetail-bar'+i).innerText = document.getElementById('localAnnounceDetail-bar'+(i+1)).innerText;
              // console.log(document.getElementById('announce-bar'+(i+1)).innerText);
          }else{
            document.getElementById('localAnnounce-bar'+i).innerText = name;
              document.getElementById('localAnnounceDetail-bar'+i).innerText = announce;
          }
        }
    }
  //var test = JSON.parse(localStorage.getItem(userID));
    console.log(userLocal);

    var dailyDB = firebase.database().ref('dailyUsersRecords/'+ dayMonthYear +'/'+ tel);
    dailyDB.once('value',function(snapshot){
    console.log(snapshot.val());
    if(snapshot.val()==null){
        // Tag is Inactivated.
        console.log('-- YOU !! have not activated your TAG in yet xx');
    }else{

        //var prevClock = userData.lastCheck;
        if((prevClock+delay)>newDate&&userLocal>=0){  console.log("$$ Delaying .. "); return;   }
        
        var newDistance = 1;
        //var newTime = parseInt((newDate-prevClock)/1000);
        var lastRunningTime = userLocal.lastRunningTime;
          if(lastRunningTime<0)
            {  
              newTime = 0;
              firebase.database().ref('dailyUsersRecords/'+ dayMonthYear +'/'+ tel).set({
                displayName: snapshot.val().displayName,
                lastCheck: newDate,
                runningDistance: userData.runningDistance,
                runningTime: userData.runningTime,
                lastRunningTime: newTime,
                gender: snapshot.val().gender,
                faculty: snapshot.val().faculty
            });
              console.log("Start Running - CHECKED");  
              
            }else{
              firebase.database().ref('dailyUsersRecords/'+ dayMonthYear +'/'+ tel).set({
                displayName: snapshot.val().displayName,
                lastCheck: newDate,
                runningDistance: userData.runningDistance,
                runningTime: userData.runningTime,
                lastRunningTime: newTime,
                gender: snapshot.val().gender,
                faculty: snapshot.val().faculty
            });
              updateUsersDB(tel,newTime);
            }

        console.log('Daily is updating...');
        
        

    /*
    firebase.database().ref('dailyUsersRecords/'+ dayMonthYear +'/'+ tel).update({
      lastCheck: newDate,
      runningDistance: snapshot.val().totalDistance+1,
      totalTime: snapshot.val().totalTime+newTime,
      lastRunningTime: newTime
  });
*/

        }
        
     });
}



 /*    ----------------------------------------------------------------------
  *     ---------------------- 1 round update to USERS-db !! -----------------------
  *     ----------------------------------------------------------------------
  */ 

function updateUsersDB(id,newTime){
    console.log(" * updateUsersDB(id,newTime) * called * ");

    var userDB = firebase.database().ref('users/'+ id);
    userDB.once('value',function(snapshot){
    if(snapshot.val()==null){
        // Write User DB
        console.log('xx NO !! USERs DB xx');
    }else{              
        var clock = new Date();

        firebase.database().ref('users/' + snapshot.key).set({
        birthday: snapshot.val().birthday,
        displayName: snapshot.val().displayName,
        height: snapshot.val().height,
        gender: snapshot.val().gender,
        totalDistance: snapshot.val().totalDistance+1,
        totalTime: snapshot.val().totalTime+newTime,
        weight: snapshot.val().weight,
        faculty: snapshot.val().faculty
    });

      /*
          firebase.database().ref('users/' + id).update({
          totalDistance: snapshot.val().totalDistance+1,
          totalTime: snapshot.val().totalTime+newTime
          });
        }
        **/
      
      }
      });
}

var clock = new Date();
var month = clock.getUTCMonth()+1; //months from 1-12
var day = clock.getUTCDate();
var year = clock.getUTCFullYear();
var dayMonthYear = day+'d'+month+'m'+year+'y';
var newDate = clock.getTime();

var dailyTagsList = firebase.database().ref("dailyTagsMapUsers/"+dayMonthYear);
dailyTagsList.on('child_added', function(snapshot){
      //var data = snapshot.val();
     //console.log(data.runningDistance);
   // console.log(snapshot.key);
    setLocalTag(snapshot.key,snapshot.val());
/*
     var userData = {lastCheck:snapshot.val().lastCheck, lastRunningTime:snapshot.val().lastRunningTime, runningDistance:snapshot.val().runningDistance, runningTime:snapshot.val().runningTime, displayName:snapshot.val().displayName, gender:snapshot.val().gender, faculty:snapshot.val().faculty};
     localStorage.setItem(userID, JSON.stringify(userData));
*/

});
dailyTagsList.on('child_changed', function(snapshot){
    setLocalTag(snapshot.key,snapshot.val());

});

dailyTagsList.on('child_removed', function(snapshot){
  localStorage.removeItem(snapshot.key);
  console.log("Local Tag: "+snapshot.key+" DELETED !!");
//setLocalTag(snapshot.key,snapshot.val());

});


var dailyUsersList = firebase.database().ref("dailyUsersRecords/"+dayMonthYear);
dailyUsersList.on('child_added', function(snapshot){
      //var data = snapshot.val();
     //console.log(data.runningDistance);
   // console.log(snapshot.key);
    setLocalUser(snapshot.key,snapshot.val());
/*
     var userData = {lastCheck:snapshot.val().lastCheck, lastRunningTime:snapshot.val().lastRunningTime, runningDistance:snapshot.val().runningDistance, runningTime:snapshot.val().runningTime, displayName:snapshot.val().displayName, gender:snapshot.val().gender, faculty:snapshot.val().faculty};
     localStorage.setItem(userID, JSON.stringify(userData));
*/
  // Users FIREBASE DB called HERE ---->
  var userDB = firebase.database().ref('users/'+snapshot.key);
  //var height = 0;
  //var weight = 0;
  //var birthday = "";
  userDB.once('value',function(udb){
     var userInfo = localStorage.getItem(snapshot.key+'Info');
     if(userInfo==null){
       var userInfo = {weight:udb.val().weight , height:udb.val().height , gender:udb.val().gender , birthday:udb.val().birthday};
     localStorage.setItem(snapshot.key+'Info', JSON.stringify(userInfo));
   }
  });
  var userInfo = localStorage.getItem(snapshot.key+'Info');
  console.log('Local ADD - (userInfo) as '+snapshot.key+'Info')
  console.log(userInfo);
  //height = userInfo.height;
  //weight = userInfo.weight;
  //birthday = userInfo.birthday;
  // --------------------------------------<
});
dailyUsersList.on('child_changed', function(snapshot){
    setLocalUser(snapshot.key,snapshot.val());

});

dailyUsersList.on('child_removed', function(snapshot){
  localStorage.removeItem(snapshot.key);
  console.log("Local Users: "+snapshot.key+" DELETED !!");
//setLocalTag(snapshot.key,snapshot.val());

});





function setLocalTag(key,data){
  console.log(newDate);
  console.log("Local ADD (Tag) -> Tag: "+key+" , userID: "+data.userID);
  localStorage.setItem(key, data.userID);
  //console.log(data.runningDistance);
}



function setLocalUser(key,data){
  console.log(newDate);
  var userData = {lastCheck:data.lastCheck, lastRunningTime:data.lastRunningTime, runningDistance:data.runningDistance, runningTime:data.runningTime, displayName:data.displayName, gender:data.gender, faculty:data.faculty};
  localStorage.setItem(key, JSON.stringify(userData));
  console.log("Local ADD (User) -> ID: "+key);
  //console.log(userData);
}