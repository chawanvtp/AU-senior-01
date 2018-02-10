// Initialize Firebase
var config = {
<<<<<<< HEAD
    apiKey: "AIzaSyBcUB-V6cnmKH2mI-xGwo3on4nNyJqU7h4",
    authDomain: "au-senior01.firebaseapp.com",
    databaseURL: "https://au-senior01.firebaseio.com",
    projectId: "au-senior01",
    storageBucket: "au-senior01.appspot.com",
    messagingSenderId: "575402049306"
  };
  firebase.initializeApp(config);

  var database = firebase.database();


=======
    apiKey: "AIzaSyAXcnK39RpWb-_MokDsGudxyBnmF2tUXYo",
    authDomain: "fit4run-4d4c5.firebaseapp.com",
    databaseURL: "https://fit4run-4d4c5.firebaseio.com",
    projectId: "fit4run-4d4c5",
    storageBucket: "fit4run-4d4c5.appspot.com",
    messagingSenderId: "204682250613"
  };
  firebase.initializeApp(config);


  var database = firebase.database();


  String.prototype.Uncapitalize = function() {
    return this.charAt(0).toLowerCase() + this.slice(1);
}

>>>>>>> demo
  /*    ----------------------------------------------------------------------
  *     ---------------------- Login Button Clicked !! -----------------------
  *     ----------------------------------------------------------------------
  */

function loginButtonClicked (){
<<<<<<< HEAD
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;
    console.log(username+' - '+password);
    if(username == "" || password == ""){ alert("Empty username OR password !!"); return; }
    
=======
    username = $('#usernameLogin').val();
    password = $('#passwordLogin').val();

    username = username.Uncapitalize();
    //alert(username);
    //console.log(username+' - '+password);
    //if(username == "" || password == ""){ alert("Empty username OR password !!"); return; }
    if(username == ""){ alert("Empty username OR password !!"); return; }

    if(username.substr(0,5)!="admin"){
        userLogin(username,password);
    }else{
        adminLogin(username,password);
    }
    
    localStorage.setItem("username", username);            //send username to other js file
}

function userLogin(username,password){
>>>>>>> demo
    var userDB = firebase.database().ref("users/"+username);
    userDB.once('value', function(snapshot){
        
        if(snapshot.val()==null){ alert("Username is NOT found. XXX"); return; }
<<<<<<< HEAD
        
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
  
=======
        var userBirthday = snapshot.val().birthday;
        var userPassword = userBirthday.substr(-2) + userBirthday.substr(5,2) + userBirthday.substr(0,4);
        
        //if(password != userPassword){ alert("Incorrect password XXX"); return;}
        window.location.replace("user.html");
        alert("Welcome to Fit 4 Run ..");
        
    });

}

function adminLogin(username,password){
    var adminDB = firebase.database().ref("admin/"+username);
    adminDB.once('value', function(snapshot){
        
        if(snapshot.val()==null){ alert("Username is NOT found. XXX"); return; }
        //var userBirthday = snapshot.val().birthday;
        //var userPassword = userBirthday.substr(-2) + userBirthday.substr(5,2) + userBirthday.substr(0,4);
        //console.log(userPassword);
        
        if(password != snapshot.val().password){ alert("Hacker ? Incorrect password !!"); return;}

        window.location.replace("admin.html");
        
    });

}



window.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        loginButtonClicked();
        //alert("Please Click !!, DON'T use Enter !!.");
        
    }
  });

  window.addEventListener('load', function() {
    console.log("Visitor ++");
    var clock = new Date();
    var month = clock.getUTCMonth()+1; //months from 1-12
    var day = clock.getUTCDate();
    var year = clock.getUTCFullYear();
    var dayMonthYear = day+'d'+month+'m'+year+'y';

    var activityLogsRef = firebase.database().ref('activityLogs/visitLogin/'+dayMonthYear);
    activityLogsRef.once('value',function(data){
      if(data.val()==null){
        firebase.database().ref('activityLogs/visitLogin/'+dayMonthYear).set({
          visitor: 1
        });
      }else{
        firebase.database().ref('activityLogs/visitLogin/'+dayMonthYear).set({
          visitor: data.val().visitor+1
        });
      }
      
    });
  
  });
>>>>>>> demo
