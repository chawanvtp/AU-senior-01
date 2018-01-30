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
    document.getElementById("tagReturn").focus();

})


  /*    ----------------------------------------------------------------------
  *     ---------------------- Events TO-DO on LOAD !! -----------------------
  *     ----------------------------------------------------------------------
  */ 
  //var updateButton = document.getElementById("updateButton");
  //var tagID = document.getElementById("tagID-Box");
    //document.getElementById("tagID-Box")
   
    window.addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode === 13) {
        
        //console.log(document.getElementById("tagReturn").value);

        
        
        returnButtonClicked(document.getElementById('tagReturn').value);
      }
    });
  

  // interval delay for 10 second(s)
  var delay = 1000*10;
  var clock = new Date();
  var month = clock.getUTCMonth() + 1; //months from 1-12
  var day = clock.getUTCDate();
  var year = clock.getUTCFullYear();
  var dayMonthYear = day+'d'+month+'m'+year+'y';
  var newDate = clock.getTime();
  console.log(dayMonthYear);
  
  
  function returnButtonClicked(tagId){
      //alert(tagId);
     // alert(tel+" - "+tagId);
     // console.log(" * activateButtonClicked !! ");

      
      //var udbUsername = "";
      /*
    var userDB = firebase.database().ref('users/'+tel);
    userDB.once('value',function(udb){
        if(udb.val()==null){    alert("Wrong Telephone Number XXX"); return;}
        
        console.log(udb.val());
        deleteDailyTags(tel,tagId,dayMonthYear);
        //updateDailyRecords(tel,dayMonthYear,newDate,udb.val());
        //udbUsername = udb.val().username;
    });
    */
   // console.log("DBBB");
   deleteDailyTags(tagId,dayMonthYear);
    //document.getElementById("telReturn").value = ""; 
   
    
  }


// Display TagList
var tagList = firebase.database().ref().child('dailyTagsMapUsers').child(dayMonthYear);

tagList.once('value', function(snapshot){
  snapshot.forEach(function(item){
    var htmlMes = "<p>"+item.val().userID+"</p>";
    $("#tagList").append(htmlMes);
  });
});

/*
tagList.on("child_ADDED", function(snapshot){
  snapshot.forEach(function(item){
    var a = item.val();
  console(a);
  });
  //$("#tagList").append()
});
tagList.on("child_CHANGED", function(snapshot){
  
});
tagList.on("child_REMOVED", function(snapshot){
    
});
*/
  /**
   * Update Daily DB
   */ 
function deleteDailyTags(tagId,dayMonthYear){
  localStorage.removeItem(tagId);
  // var dailyTagDB = firebase.database().ref('daily/tags/'+dayMonthYear+'/'+ tagId);
  var dailyTagDB = firebase.database().ref('dailyTagsMapUsers/'+dayMonthYear+'/'+tagId);//.child("dailyTagsMapUsers").child(dayMonthYear).child(tagId);//
  dailyTagDB.once('value',function(snapshot){
      if(snapshot.val()!=null)
      {
        console.log(snapshot.val());
          //updateUsersDB(superSnapshot.val().id,newTime);
         // updateDailyDB(tel,tagId,dayMonthYear);
         dailyTagDB.remove(function(error) {
            alert(error ? "Failed XXX" : "Success !!");
          });
          
      }else{
         // firebase.database().ref().child('daily').child('tags').setValue(dayMonthYear);

         /*
          firebase.database().ref('dailyTagsMapUsers/'+ dayMonthYear +'/'+ tagId).set({
              userID: tel
          });

           console.log("* daily/tags - just created -> /dayMonth/Year!!");
*/          alert("Invalid Tag Number XXX");
        }

  });

  document.getElementById("tagReturn").value = ""; 

}


  /*    ----------------------------------------------------------------------------------------------------------
  *     ---------------------- TO Update Firebase - daily/records/dayMonthYear/(newData) ] -----------------------
  *     ----------------------------------------------------------------------------------------------------------
  */ 
/*
  function updateDailyRecords(tel,dayMonthYear,newDate,udb){
    
   // console.log(udb);
    
        var dailyTagDB = firebase.database().ref('dailyUsersRecords/'+dayMonthYear+'/'+ tel);
        dailyTagDB.once('value',function(snapshot){
            if(snapshot.val()!=null)
            {
                firebase.database().ref('dailyUsersRecords/'+ dayMonthYear +'/'+ tel).set({
                    lastCheck: newDate,
                    lastRunningTime: 0,
                    runningDistance: snapshot.val().runningDistance,
                    runningTime: snapshot.val().runningTime,
                    displayName: udb.displayName,
                    gender: udb.gender,
                    faculty: udb.faculty
                });    
            }else{
               // firebase.database().ref().child('daily').child('tags').setValue(dayMonthYear);
               firebase.database().ref('dailyUsersRecords/'+ dayMonthYear +'/'+ tel).set({
                lastCheck: newDate,
                lastRunningTime: 0,
                runningDistance: -1,
                runningTime: 0,
                displayName: udb.displayName,
                gender: udb.gender,
                faculty: udb.faculty
            });
                 console.log("* dailyUsersRecords - just created -> /dayMonthYear/(new record) !!");
      
              }
      
        });

  }
*/
  /*    ----------------------------------------------------------------------
  *     ---------------------- XXXXXX !! -----------------------
  *     ----------------------------------------------------------------------
  */ 
