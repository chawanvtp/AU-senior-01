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

var clock = new Date();
var month = clock.getUTCMonth() + 1; //months from 1-12
var day = clock.getUTCDate();
var year = clock.getUTCFullYear();
var dayMonthYear = day+'d'+month+'m'+year+'y';
//var counter = 0;
var telNo = localStorage.getItem("username");
var DB = firebase.database().ref('dailyUsersRecords/'+ dayMonthYear);

DB.on('child_changed', function(snapshot){
    var temp = snapshot.val();
    var announce =  temp.displayName+'   ' +':  Round '+ temp.runningDistance +' - ' + temp.lastRunningTime + ' seconds.';
    
    for(i=1;i<=4;i++){
        if(i<4){
            document.getElementById('announce-bar'+i).innerText = document.getElementById('announce-bar'+(i+1)).innerText;
           // console.log(document.getElementById('announce-bar'+(i+1)).innerText);
        }else{
            document.getElementById('announce-bar'+i).innerText = announce;
        }
    }
    //$("#announce-bar1").html(announce);
    //document.getElementById('announce-div').sc
    /*
    for(i=1;i<=2;i++){

        if(i<2){
            //$("#announce-bar"+i).append($("#announce-bar"+(i+1)));
            console.log($("#announce-bar"+i).innerHTML);
        }else{
            $("#announce-bar"+i).append(announce);
        }
       
    }
    */
    /*
    if (counter%2 == 0){
        //document.getElementById('announce-bar').innerHTML = announce;
        
        $("#announce-bar").append(announce);
        counter = counter + 1;
    }
    if (counter%2 == 1){
        //document.getElementById('announce-bar2').innerHTML = announce;
        
        $("#announce-bar"+2).append(announce);
        counter = counter + 1;
    }
    */
    //$("#announce-bar2").empty();
});



function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }