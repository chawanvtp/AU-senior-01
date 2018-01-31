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
            var totalTime = snapshot.val().totalTime/60;
            var totalDist = snapshot.val().totalDistance;
            var avgSpeed = (totalDist*0.5*60)/totalTime;
            avgSpeedTemp = avgSpeed.toFixed(2);
            //var userID = snapshot.val();
            var tempTime = totalTime.toFixed(2);
            

            $("#dispName").html(nameDisp);
            $("#dispGen").html(genderDisp);
            $("#dispFacul").html(facultyDisp); 
            $("#personalInfoTab").html('<tr class="text-primary"><td>'+ tempTime +'</td><td>'+ totalDist + '</td><td>' + avgSpeedTemp + '</td></tr>');
            console.log("printed");  
               
    });
    
    ref.on('value',function(snapshot){
        snapshot.forEach(function(date){        //Refer to every date in dailyUsersRecords in firebase

            date.forEach(function(user){           //Refer to every user in dailyUserRecords in firebase

                if (user.key == username){            //Select only user that exist on that date
    
                    var runningRound = user.val().runningDistance;
                    var runningDist = runningRound*0.5;
                    var runningTime = (user.val().runningTime)/60;
                    var runningSpeed = (runningDist*60)/runningTime;
                    var count = 0;
                    runningSpeedTemp = runningSpeed.toFixed(2);
                    runningTimeTemp = runningTime.toFixed(2);

                    var userInfo = JSON.parse(localStorage.getItem(username+'Info'));
                    //console.log(userInfo);
                    console.log(userInfo.gender);
                    console.log(userInfo.height);
                    console.log(userInfo.weight);
                    console.log(userInfo.birthday);

                    var gender = userInfo.gender;
                    var height = userInfo.height;
                    var weight = userInfo.weight;
                    var age = (2018 - userInfo.birthday.substr(0,4));
                    var bmr = 0;
                    var calBurn = 0;
                    var tempCal = 0;

                    if(gender == "male"){
                        bmr = 10 * weight + 6.25 * height - 5 * age + 5;       
                    }
                    if(gender == 'female'){
                        bmr = 10 * weight + 6.25 * height - 5 * age -161;
                    }
                    if (runningSpeed >= 10){       
                        calBurn = (runningTime * 11 * bmr)/(24*60);
                        tempCal = calBurn.toFixed(2);
                        //console.log(calBurn);
                    }
                    if (runningSpeed < 10){
                        calBurn = (runningTime * 6 * bmr)/(24*60);
                        tempCal = calBurn.toFixed(2);
                    }
                    console.log(tempCal);
                    /*
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
                    var speedChart = Chartist.Bar('#speedChart', speedData, options, responsiveOptions); */

                    $("#runnerRecTab").append('<tr><td>' + date.key + '</td><td>' + runningTimeTemp + '</td><td>' + runningDist + '</td><td>' + runningSpeedTemp + '</td><td>' + tempCal + '</td></tr>');
                    
                }        
            })
            
        })  
    });


}
window.onload = function(){dispInfo()};