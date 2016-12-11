$(document).ready(function(){
  var request_username = new XMLHttpRequest();
  request_username.onload = function(){
    console.log('done1')
    if(request_username.readystate = XMLHttpRequest.DONE){
      console.log('done2');
        if(request_username.status===403){
          document.getElementById('dashmsg').innerHTML = 'Not logged in';
        }
        else if(request_username.status===500){
          document.getElementById('dashmsg').innerHTML = 'Server Error';
        }

        else{
          var username = request_username.responseText;
        document.getElementById('dashmsg').innerHTML = request_username.responseText;

        }

    }

}
    request_username.open('GET','http://localhost:8082/check-login/',true);
    request_username.send(null);



});
