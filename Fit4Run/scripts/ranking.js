

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

  /*    ------------------------------------------------------------------
  *     ---------------------- Records DB Section !! -----------------------
  *     ------------------------------------------------------------------
  */    

  var clock = new Date();
  var month = clock.getUTCMonth() + 1; //months from 1-12
  var day = clock.getUTCDate();
  var year = clock.getUTCFullYear();
  var dayMonthYear = day+'d'+month+'m'+year+'y';

  var recordsRef = database.ref('dailyUsersRecords/'+dayMonthYear).orderByChild('runningDistance').limitToLast(10);
  var limit = 10;
  var total = limit;

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
            console.log("xxx "+tableName+" table xxx");
            recTab.rows[rankRange].cells[1].innerHTML = item.val().displayName;
    //    }else{
    //       recTab.rows[rankRange].cells[1].innerHTML = item.val().id;
    //    }
            if(tableName=="daily-table"){    
            recTab.rows[rankRange].cells[2].innerHTML = item.val().runningDistance;
            recTab.rows[rankRange].cells[3].innerHTML = parseInt(item.val().runningTime/item.val().runningDistance);
            }else if(tableName=="users-table"){
                recTab.rows[rankRange].cells[2].innerHTML = item.val().totalDistance;
                recTab.rows[rankRange].cells[3].innerHTML = parseInt(item.val().totalTime/item.val().totalDistance);
            }
            
    rankRange--;
    console.log("REWRITE !!!");
    console.log(rankRange);
       // if(total<1){    total = limit};

        
    });

   // console.log("AAA");
    limit = snapshot.numChildren();
  });

}

var queue = 1;
var runnerToday = 0;
var runnerAllday = 0;

  recordsRef.on('child_added', function(snapshot){
     
        console.log("recordsRef - on - child_ADDED");
        rewriteTable(recordsRef, "daily-table", 10);
        runnerToday++;
  });

  //var am = runner+" : Runners TODAY.";
  //document.getElementById("indexBarText").innerHTML = am;


  recordsRef.on('child_changed', function(snapshot){
      
        console.log("child_CHANGED");
        rewriteTable(recordsRef, "daily-table", 10);
        //console.log(snapshot.val());
        //var rec = snapshot.val();
        //var announceMessage = rec.displayName + ' take ' + rec.lastRunningTime + ' for round : '+ rec.runningDistance +' - Today Avg.time = '+ parseInt(rec.runningTime/rec.runningDistance);
        //document.getElementById("indexBarText"+queue).innerHTML = announceMessage;
        //queue++;
        //if(queue>2){queue=1;}
       // else{queue=1;}
        //document.getElementById('announce-bar').innerHTML = announceMessage;
      });
      recordsRef.on('child_removed', function(snapshot){
            console.log("child_REMOVED");
            rewriteTable(recordsRef, "daily-table", 10);
          });

 

  var usersRef = database.ref().child('users').orderByChild('totalDistance').limitToLast(10);
  
 
  usersRef.on('child_added', function(snapshot){
    console.log("child_ADDED");
    rewriteTable(usersRef, "users-table", 10);
    runnerAllday++;
    var announceMessage = runnerToday+" : Runners TODAY.";
    document.getElementById("indexBarText1").innerHTML = announceMessage;
    announceMessage = runnerAllday+" : Runners All-TIME.";
    document.getElementById("indexBarText2").innerHTML = announceMessage;
  });

  usersRef.on('child_changed', function(snapshot){
      
        console.log("child_CHANGED");
        rewriteTable(usersRef, "users-table", 10);
      });
      usersRef.on('child_removed', function(snapshot){
            console.log("child_REMOVED");
            rewriteTable(usersRef, "users-table", 10);
          });


  

          window.addEventListener('load', function() {
            console.log("Visitor ++");
            var activityLogsRef = firebase.database().ref('activityLogs/visitRanking/'+dayMonthYear);
            activityLogsRef.once('value',function(data){
              if(data.val()==null){
                firebase.database().ref('activityLogs/visitRanking/'+dayMonthYear).set({
                  visitor: 1
                });
              }else{
                firebase.database().ref('activityLogs/visitRanking/'+dayMonthYear).set({
                  visitor: data.val().visitor+1
                });
              }
          
            });
          
          });

          

