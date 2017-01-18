$(document).ready(function(){
  var checklogin = new XMLHttpRequest();

  checklogin.onload = function(){
    if(checklogin.readystate = XMLHttpRequest.DONE){
      if(checklogin.status === 500){
        //do something
      }
      else if(checklogin.status === 403){
        //do something
      }
      else{
        data = checklogin.responseText;
        console.log(data);
        if(data===false){
        //  window.location.href = "http://localhost:8082/";
        }
        else{
          $('#text').load('http://localhost:8082/ui/dashboard.html');
        }
      }
    }
  }
  checklogin.open('GET','http://localhost:8082/check-login/',true);
  checklogin.send(null);

});
