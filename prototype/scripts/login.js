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
  *     ---------------------- Login Button Clicked !! -----------------------
  *     ----------------------------------------------------------------------
  */

function loginButtonClicked (){
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;
    console.log(username+' - '+password);
    if(username == "" || password == ""){ alert("Empty username OR password !!"); return; }
    
    var userDB = firebase.database().ref("users/"+username);
    userDB.once('value', function(snapshot){
        
        if(snapshot.val()==null){ alert("Username is NOT found. XXX"); return; }
        
        if(password == snapshot.val().id){
            alert("Great !!");
        }
    });


    alert(username+" : "+password);
}

/*    ----------------------------------------------------------------------
  *     ---------------------- Login Button Clicked !! -----------------------
  *     ----------------------------------------------------------------------
  */
  