

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

 // var database = firebase.database();

  /*    ------------------------------------------------------------------
  *     ---------------------- Records DB Section !! -----------------------
  *     ------------------------------------------------------------------
  */    

  var clock = new Date();
  var month = clock.getUTCMonth() + 1;
  var day = clock.getUTCDate();
  var year = clock.getUTCFullYear();
  var dayMonthYear = day+'d'+month+'m'+year+'y';

  var limit = 10;
  var total = limit;

function rewriteTable(dbRef, tableName, rankRange){
     // console.log(dbRef);

  dbRef.once('value', function(snapshot){
    
    //var i = 1;
    limit = snapshot.numChildren();
    if(limit>10){
        limit = 10;
    }
    
    snapshot.forEach(function(item){
          
      var recTab = document.getElementById(tableName);
    //    if(tableName=='users-table'){
            console.log("xxx USERs table xxx");
            recTab.rows[rankRange].cells[1].innerHTML = item.val().displayname;
    //    }else{
    //       recTab.rows[rankRange].cells[1].innerHTML = item.val().id;
    //    }
        
            recTab.rows[rankRange].cells[2].innerHTML = item.val().round;
            recTab.rows[rankRange].cells[3].innerHTML = parseInt(item.val().time/item.val().round);
    rankRange--;
    console.log("REWRITE !!!");
    console.log(rankRange);
       // if(total<1){    total = limit};

        
    });
    limit = snapshot.numChildren();
  });


var recordsRef = firebase.database().ref('daily/records/'+dayMonthYear).orderByChild('round').limitToLast(10);

recordsRef.on('child_added', function(snapshot){
        console.log("recordsRef - on - child_ADDED");
        rewriteTable(recordsRef, "daily-table", 10);  
    }); 
    
recordsRef.on('child_changed', function(snapshot){
        console.log("child_CHANGED");
        rewriteTable(recordsRef, "daily-table", 10);
    });
recordsRef.on('child_removed', function(snapshot){
        console.log("child_REMOVED");
        rewriteTable(recordsRef, "daily-table", 10);
    });


  /*    ------------------------------------------------------------------
  *     ---------------------- Users DB Section !! -----------------------
  *     ------------------------------------------------------------------
  */    

    var usersRef = firebase.database().ref().child('users').orderByChild('round').limitToLast(10);
 
usersRef.on('child_added', function(snapshot){
    console.log("child_ADDED");
    rewriteTable(usersRef, "users-table", 10);
    });
    
usersRef.on('child_changed', function(snapshot){
    console.log("child_CHANGED");
    rewriteTable(usersRef, "users-table", 10);
    });
recordsRef.on('child_removed', function(snapshot){
    console.log("child_REMOVED");
    rewriteTable(usersRef, "users-table", 10);
    });



}

  