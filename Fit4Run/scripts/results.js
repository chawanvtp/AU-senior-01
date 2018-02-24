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


  String.prototype.Uncapitalize = function() {
    return this.charAt(0).toLowerCase() + this.slice(1);
}


  /*    ----------------------------------------------------------------------
  *     ---------------------- Login Button Clicked !! -----------------------
  *     ----------------------------------------------------------------------
  */

function loginButtonClicked (){
  

    username = $('#usernameLogin').val();
    password = $('#passwordLogin').val();

    username = username.Uncapitalize();
    //alert(username);
    //console.log(username+' - '+password);
    //if(username == "" || password == ""){ alert("Empty username OR password !!"); return; }
    if(username == ""){ alert("Empty username OR password !!");  getResultFailed(); return; }

    if(username.substr(0,5)!="admin"){
        userLogin(username,password);
    }else{
        adminLogin(username,password);
    }
    
    localStorage.setItem("username", username);            //send username to other js file
}

function userLogin(username,password){
    var userDB = firebase.database().ref("users/"+username);
    userDB.once('value', function(snapshot){
        
        if(snapshot.val()==null){ alert("Username is NOT found. XXX"); getResultFailed(); return; }
        var userBirthday = snapshot.val().birthday;
        var userPassword = userBirthday.substr(-2) + userBirthday.substr(5,2) + userBirthday.substr(0,4);
        
        //if(password != userPassword){ alert("Incorrect password XXX"); return;}
        getResultSuccess();
        window.location.replace("user.html");
        alert("Welcome to Fit 4 Run ..");
        
    });

}

function adminLogin(username,password){
    var adminDB = firebase.database().ref("admin/"+username);
    adminDB.once('value', function(snapshot){
        
        if(snapshot.val()==null){ alert("Username is NOT found. XXX"); getResultFailed(); return; }
        //var userBirthday = snapshot.val().birthday;
        //var userPassword = userBirthday.substr(-2) + userBirthday.substr(5,2) + userBirthday.substr(0,4);
        //console.log(userPassword);
        
        if(password != snapshot.val().password){ alert("Hacker ? Incorrect password !!");  getResultFailed(); return;}

        getResultSuccess();
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







  var queue = 1;
  var roundToday = 0;
  //var runnerAllday = 0;

  /*    ------------------------------------------------------------------
  *     ---------------------- Records DB Section !! -----------------------
  *     ------------------------------------------------------------------
  */    

  var clock = new Date();
  var month = clock.getUTCMonth() + 1; //months from 1-12
  var day = clock.getUTCDate();
  var year = clock.getUTCFullYear();
  var dayMonthYear = day+'d'+month+'m'+year+'y';

  var recordsRef = database.ref('dailyUsersRecords');
  var limit = 10;
  var total = limit;
  

  function writeResults(dbRef){
      var i = 1;
    dbRef.once('value', function(snapshot){
    snapshot.forEach(function(item){
        var male = 0;
        var female = 0;
        var round = 0;
        var date = item.key;
        item.forEach(function(data){
            var res = data.val();
            if(res.gender=="male"){
                male += 1;
            }else if(res.gender=="female"){
                female += 1;
            }

        

            round += res.runningDistance;
        });

        var table = document.getElementById("summary-table");
        table.rows[i].cells[0].innerHTML = date;
        table.rows[i].cells[1].innerHTML = male;
        table.rows[i].cells[2].innerHTML = female;
        table.rows[i].cells[3].innerHTML = round;
        i++;

    });
    
});

  }
  /*
  var todayRec = database.ref('dailyUsersRecords/'+dayMonthYear);
  todayRec.once('value',function(snapshot){
    //roundToday = snapshot.numChildren();
    snapshot.forEach(function(item){
      roundToday += item.val().runningDistance;
    });
  });
*/

  function rewriteTable(dbRef, tableName, rankRange){
     // console.log(dbRef);

  dbRef.once('value', function(snapshot){
    
    limit = snapshot.numChildren();
    if(limit>10){
        limit = 10;
    }
   
    snapshot.forEach(function(item){
    
          
      var recTab = document.getElementById(tableName);
    //    if(tableName=='users-table'){
            //console.log("xxx "+tableName+" table xxx");
            recTab.rows[rankRange].cells[1].innerHTML = item.val().displayName;
    //    }else{
    //       recTab.rows[rankRange].cells[1].innerHTML = item.val().id;
    //    }
           /** if(tableName=="daily-table"){    
            recTab.rows[rankRange].cells[2].innerHTML = item.val().runningDistance;
            //recTab.rows[rankRange].cells[3].innerHTML = parseInt((item.val().runningTime/item.val().runningDistance)/60)+':'+parseInt((item.val().runningTime/item.val().runningDistance)%60)+' min';
            recTab.rows[rankRange].cells[3].innerHTML = parseInt(item.val().runningTime/60);//+'.'+parseInt(item.val().runningTime%60);
            }else */if(tableName=="users-table"){
                recTab.rows[rankRange].cells[2].innerHTML = item.val().totalDistance;
                //recTab.rows[rankRange].cells[3].innerHTML = parseInt((item.val().totalTime/item.val().totalDistance)/60)+':'+parseInt((item.val().totalTime/item.val().totalDistance)%60)+' min';
                recTab.rows[rankRange].cells[3].innerHTML = parseInt(item.val().totalTime/60);//+'.'+parseInt(item.val().totalTime%60);
            }
            
    rankRange--;
    //console.log("REWRITE !!!");
    //console.log(rankRange);
       // if(total<1){    total = limit};

        
    });

   // console.log("AAA");
    limit = snapshot.numChildren();
  });

}



  recordsRef.on('child_added', function(snapshot){
     
        //console.log("recordsRef - on - child_ADDED");
        writeResults(recordsRef);
        
  });

  //var am = runner+" : Runners TODAY.";
  //document.getElementById("indexBarText").innerHTML = am;


  recordsRef.on('child_changed', function(snapshot){
      
       // console.log("child_CHANGED");
       writeResults(recordsRef);
      });
      recordsRef.on('child_removed', function(snapshot){
            //console.log("child_REMOVED");
            writeResults(recordsRef);
          });

 

  var totalRound = 0;
  var faculty = ["Science and Technology","Management and Economics","Engineering","Arts","Communication Arts","Architecture and Design","Music","Lecturer","Staff","Other"];
  var facultyNum = [0,0,0,0,0,0,0,0,0,0];
  var maleNum = [0,0,0,0,0,0,0,0,0,0];
  var femaleNum = [0,0,0,0,0,0,0,0,0,0];
  var usersRef = database.ref().child('users').orderByChild('totalDistance').limitToLast(10);
  var usersDB = database.ref().child('users');
  usersDB.once('value', function(snapshot){

    snapshot.forEach(function(item){
      totalRound += item.val().totalDistance;
      countFaculty(item.val());
    });
    
        for(i = 1;i<10;i++){
            var recTab = document.getElementById("runner-table");
            recTab.rows[i].cells[1].innerHTML = maleNum[i-1];
            recTab.rows[i].cells[2].innerHTML = femaleNum[i-1];
            recTab.rows[i].cells[3].innerHTML = maleNum[i-1]+femaleNum[i-1];
        }
      var announceMessage = "Runners - All : "+snapshot.numChildren()+" | ";
      var announceMessage2 = " reached "+totalRound+" rounds "; 
      document.getElementById("indexBarText1").innerHTML = announceMessage + announceMessage2;
      //document.getElementById("indexBarText2").innerHTML = announceMessage2;
  });

  function countFaculty(item){
    if(item.faculty=="Science and Technology"){
        facultyNum[0] += 1;
        countGender(item,0);
    }else if(item.faculty=="Management and Economics"){
        facultyNum[1] += 1;
        countGender(item,1);
    }else if(item.faculty=="Engineering"){
        facultyNum[2] += 1;
        countGender(item,2);
    }else if(item.faculty=="Arts"){
        facultyNum[3] += 1;
        countGender(item,3);
    }else if(item.faculty=="Communication Arts"){
        facultyNum[4] += 1;
        countGender(item,4);
    }else if(item.faculty=="Architecture and Design"){
        facultyNum[5] += 1;
        countGender(item,5);
    }else if(item.faculty=="Music"){
        facultyNum[6] += 1;
        countGender(item,6);
    }else if(item.faculty=="Lecturer"){
        facultyNum[7] += 1;
        countGender(item,7);
    }else if(item.faculty=="Staff"){
        facultyNum[8] += 1;
        countGender(item,8);
    }else if(item.faculty=="Other"){
        facultyNum[9] += 1;
        countGender(item,9);
    }
  }

  function countGender(item,index){
    if(item.gender=="male"){
        maleNum[index] += 1;
    }else{
        femaleNum[index] += 1;
    }

  }
 
  usersRef.on('child_added', function(snapshot){
    //console.log("child_ADDED");
    rewriteTable(usersRef, "users-table", 10);
  });

  usersRef.on('child_changed', function(snapshot){
      
       // console.log("child_CHANGED");
        rewriteTable(usersRef, "users-table", 10);
      });
      usersRef.on('child_removed', function(snapshot){
           // console.log("child_REMOVED");
            rewriteTable(usersRef, "users-table", 10);
          });


  
          window.addEventListener('load', function() {

            // Kepp log IF - ranking clicked 
            var tempHref = ""+window.location;
            tempHref = tempHref.substr(tempHref.length-9);
            if(tempHref=="#indexBar"){
              rankingClicked();
            }
            
            updateVisitIndex();
          });


          function updateVisitIndex(){
            
            var activityLogsRef = firebase.database().ref('activityLogs/visitedIndex/'+dayMonthYear);
            activityLogsRef.once('value',function(data){
              if(data.val()==null){
                firebase.database().ref('activityLogs/visitedIndex/'+dayMonthYear).set({
                  visitor: 1
                });
              }else{
                firebase.database().ref('activityLogs/visitedIndex/'+dayMonthYear).set({
                  visitor: data.val().visitor+1
                });
              }
              console.log("Index - Visitor(s) ++");
            });
            return;
          }

          function rankingClicked(){
            
            var activityLogsRef = firebase.database().ref('activityLogs/rankingClick/'+dayMonthYear);
            activityLogsRef.once('value',function(data){
              if(data.val()==null){
                firebase.database().ref('activityLogs/rankingClick/'+dayMonthYear).set({
                  visitor: 1
                });
              }else{
                firebase.database().ref('activityLogs/rankingClick/'+dayMonthYear).set({
                  visitor: data.val().visitor+1
                });
              }
              console.log("Ranking - Click(s) ++");
            });
            return;
          }

          

          function getResultFailed(){
            
  var activityLogsRef = firebase.database().ref('activityLogs/UserGETresultFailed/'+dayMonthYear);
  activityLogsRef.once('value',function(data){
    if(data.val()==null){
      firebase.database().ref('activityLogs/UserGETresultFailed/'+dayMonthYear).set({
        visitor: 1
      });
    }else{
      firebase.database().ref('activityLogs/UserGETresultFailed/'+dayMonthYear).set({
        visitor: data.val().visitor+1
      });
    }
    console.log("XXX - GET Results - Failure(s) ++");
  });

          }

          function getResultSuccess(){
            var activityLogsRef = firebase.database().ref('activityLogs/UserGETresultSuccess/'+dayMonthYear);
            activityLogsRef.once('value',function(data){
              if(data.val()==null){
                firebase.database().ref('activityLogs/UserGETresultSuccess/'+dayMonthYear).set({
                  visitor: 1
                });
              }else{
                firebase.database().ref('activityLogs/UserGETresultSuccess/'+dayMonthYear).set({
                  visitor: data.val().visitor+1
                });
              }
              console.log("OOO - GET Results - Success(s) ++");
          });
        }
