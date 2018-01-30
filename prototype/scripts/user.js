
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

function dispInfo(){
    var clock = new Date();
    var month = clock.getUTCMonth() + 1; //months from 1-12
    var day = clock.getUTCDate();
    var year = clock.getUTCFullYear();
    var dayMonthYear = day+'d'+month+'m'+year+'y';
    var newDate = clock.getTime();
    //console.log(dayMonthYear); 
    var username = localStorage.getItem("username");  
    var uDB = firebase.database().ref("users/"+username);
    var dailyUserDB = firebase.database().ref("dailyUsersRecords/"+dayMonthYear+'/'+username);
    var ref = firebase.database().ref("dailyUsersRecords");
    uDB.on('value', function(snapshot){
        console.log(snapshot.key);
        if(snapshot.val()==null){ alert("Username is not FOUND"); return;}
            var nameDisp = snapshot.val().displayName;
            var facultyDisp = snapshot.val().faculty;
            var genderDisp = snapshot.val().gender;
            var totalTime = snapshot.val().totalTime;
            var totalDist = snapshot.val().totalDistance;
            var avgSpeed = (totalDist*0.51*3600)/totalTime;

            $("#dispName").append(nameDisp);
            $("#dispGen").html(genderDisp);
            $("#dispFacul").append(facultyDisp); 
            $("#personalInfoTab").append('<tr class="text-primary"><td>'+ totalTime +'</td><td>'+totalDist+'</td><td>'+avgSpeed+'</td></tr>');
            console.log("printed");  
               
    });
    
    ref.on('value',function(snapshot){
        snapshot.forEach(function(date){        //Refer to every date in dailyUsersRecords in firebase

            date.forEach(function(user){           //Refer to every user in dailyUserRecords in firebase

                if (user.key == username){            //Select only user that exist on that date
    
                    var runningRound = user.val().runningDistance;
                    var runningDist = runningRound*0.51;
                    var runningTime = (user.val().runningTime)/60;
                    var runningSpeed = (runningDist*60)/runningTime;
                    var count = 0;
                    var temp = date.key;
                    var timeData = {
                        labels: [],
                        series: []
                    };
                    timeData.labels.push(date.key);
                    timeData.series.push([runningTime],[]);

                    var distData = {
                        labels: [],
                        series: []
                    };
                    distData.labels.push(date.key);
                    distData.series.push([runningDist],[]);

                    var speedData = {
                        labels: [],
                        series: []
                    };
                    speedData.labels.push(date.key);
                    speedData.series.push([runningSpeed],[]);

                    var options = {
                        seriesBarDistance: 10,
                        axisX: {
                            showGrid: false
                        },
                        height: "245px"
                    };
            
                    var responsiveOptions = [
                        ['screen and (max-width: 640px)', {
                            seriesBarDistance: 5,
                            axisX: {
                                labelInterpolationFnc: function(value) {
                                    return value[0];
                                }
                            }
                        }]
                    ];
                    var timeChart = Chartist.Bar('#timeChart', timeData, options, responsiveOptions);
                    var distChart = Chartist.Bar('#distChart', distData, options, responsiveOptions);
                    var speedChart = Chartist.Bar('#speedChart', speedData, options, responsiveOptions);

                    //$("#runnerRecTab").append('<tr><td>' + date.key + '</td><td>' + runningTime + '</td><td>' + runningDist + '</td><td>' + runningSpeed + '</td></tr>');
                    
                }        
            })
            
        })  
    });


}
window.onload = function(){dispInfo()};

                   
                    
                  
                    
                  
                  