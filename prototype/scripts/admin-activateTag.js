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
    document.getElementById("telAct").focus();

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
     // tagChecked(document.getElementById("tagID-Box").value);
     //document.getElementById("telReg").value = ""; 
     //document.getElementById("tagReg").value = ""; 
    }
  });
  
  // interval delay for 10 second(s)
  var delay = 1000*10;
  
  
  function activateButtonClicked(tel,tagId){
      //alert(tagId);
      console.log(" * activateButtonClicked !! ");
      var clock = new Date();
      var month = clock.getUTCMonth() + 1; //months from 1-12
      var day = clock.getUTCDate();
      var year = clock.getUTCFullYear();
      var dayMonthYear = day+'d'+month+'m'+year+'y';
      var newDate = clock.getTime();
      console.log(dayMonthYear);
      
      //var udbUsername = "";
    var userDB = firebase.database().ref('users/'+tel);
    userDB.once('value',function(udb){
        if(udb.val()==null){    console.log("Wrong Telephone Number XXX"); return;}
        console.log(udb.val().displayname);
        //console.log(udb.val().email);
        console.log(udb.val());
        updateDailyTags(tel,tagId,dayMonthYear);
        updateDailyRecords(tel,udb.val().displayname,dayMonthYear,newDate);
        //udbUsername = udb.val().username;
    });
    console.log("DBBB");
    
    document.getElementById("telAct").value = ""; 
    document.getElementById("tagAct").value = ""; 
    
  }


  /**
   * Update Daily DB
   */ 
function updateDailyTags(tel,tagId,dayMonthYear){
  // var dailyTagDB = firebase.database().ref('daily/tags/'+dayMonthYear+'/'+ tagId);
  var dailyTagDB = firebase.database().ref('daily/tags/'+dayMonthYear);
  dailyTagDB.once('value',function(snapshot){
      if(snapshot.val()!=null)
      {
          //updateUsersDB(superSnapshot.val().id,newTime);
         // updateDailyDB(tel,tagId,dayMonthYear);
         firebase.database().ref('daily/tags/'+ dayMonthYear +'/'+ tagId).set({
          tel: tel
      });
          
          
      }else{
         // firebase.database().ref().child('daily').child('tags').setValue(dayMonthYear);
          firebase.database().ref('daily/tags/'+ dayMonthYear +'/'+ tagId).set({
              tel: tel
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
      activateButtonClicked(document.getElementById("telAct").value,document.getElementById("tagAct").value);
      document.getElementById("telAct").value = "";
      document.getElementById("tagAct").value = "";
      document.getElementById("telAct").focus();
    }
  });

  /*    ----------------------------------------------------------------------------------------------------------
  *     ---------------------- TO Update Firebase - daily/records/dayMonthYear/(newData) ] -----------------------
  *     ----------------------------------------------------------------------------------------------------------
  */ 

  function updateDailyRecords(tel,udbDisplayName,dayMonthYear,newDate){
    

        var dailyTagDB = firebase.database().ref('daily/records/'+dayMonthYear+'/'+tel);
        dailyTagDB.once('value',function(snapshot){
            if(snapshot.val()!=null)
            {
                firebase.database().ref('daily/records/'+ dayMonthYear +'/'+ tel).set({
                    lastCheck: newDate,
                    round: snapshot.val().round,
                    time: snapshot.val().time,
                    displayname: udbDisplayName
                });    
            }else{
               // firebase.database().ref().child('daily').child('tags').setValue(dayMonthYear);
               firebase.database().ref('daily/records/'+ dayMonthYear +'/'+ tel).set({
                lastCheck: newDate,
                round: -1,
                time: 0,
                displayname: udbDisplayName
            });
                 console.log("* daily/records - just created -> /dayMonthYear/userRecords !!");
      
              }
      
        });

  }

  /*    ----------------------------------------------------------------------
  *     ---------------------- XXXXXX !! -----------------------
  *     ----------------------------------------------------------------------
  */ 

  function updateTagActivate(tel,tagId,dayMonthYear){

    
    console.log(" * updateDailyDB(tagId) * called * ");
/*
    var clock = new Date();
    var month = clock.getUTCMonth() + 1; //months from 1-12
    var day = clock.getUTCDate();
    var year = clock.getUTCFullYear();
    var dayMonthYear = 'd'+day+'m'+month+'y'+year;
*/
    var dailyDB = firebase.database().ref('daily/tags/'+ dayMonthYear);


    dailyDB.once('value',function(snapshot){
    console.log(snapshot.val());
    if(snapshot.val()==null){
        // Tag is Inactivated.
        //firebase.ref().child("daily").child("tags").push().setValue(dayMonthYear);
        console.log("updated");
        console.log('-- YOU !! have not activated your TAG in yet xx');
    }else{
        console.log('Daily is updating...');
        firebase.database().ref('daily/daily/'+ dayMonthYear +'/'+ tagId).set({
        tel: tel
    });
        
        console.log("updated");
         //updateUsersDB(id,newTime);
        }
        
  //console.log(snapshot.val());
     })  

  }