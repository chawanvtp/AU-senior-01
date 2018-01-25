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
  *     ---------------------- Login Button Clicked !! -----------------------
  *     ----------------------------------------------------------------------
  */

function loginButtonClicked (){
    var username = document.getElementById("usernameLogin").value;
    var password = document.getElementById("passwordLogin").value;
    console.log('Username: '+username+'\nPassword: '+password);

    if(username == "" || password == ""){ alert("Empty username OR password !!"); return; }
    

    if(username.substr(0,5)!="admin"){
        userLogin(username,password);
    }else{
        adminLogin(username,password);
    }

    //alert(username+" : "+password);
}

/*    ----------------------------------------------------------------------
  *     ---------------------- Login Button Clicked !! -----------------------
  *     ----------------------------------------------------------------------
  */


function userLogin(username,password){
    var userDB = firebase.database().ref("users/"+username);
    userDB.once('value', function(snapshot){
        
        if(snapshot.val()==null){ alert("Tel. Number is NOT found. XXX"); return; }
        var userBirthday = snapshot.val().birthday;
        var userPassword = userBirthday.substr(-2) + userBirthday.substr(5,2) + userBirthday.substr(0,4);
        
        if(password != userPassword){ alert("Hacker ? Incorrect password !!"); return;}

        alert("Welcome to Fit 4 Run ..");
        
    });

}

function adminLogin(username,password){
    var adminDB = firebase.database().ref("admin/"+username);
    adminDB.once('value', function(snapshot){
        
        if(snapshot.val()==null){ alert("Tel. Number is NOT found. XXX"); return; }
        //var userBirthday = snapshot.val().birthday;
        //var userPassword = userBirthday.substr(-2) + userBirthday.substr(5,2) + userBirthday.substr(0,4);
        //console.log(userPassword);
        
        if(password != snapshot.val().password){ alert("Hacker ? Incorrect password !!"); return;}

        window.location.href="admin.html";
        
    });

}