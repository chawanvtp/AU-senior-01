

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
    
    var dailyDB = firebase.database().ref('dailyUsersRecords/'+ dayMonthYear +'/'+ tel);


    dailyDB.once('value',function(snapshot){
    console.log(snapshot.val());
    if(snapshot.val()==null){
        // Tag is Inactivated.
        console.log('-- YOU !! have not activated your TAG in yet xx');
    }else{

        var prevClock = snapshot.val().lastCheck;
        if((prevClock+delay)>newDate){  console.log("$$ Delaying .. "); return;   }
        
        var newTime = parseInt((newDate-prevClock)/1000);
        var round = snapshot.val().round;
          if(round<0)
            {  
              newTime = 0; 
              console.log("Start Running - CHECKED");  
              
            }else{
              updateUsersDB(tel,newTime);
            }

        console.log('Daily is updating...');
        
        firebase.database().ref('dailyUsersRecords/'+ dayMonthYear +'/'+ tel).set({
        displayName: snapshot.val().displayName,
        lastCheck: newDate,
        runningDistance: snapshot.val().runningDistance+1,
        runningTime: snapshot.val().runningTime+newTime,
        lastRunningTime: newTime
    });

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




