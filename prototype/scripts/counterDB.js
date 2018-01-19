

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBcUB-V6cnmKH2mI-xGwo3on4nNyJqU7h4",
    authDomain: "au-senior01.firebaseapp.com",
    databaseURL: "https://au-senior01.firebaseio.com",
    projectId: "au-senior01",
    storageBucket: "au-senior01.appspot.com",
    messagingSenderId: "575402049306"
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





  })

  /*    ----------------------------------------------------------------------
  *     ---------------------- Events TO-DO on LOAD !! -----------------------
  *     ----------------------------------------------------------------------
  */ 
var updateButton = document.getElementById("updateButton");
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
    var month = clock.getUTCMonth() + 1; //months from 1-12
    var day = clock.getUTCDate();
    var year = clock.getUTCFullYear();
    var dayMonthYear = day+'d'+month+'m'+year+'y';
    var newDate = clock.getTime();

    console.log(dayMonthYear);
  var dailyTagDB = firebase.database().ref('daily/tags/'+dayMonthYear+'/'+ tagId);
  dailyTagDB.once('value',function(superSnapshot){
      if(superSnapshot.val()!=null)
      {
          //updateUsersDB(superSnapshot.val().id,newTime);
          updateDailyDB(superSnapshot.val().id,newDate,dayMonthYear);
          
      }else{
           console.log("Tag is NOT activated !!");
        }

  })

}


 /*    ----------------------------------------------------------------------
  *     ---------------------- 1 round update to DAILY-db !! -----------------------
  *     ----------------------------------------------------------------------
  */ 

  
  function updateDailyDB(id,newDate,dayMonthYear){
    console.log(" * updateDailyDB(tagId) * called * ");
/*
    var clock = new Date();
    var month = clock.getUTCMonth() + 1; //months from 1-12
    var day = clock.getUTCDate();
    var year = clock.getUTCFullYear();
    var dayMonthYear = 'd'+day+'m'+month+'y'+year;
*/
    var userDB = firebase.database().ref('daily/records/'+ dayMonthYear +'/'+ id);


    userDB.once('value',function(snapshot){
    console.log(snapshot.val());
    if(snapshot.val()==null){
        // Tag is Inactivated.
        console.log('-- YOU !! have not activated your TAG in yet xx');
    }else{
        //console.log(snapshot.val());
        //console.log(snapshot.val().lastCheck);
        // TO check time interval
        //console.log(newDate);
        var prevClock = snapshot.val().lastCheck;
        if((prevClock+delay)>newDate){  console.log("$$ Delaying .. "); return;   }
    
        var newTime = parseInt((newDate-prevClock)/1000);
       // var time = snapshot.val().time;
        var round = snapshot.val().round;
          if(round<0)
            {  
              newTime = 0; 
              console.log("Start Running - CHECKED");  
              
            }else{
              updateUsersDB(id,newTime);
            }
     //   var prevClock = snapshot.val().lastCheck;
      //    var clock = new Date();
     //   if((prevClock+delay)>newDate){  console.log("$$ Delaying .. "); return;   }

        console.log('Daily is updating...');
        firebase.database().ref('daily/records/'+ dayMonthYear +'/'+ id).set({
        lastCheck: newDate,
        round: snapshot.val().round+1,
        time: snapshot.val().time+newTime,
        username: snapshot.val().username,
        tagId: snapshot.val().tagId
    });

         //updateUsersDB(id,newTime);
        }
        
  //console.log(snapshot.val());
     })  
}



 /*    ----------------------------------------------------------------------
  *     ---------------------- 1 round update to USERS-db !! -----------------------
  *     ----------------------------------------------------------------------
  */ 

function updateUsersDB(id,newTime){
    console.log(" * updateUsersDB(id) * called * ");

    var userDB = firebase.database().ref('users/'+ id);
    userDB.once('value',function(snapshot){
    if(snapshot.val()==null){
        // Write User DB
        console.log('xx NO !! USERs DB xx');
    }else{              var clock = new Date();
        firebase.database().ref('users/' + snapshot.key).set({
        username: snapshot.val().username,
        email: snapshot.val().email,
        profile_picture : snapshot.val().profile_picture,
        round: snapshot.val().round+1,
        time: snapshot.val().time+newTime
    });
        }
        
  //console.log(snapshot.val());
     })        
}




