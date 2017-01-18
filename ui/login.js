
//checking user
$(document).ready(function(){

var submit = $('#button');

submit.click (function(){
  var checklogger = new XMLHttpRequest();
  checklogger.onload = function(){

    if(checklogger.readystate = XMLHttpRequest.DONE){

        if(checklogger.status===403){
          id = document.getElementById('id').value;
          document.getElementById('userid').innerHTML = id;

          var request_id = new XMLHttpRequest();

          request_id.onload = function(){

            if(request_id.readystate = XMLHttpRequest.DONE){

                if(request_id.status===200){
                  var username = request_id.responseText;

                document.getElementById('label').innerHTML = '<span id="un">'+request_id.responseText+'</span>'+ ',<span id="txt"> Enter your password.<br></span>';
                $('#loginform').load('http://localhost:8082/ui/loginpsk.html');
                document.getElementById('userid').innerHTML = id;
                $("#userid").hide();

                }
                else{
                    document.getElementById('label').innerHTML ='<span style="color:red">Enter valid ID</span>';
                }

            }
          }




          request_id.open('GET','http://localhost:8082/checkId/?id='+id,true);
          request_id.send(null);
        }

        else if(checklogger.status===500){
          document.getElementById('dashmsg').innerHTML = 'Server Error';
        }


        else{
          //  $('#loginscreen').load('http://localhost:8082/ui/dashboard.html');
          window.location.href = "http://localhost:8082/ui/dash.html";
        //  $('#menu').html(' <span class="dropdown"><img src="http://localhost:8082/get-photo" height="29.600" width="29.600" style="border: 2px solid #a4a6aa; border-radius: 100px" id="logout" id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="dropdown-menu-left"><span class="dropdown-menu" aria-labelledby="dLabel"><span id="Profile">Profile</span><br> <span id="settings">Settings</span><br> <span id="logoutbtn">Logout</span></span>  <i class="fa fa-home" aria-hidden="true" id="home"></i>  <i class="fa fa-coffee" aria-hidden="true" id="categories"></i>')
        }

    }

}
    checklogger.open('GET','http://localhost:8082/check-login/',true);
    checklogger.send(null);


});

//logging in
var login = $('#loginbutton');

login.click(function(){


  var request_login = new XMLHttpRequest();
  request_login.onload = function(){

    if(request_login.readystate = XMLHttpRequest.DONE){

        if(request_login.status===200){


        $('#label').hide();
        document.getElementById('loginbox').innerHTML = request_login.responseText;
      //  $('#loginscreen').fadeTo('slow',0);
      //  $('#loginscreen').load('http://localhost:8082/ui/dashboard.html');
        window.location.href = "http://localhost:8082/ui/dash.html";
      //  $('#menu').html(' <span class="dropdown"><img src="http://localhost:8082/get-photo" height="29.600" width="29.600" style="border: 2px solid #a4a6aa; border-radius: 100px" id="logout" id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="dropdown-menu-left" data-toggle="tooltip" data-placement="bottom" title="Profile"><span class="dropdown-menu" aria-labelledby="dLabel"><span id="Profile">Profile</span><br><span id="settings">Settings</span><br> <span id="logoutbtn">Logout</span></span>  <i class="fa fa-home" aria-hidden="true" id="home" data-toggle="tooltip" data-placement="bottom" title="Home"></i>  <i class="fa fa-coffee" aria-hidden="true" id="categories" data-toggle="tooltip" data-placement="bottom" title="Categories"></i>')
      //  $('#loginscreen').fadeTo('slow',100);

        }
        else if(request_login.status===403){

        document.getElementById('txt').innerHTML = '<span style="color:red"> Enter a valid Password.</span>';
        }
        else if(request_login.status===500){

        document.getElementById('loginbox').innerHTML = request_login.responseText;
        }

    }
  }

  var password = document.getElementById('password').value;



  request_login.open('POST', 'http://localhost:8082/login', true);
  request_login.setRequestHeader('Content-Type', 'application/json');
  request_login.send(JSON.stringify({id: id, password: password}));
});

//loggin the user in.
setInterval(function(){
  $('blink').fadeIn('slow');
  $('blink').fadeOut('slow');}
  ,400);
});
