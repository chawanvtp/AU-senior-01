//<script src="https://www.gstatic.com/firebasejs/4.9.0/firebase.js"></script>
    
      // Initialize Firebase
var config = {
  apiKey: "AIzaSyAXcnK39RpWb-_MokDsGudxyBnmF2tUXYo",
  authDomain: "fit4run-4d4c5.firebaseapp.com",
  databaseURL: "https://fit4run-4d4c5.firebaseio.com",
  projectId: "fit4run-4d4c5",
  storageBucket: "fit4run-4d4c5.appspot.com",
  messagingSenderId: "204682250613"
  };
  //firebase.initializeApp(config);
console.log("Connected");

  function updateEdit(){
    //firebase.initializeApp(config);
    var database = firebase.database();
 
    var submit = document.getElementsByName('editButton');
    var username = localStorage.getItem("username");

   // console.log("Initialized");
    //console.log("Start");
    var Name = $('#runnerName').val();
    var Height = $('#height').val();
    var Weight = $('#weight').val();
    var Faculty = $('#faculty').val();
    var uDB = database.ref('users/'+username);
    var gender = "male";
    if(document.getElementById('female').checked){ gender = "female" }
    console.log("declared");
   
    uDB.on('value', function(snapshot){
      firebase.database().ref('users/'+username).set({
        displayName: Name,
        height: Height,
        weight: Weight,
        faculty: Faculty,
        gender: gender,
        birthday: snapshot.val().birthday,
        totalDistance: snapshot.val().totalDistance,
        totalTime: snapshot.val().totalTime});
        //evt.prevetDefault();
        //console.log("updated");
      });     
  }