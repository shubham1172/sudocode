$(document).ready(function(){
  var request_username = new XMLHttpRequest();
  request_username.onload = function(){
    console.log('done1')
    if(request_id.readystate = XMLHttpRequest.DONE){
      console.log('done2');
        if(request_username.status===403){
          document.getElementById('dashmsg').innerHTML = 'Invalid Credentials';
        }
        else if(request_username.status===500){
          document.getElementById('dashmsg').innerHTML = 'Server Error';
        }
        }
        else{
          var username = request_id.responseText;
        document.getElementById('dashmsg').innerHTML = request_username.responseText;

        }

    }


    request_username.open('GET','http://localhost:8082/check-login/',true);
    request_username.send(null);



});
