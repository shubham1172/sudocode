$(document).ready(function(){

//change photo
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


//change password

$("#newpsk2").on("keyup",function(){
  console.log($('#newpsk1').val());
  console.log($('#newpsk2').val());
  $('#newpsk2').css("border-width","3px");
  $('#newpsk1').css("border-width","3px");
  if($('#newpsk1').val()==$('#newpsk2').val()){
    $('#newpsk2').css("border-color","green");
      $('#newpsk1').css("border-color","green");

      $('#update_password').click(function(){
        var update_psk = new XMLHttpRequest();
        update_psk.onload = function(){
          if(update_psk.readystate=XMLHttpRequest.DONE){
            if(update_psk.status===200){
              //do something
              $("#msg").html(update_psk.responseText);
              $("#newpsk1").val("");
              $("#newpsk2").val("");
              $("#oldpsk").val("");
              $('#newpsk1').css("border-color","transparent");
              $('#newpsk2').css("border-color","transparent");
            }
            else if(update_psk.status===500){
              $("#msg").html(update_psk.responseText);
            }
            else{
              $("#msg").html(update_psk.responseText);
            }
          }
        }
        newpsk = $("#newpsk1").val();
        oldpsk = $("#oldpsk").val();
        update_psk.open('POST', 'http://localhost:8082/change-password', true);
        update_psk.setRequestHeader('Content-Type', 'application/json');
        update_psk.send(JSON.stringify({old_password: oldpsk, new_password: newpsk}));
      });
  }

  else if($('#newpsk1').val()==0||$('#newpsk2').val()==0){
        $('#newpsk1').css("border-color","transparent");
        $('#newpsk2').css("border-color","transparent");
  }

  else{
      $('#newpsk2').css("border-color","maroon");
        $('#newpsk1').css("border-color","maroon");
  }

});


//check username

$("#set_username").on("keyup",function(){
  var checkuser = new XMLHttpRequest();
  checkuser.onload = function(){
    if(checkuser.readystate=XMLHttpRequest.DONE){
      if(checkuser.status===500){
        //do something
        $('#set_username').css("border-color","maroon");
      }
      else if(checkuser.status===406){
        //do something
        $('#set_username').css("border-color","maroon");
      }
      else if(checkuser.status===200){
        //do something
        if($('#set_username').val()!=""){
            $('#set_username').css("border-color","green");
        }
        if($('#set_username').val()==""){
            $('#set_username').css("border-color","transparent");
        }

      }
    }
  }
  username = $("#set_username").val();
  checkuser.open('GET', 'http://localhost:8082/check-username/?username='+username, true);
  checkuser.send();
});


//change username
$("#update_username").click(function(){
  var update_user = new XMLHttpRequest();
  update_user.onload = function(){
    if(update_user.readystate=XMLHttpRequest.DONE){
      if(update_user.status===500){
        $('#msg').append(update_user.responseText);
      }
      else if(update_user.status===403){
        $('#msg').append(update_user.responseText);
      }
      else if(update_user.status===200){
        $('#msg').append(update_user.responseText);
        $('#set_username').val("");
      }
    }
  }
  username = $('#set_username').val();
  password = $('#oldpsk_username').val();
  update_user.open('POST', 'http://localhost:8082/set-username', true);
  update_user.setRequestHeader('Content-Type', 'application/json');
  update_user.send(JSON.stringify({username: username, password: password}));

});

//get bio

var getbio = new XMLHttpRequest();
getbio.onload = function(){
//  console.log("bio");
  if(getbio.readystate=XMLHttpRequest.DONE){
    if(getbio.status===500){
    //  $('#msg').append(update_user.responseText);
    }
    else if(getbio.status===403){
    //  $('#msg').append(update_user.responseText);
    }
    else if(getbio.status===200){
      //$('#msg').append(update_user.responseText);
      $('#bio').val(getbio.responseText);
    }
  }

}
getbio.open('GET', 'http://localhost:8082/get-bio', true);
getbio.send();

























//update bio
$("#update_bio").click(function(){
  var update_bio = new XMLHttpRequest();
  update_bio.onload = function(){
    if(update_bio.readystate=XMLHttpRequest.DONE){
      if(update_bio.status===500){
        $('#msg').append(update_user.responseText);
      }
      else if(update_bio.status===403){
        $('#msg').append(update_user.responseText);
      }
      else if(update_bio.status===200){
        $('#msg').append(update_bio.responseText);
        $('#bio').val("");
      }
    }
  }
  bio = $('#bio').val();
  update_bio.open('POST', 'http://localhost:8082/set-bio', true);
  update_bio.setRequestHeader('Content-Type', 'application/json');
  update_bio.send(JSON.stringify({bio: bio}));

});

});
