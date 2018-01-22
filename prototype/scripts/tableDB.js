

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

  /*    ------------------------------------------------------------------
  *     ---------------------- Records DB Section !! -----------------------
  *     ------------------------------------------------------------------
  */    

  var clock = new Date();
  var month = clock.getUTCMonth() + 1; //months from 1-12
  var day = clock.getUTCDate();
  var year = clock.getUTCFullYear();
  var dayMonthYear = day+'d'+month+'m'+year+'y';

  var recordsRef = database.ref('daily/records/'+dayMonthYear).orderByChild('round').limitToLast(10);
  var limit = 10;
  var total = limit;

  function rewriteTable(dbRef, tableName, rankRange){
      console.log(dbRef);
 // console.log(recordsRef.once(numChildren()));
  dbRef.once('value', function(snapshot){
    
    //var i = 1;
    limit = snapshot.numChildren();
    if(limit>10){
        limit = 10;
    }
    /*
    console.log('key: ' +(snapshot.val()));
    console.log('node: '+(total));
    console.log(snapshot.numChildren());
    */
    snapshot.forEach(function(item){
     /* var content = '';
          content += item.val().id;
          content += item.val().id;
          content += item.val().round;
          content += '';
          */
          
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

        
    })
/*
    if(tableName=='daily-table')
    {
        var recTab = document.getElementById('daily-table');
        for(i=10;i>=1;i--){
            console.log(recTab.rows[i].cells[1].innerHTML);
            database.ref('users/'+recTab.rows[i].cells[1].innerHTML).once('value',function(s){
                //console.log(s.val());
                //console.log(rankRange)
                if(s.val()!=null){
                    recTab.rows[i].cells[1].innerHTML = s.val().username;
                }else{
                    recTab.rows[i].cells[1].innerHTML = "Anonymous";
                }
                
            })
        }    
        
    }*/

    limit = snapshot.numChildren();
  })

}

  recordsRef.on('child_added', function(snapshot){
      /*
    console.log("child_ADDED");
    console.log(snapshot.numChildren());
    console.log(snapshot.val());
    
    var recTab = document.getElementById('daily-table');
        recTab.rows[total].cells[1].innerHTML = snapshot.val().id;
        recTab.rows[total].cells[2].innerHTML = snapshot.val().round;
        total--;
        console.log(total);
        if(total<1){total=limit;}
        */
        console.log("recordsRef - on - child_ADDED");
        rewriteTable(recordsRef, "daily-table", 10);
        
  })

  

  recordsRef.on('child_changed', function(snapshot){
      
        console.log("child_CHANGED");
        rewriteTable(recordsRef, "daily-table", 10);
    /*
        console.log(snapshot.numChildren());
        console.log(snapshot.val());
        var recTab = document.getElementById('daily-table');
    
            recTab.rows[total].cells[1].innerHTML = snapshot.val().id;
            recTab.rows[total].cells[2].innerHTML = snapshot.val().round;
            total--;
        
            console.log(total);
        */
      })
      recordsRef.on('child_removed', function(snapshot){
            console.log("child_REMOVED");
            rewriteTable(recordsRef, "daily-table", 10);
          })

 // console.log(total);

  /*    ------------------------------------------------------------------
  *     ---------------------- Users DB Section !! -----------------------
  *     ------------------------------------------------------------------
  */    

  var usersRef = database.ref().child('users').orderByChild('round').limitToLast(10);
  // temporary used to limit table indexing
  //--------------------------
  /*
  usersRef.once('value', function(snapshot){
    console.log(snapshot.numChildren());
    var total = snapshot.numChildren();
    snapshot.forEach(function(item){
      var recTab = document.getElementById('users-table');
        recTab.rows[total].cells[1].innerHTML = item.val().username;
        recTab.rows[total].cells[2].innerHTML = item.val().round;
        recTab.rows[total].cells[3].innerHTML = item.val().time/item.val().round;
        total--;
    })
  })
  *///------------------------------
 
  usersRef.on('child_added', function(snapshot){
    console.log("child_ADDED");
    rewriteTable(usersRef, "users-table", 10);
  })

  usersRef.on('child_changed', function(snapshot){
      
        console.log("child_CHANGED");
        rewriteTable(usersRef, "users-table", 10);
    /*
        console.log(snapshot.numChildren());
        console.log(snapshot.val());
        var recTab = document.getElementById('daily-table');
    
            recTab.rows[total].cells[1].innerHTML = snapshot.val().id;
            recTab.rows[total].cells[2].innerHTML = snapshot.val().round;
            total--;
        
            console.log(total);
        */
      })
      recordsRef.on('child_removed', function(snapshot){
            console.log("child_REMOVED");
            rewriteTable(usersRef, "users-table", 10);
          })


  



/*

  var fetchTable = function(tableRef,tableName) {
      console.log("tableRef: "+ tableRef.key +" - tableName: "+tableName);
      console.log(" - Table FECTCHED -!/-");
      tableRef.on('child_added', function(data) {
      //var author = data.val().id || 'Anonymous';
        var total = data.numChildren();
        data.forEach(function(item){
            var recTab = document.getElementById(tableName);
            recTab.rows[total].cells[1].innerHTML = item.val().username;
            recTab.rows[total].cells[2].innerHTML = item.val().round;
            recTab.rows[total].cells[3].innerHTML = item.val().time/item.val().round;
        })
    });
    tableRef.on('child_changed', function(data) {	
		var total = data.numChildren();
        data.forEach(function(item){
            var recTab = document.getElementById(tableName);
            recTab.rows[total].cells[1].innerHTML = item.val().username;
            recTab.rows[total].cells[2].innerHTML = item.val().round;
            recTab.rows[total].cells[3].innerHTML = item.val().time/item.val().round;
        })
    });
    tableRef.on('child_removed', function(data) {
		var total = data.numChildren();
        data.forEach(function(item){
            var recTab = document.getElementById(tableName);
            recTab.rows[total].cells[1].innerHTML = item.val().username;
            recTab.rows[total].cells[2].innerHTML = item.val().round;
            recTab.rows[total].cells[3].innerHTML = item.val().time/item.val().round;
        })
    });
  };

  fetchTable(usersRef,"users-table");
  fetchTable(recordsRef,"daily-table");
  **/