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
    document.getElementById("usernameAct").focus();

})


  /*    ----------------------------------------------------------------------
  *     ---------------------- Events TO-DO on LOAD !! -----------------------
  *     ----------------------------------------------------------------------
  */ 
  //var updateButton = document.getElementById("updateButton");
  //var tagID = document.getElementById("tagID-Box");
    //document.getElementById("tagID-Box")
    /*
    window.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
     // tagChecked(document.getElementById("tagID-Box").value);
     //document.getElementById("telReg").value = ""; 
     //document.getElementById("tagReg").value = ""; 
    }
  });
  */
  // interval delay for 10 second(s)
  var delay = 1000*10;
  
  
  function activateButtonClicked(username,tagId){
      //alert(tagId);
      //alert(tel+" - "+tagId);
      console.log(" * activateButtonClicked !! ");
      var clock = new Date();
      var month = clock.getUTCMonth() + 1; //months from 1-12
      var day = clock.getUTCDate();
      var year = clock.getUTCFullYear();
      var dayMonthYear = day+'d'+month+'m'+year+'y';
      var newDate = clock.getTime();
      console.log(dayMonthYear);
      
      //var udbUsername = "";
    var userDB = firebase.database().ref('users/'+username);
    userDB.once('value',function(udb){
        if(udb.val()==null){    console.log("Incorrect Username XXX"); return;}
        
        console.log(udb.val());
        updateDailyTags(username,tagId,dayMonthYear);
        updateDailyRecords(username,dayMonthYear,newDate,udb.val());
        //udbUsername = udb.val().username;
        alert("Success !!");
    });
   // console.log("DBBB");
    
    document.getElementById("usernameAct").value = ""; 
    document.getElementById("tagAct").value = ""; 
    
  }


  /**
   * Update Daily DB
   */ 
function updateDailyTags(username,tagId,dayMonthYear){
  // var dailyTagDB = firebase.database().ref('daily/tags/'+dayMonthYear+'/'+ tagId);
        localStorage.setItem(tagId, username);
        //var test = localStorage.getItem(tagId);
        //console.log(test);

  var dailyTagDB = firebase.database().ref('dailyTagsMapUsers/'+dayMonthYear);
  dailyTagDB.once('value',function(snapshot){
      if(snapshot.val()!=null)
      {
          //updateUsersDB(superSnapshot.val().id,newTime);
         // updateDailyDB(tel,tagId,dayMonthYear);
         firebase.database().ref('dailyTagsMapUsers/'+ dayMonthYear +'/'+ tagId).set({
          userID: username
      });
          
          
      }else{
         // firebase.database().ref().child('daily').child('tags').setValue(dayMonthYear);
          firebase.database().ref('dailyTagsMapUsers/'+ dayMonthYear +'/'+ tagId).set({
              userID: username
          });

           console.log("* daily/tags - just created -> /dayMonth/Year!!");

        }

  });

}




  window.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
     // tagChecked(document.getElementById("tagID-Box").value);
     //var telActBox = document.getElementById("telAct");
     //var tagActBox = document.getElementById("tagAct");

     //alert(document.getElementById("telAct").value);
      activateButtonClicked(document.getElementById("usernameAct").value,document.getElementById("tagAct").value);
      document.getElementById("usernameAct").value = "";
      document.getElementById("tagAct").value = "";
      document.getElementById("usernameAct").focus();
    }
  });

  /*    ----------------------------------------------------------------------------------------------------------
  *     ---------------------- TO Update Firebase - daily/records/dayMonthYear/(newData) ] -----------------------
  *     ----------------------------------------------------------------------------------------------------------
  */ 

  function updateDailyRecords(username,dayMonthYear,newDate,udb){
    
   // console.log(udb);
        var displayName = udb.displayName;
        var gender = udb.gender;
        var faculty = udb.faculty;
        //var temp = 0;
        //var temp1 = -1;
        
        var userLocal = JSON.parse(localStorage.getItem(username));
        if(userLocal==null){
            var userData = {lastCheck:newDate, lastRunningTime:-1 , runningDistance:0, runningTime:0, displayName:displayName, gender:gender, faculty:faculty};
            localStorage.setItem(username, JSON.stringify(userData));
        }else{
            var userData = {lastCheck:newDate, lastRunningTime:-1, runningDistance:userLocal.runningDistance, runningTime:userLocal.runningTime, displayName:displayName, gender:gender, faculty:faculty};
            localStorage.setItem(username, JSON.stringify(userData));
        }
        //var userLocal = JSON.parse(localStorage.getItem(tel));
        console.log(userLocal);

        var dailyTagDB = firebase.database().ref('dailyUsersRecords/'+dayMonthYear+'/'+ username);
        dailyTagDB.once('value',function(snapshot){
            if(snapshot.val()!=null)
            {
                firebase.database().ref('dailyUsersRecords/'+ dayMonthYear +'/'+ username).set({
                    lastCheck: newDate,
                    lastRunningTime: -1,
                    runningDistance: snapshot.val().runningDistance,
                    runningTime: snapshot.val().runningTime,
                    displayName: udb.displayName,
                    gender: udb.gender,
                    faculty: udb.faculty
                });    
            }else{
                localStorage.removeItem(username);
                var userData = {lastCheck:newDate, lastRunningTime:-1 , runningDistance:0, runningTime:0, displayName:displayName, gender:gender, faculty:faculty};
                localStorage.setItem(username, JSON.stringify(userData));
               // firebase.database().ref().child('daily').child('tags').setValue(dayMonthYear);
               firebase.database().ref('dailyUsersRecords/'+ dayMonthYear +'/'+ username).set({
                lastCheck: newDate,
                lastRunningTime: -1,
                runningDistance: 0,
                runningTime: 0,
                displayName: udb.displayName,
                gender: udb.gender,
                faculty: udb.faculty
            });
                 console.log("* dailyUsersRecords - just created -> /dayMonthYear/(new record) !!");
                 
              
              }
      
        });


        

  }

  /*    ----------------------------------------------------------------------
  *     ---------------------- XXXXXX !! -----------------------
  *     ----------------------------------------------------------------------
  */ 