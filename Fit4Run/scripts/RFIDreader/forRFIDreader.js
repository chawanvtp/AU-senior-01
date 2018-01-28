

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
  *     ---------------------- Events TO-DO on LOAD !! -----------------------
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

    console.log(dayMonthYear);
    console.log(tagId);
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
      if((prevClock+delay)>newDate){  console.log("$$ Delaying .. "); return;   }
      if(userLocal.lastRunningTime<0){
        var userData = {lastCheck:newDate, lastRunningTime:userLocal.lastRunningTime+1, runningDistance:userLocal.runningDistance, runningTime:userLocal.runningTime, displayName:userLocal.displayName, gender:userLocal.gender, faculty:userLocal.faculty};   
        console.log("IF");
      }else{
        console.log("ELSE");
        var userData = {lastCheck:newDate, lastRunningTime:newTime, runningDistance:userLocal.runningDistance+1, runningTime:userLocal.runningTime+newTime, displayName:userLocal.displayName, gender:userLocal.gender, faculty:userLocal.faculty};
      }
       localStorage.setItem(userID, JSON.stringify(userData));
       var announce =  userData.displayName+'   ' +':  Round '+ userData.runningDistance +' - ' + userData.lastRunningTime + ' seconds.';
       for(var i=1;i<=4;i++){
          if(i<4){
            //console.log(announce);
              document.getElementById('localAnnounce-bar'+i).innerText = document.getElementById('localAnnounce-bar'+(i+1)).innerText;
           // console.log(document.getElementById('announce-bar'+(i+1)).innerText);
          }else{
              document.getElementById('localAnnounce-bar'+i).innerText = announce;
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
        if((prevClock+delay)>newDate){  console.log("$$ Delaying .. "); return;   }
        
        var newDistance = 1;
        //var newTime = parseInt((newDate-prevClock)/1000);
        var lastRunningTime = userLocal.lastRunningTime;
          if(lastRunningTime<0)
            {  
              newTime = 0;
              firebase.database().ref('dailyUsersRecords/'+ dayMonthYear +'/'+ tel).set({
                displayName: snapshot.val().displayName,
                lastCheck: newDate,
                runningDistance: 0,
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




