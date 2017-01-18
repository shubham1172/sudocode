$(document).ready(function(){
  $('#home').click(function(){
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
            window.location.href = "http://localhost:8082/";
          }
          else{
            window.location.href = "http://localhost:8082/ui/dash.html";

          }
        }
      }
    }

    checklogin.open('GET','http://localhost:8082/check-login/',true);
    checklogin.send(null);

});

  $('#Profile').click(function(){
    window.location.href = "http://localhost:8082/ui/user.html";
  });

  $('#logoutbtn').click(function(){
    var logout = new XMLHttpRequest();
    logout.onload = function(){

      if(logout.readystate = XMLHttpRequest.DONE){

          if(logout.status===403){
            document.getElementById('dashmsg').innerHTML = logout.responseText;
          }
          else if(logout.status===500){
            document.getElementById('dashmsg').innerHTML = 'Server Error try again.';
          }

          else if(logout.status===200){

          window.location.href = 'http://localhost:8082/ui/logout.html';

          }

      }

    }
      logout.open('GET','http://localhost:8082/logout',true);
      logout.send(null);
});


$("#categories").click(function(){
  window.location.href = "http://localhost:8082/ui/categories.html";
});

});
