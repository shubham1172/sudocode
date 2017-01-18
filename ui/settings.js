$(document).ready(function(){

  $('#upload').click(function(){
    var reader = new FileReader();
    reader.onload = function(event){
      console.log(event.target.result);
      var request = new XMLHttpRequest();
      request.onload = function(){
      if(request.readystate = XMLHttpRequest.DONE){
        //  console.log(request.responseText + request.status);
        window.location.href = "http://localhost:8082/ui/settings.html";
        }
      }
      request.open('POST','http://localhost:8082/set-photo',true);
      request.setRequestHeader('Content-Type', 'application/json');
      request.send(JSON.stringify({photo: event.target.result}));

    };
    reader.readAsDataURL($("#browse").get(0).files[0]);
  });





});
