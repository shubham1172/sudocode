
//checking user
$(document).ready(function(){

var submit = $('#button');
submit.click (function(){
  id = document.getElementById('id').value;
  document.getElementById('userid').innerHTML = id;
  //Make request
  console.log('click')
  var request_id = new XMLHttpRequest();
  //request.responseType = "text";
  //Response;
  request_id.onload = function(){
    console.log('done1')
    if(request_id.readystate = XMLHttpRequest.DONE){
      console.log('done2');
        if(request_id.status===200){
          var username = request_id.responseText;
        //console.log(request_id.responseText);
        document.getElementById('label').innerHTML = request_id.responseText+ ', Enter your password.<br>';
        $('#loginform').load('http://localhost:8082/ui/loginpsk.html');
        document.getElementById('userid').innerHTML = id;
        $("#userid").hide();

        }
        else{
          console.log("NOT DONE!")
        }

    }
  }



  console.log(id);
  request_id.open('GET','http://localhost:8082/checkId/?id='+id,true);
  request_id.send(null);
});



//logging in
var login = $('#loginbutton');

login.click(function(){

  console.log('loginclick');
  var request_login = new XMLHttpRequest();
  request_login.onload = function(){
    console.log('done_login1')
    if(request_login.readystate = XMLHttpRequest.DONE){
      console.log('done_login2');
        if(request_login.status===200){

        //  console.log(request_login.responseText);
        $('#label').hide();
        document.getElementById('loginbox').innerHTML = request_login.responseText;
        $('#text1').fadeTo('slow',0);
        $('#text1').load('http://localhost:8082/ui/dashboard.html');
        $('#text1').fadeTo('slow',100);

        }
        else if(request_login.status===403){
          console.log("NOT DONE!")
        document.getElementById('loginbox').innerHTML = request_login.responseText;
        }
        else if(request_login.status===500){
        //console.log(id);
        document.getElementById('loginbox').innerHTML = request_login.responseText;
        }

    }
  }

  var password = document.getElementById('password').value;
//  hashedpsk = getHash(password);
  //var id = document.getElementById('userid').value;  do not uncomment this line.
  console.log(id);
  //console.log(hashedpsk);
  request_login.open('POST', 'http://localhost:8082/login', true);
  request_login.setRequestHeader('Content-Type', 'application/json');
  request_login.send(JSON.stringify({id: id, password: password}));
});




});
