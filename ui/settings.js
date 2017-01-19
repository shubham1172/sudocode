$(document).ready(function(){

//set photo
  $('#upload').click(function(){
    var reader = new FileReader();
    reader.onload = function(event){
    //  console.log(event.target.result);
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


//set password

$("#newpsk2").on("keyup",function(){
  console.log($('#newpsk1').val());
  console.log($('#newpsk2').val());
  $('#newpsk2').css("border-width","3px");
  $('#newpsk1').css("border-width","3px");
  if($('#newpsk1').val()==$('#newpsk2').val()){
    $('#newpsk2').css("border-color","green");
      $('#newpsk1').css("border-color","green");
  }
  else if($('#newpsk1').val()==0||$('#newpsk2').val()==0){
        $('#newpsk1').css("border-color","transparent");
        $('#newpsk2').css("border-color","transparent");
  }
  else{
      $('#newpsk2').css("border-color","red");
        $('#newpsk1').css("border-color","red");
  }

});



});
