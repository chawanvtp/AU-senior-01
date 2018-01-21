
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
        if(udb.val()!=null){ alert("Telephone No. is already used. !!"); return; }

        var displaynameReg = document.getElementById('displayNameReg').value;
        var idReg = document.getElementById('idReg').value;
        var telReg = document.getElementById('telReg').value;
        var heightReg = document.getElementById('heightReg').value;
        var weightReg = document.getElementById('weightReg').value;
        var bdReg = document.getElementById('bdReg').value;
        console.log(bdReg);

        firebase.database().ref('users/'+ telReg).set({
            displayname: displaynameReg,
            round: 0,
            id: idReg,
            time: 0,
            height: heightReg,
            weight: weightReg,
            birthday: bdReg
        });
        window.location.replace("login.html");
    });
    console.log("DBBB");
    
    
  }




  window.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        signUpButtonClicked();
    }
  });
