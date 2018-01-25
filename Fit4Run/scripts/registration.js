
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

  //var database = firebase.database();


  /*    ----------------------------------------------------------------------
  *     ---------------------- Events TO-DO on LOAD !! -----------------------
  *     ----------------------------------------------------------------------
  */   
window.addEventListener('load', function() {
    // TO trigger the input box
   // document.getElementById("telAct").focus();

})
  
  
  function signUpButtonClicked(){
      //alert(tagId);
      /*
      console.log(" * activateButtonClicked !! ");
      var clock = new Date();
      var month = clock.getUTCMonth() + 1; //months from 1-12
      var day = clock.getUTCDate();
      var year = clock.getUTCFullYear();
      var dayMonthYear = day+'d'+month+'m'+year+'y';
      var newDate = clock.getTime();
      console.log(dayMonthYear);
      */
      //var udbUsername = "";
    var userDB = firebase.database().ref('users/'+document.getElementById('telReg').value);
    userDB.once('value',function(udb){
        /*
        if(udb.val()==null){    console.log("Wrong Telephone Number XXX"); return;}
        console.log(udb.val().username);
        //console.log(udb.val().email);
        updateDailyDB(tel,tagId,udb.val().username,dayMonthYear,newDate);
        //udbUsername = udb.val().username;
        */

        if(udb.val()!=null){ alert("Telephone No. is already used / Invalid. !!"); return; }


        var genderReg = "male";
        if(document.getElementById('femaleReg').checked){ genderReg = "female" }

        var displaynameReg = document.getElementById('displayNameReg').value;
        var facultyReg = document.getElementById('facultyReg').value;   
        var telReg = document.getElementById('telReg').value;
        var heightReg = document.getElementById('heightReg').value;
        var weightReg = document.getElementById('weightReg').value;
        var bdReg = document.getElementById('bdReg').value;
        
        

        firebase.database().ref('users/'+ telReg).set({
            displayName: displaynameReg,
            totalDistance: 0,
            gender: genderReg,
            faculty: facultyReg,
            totalTime: 0,
            height: heightReg,
            weight: weightReg,
            birthday: bdReg
        });
        window.location.replace("login.html");
    });
    
    
    
  }




  window.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        signUpButtonClicked();
    }
  });
