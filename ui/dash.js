$(document).ready(function(){
  $('#text').height($(window).height()-($('#header').height()+$('#footer').height()));

  //Get Username
  var request_username = new XMLHttpRequest();
  request_username.onload = function(){
  //  console.log('done1')
    if(request_username.readystate = XMLHttpRequest.DONE){
    //  console.log('done2');
        if(request_username.status===403){
          document.getElementById('dashmsg').innerHTML = 'Not logged in';
        }
        else if(request_username.status===500){
          document.getElementById('dashmsg').innerHTML = 'Server Error';
        }

        else{
          var username = request_username.responseText;
        //document.getElementById('dashmsg').innerHTML = request_username.responseText;

        }

    }

}
    request_username.open('GET','http://localhost:8082/check-login/',true);
    request_username.send(null);

$('#dropdown').click(function(){
  $('.dropdown-toggle').dropdown();
});



//Categories Request

$('#categories').click(function(){

  var request_categories = new XMLHttpRequest();
  request_categories.onload = function(){

      if(request_categories.readystate = XMLHttpRequest.DONE){


        if(request_categories.status===200||request_categories.status===304){
            var data = JSON.parse(request_categories.responseText);
            $('#dashbody').html('');
            for(var x=0;x<data.length;x++){
              $('#dashbody').append('<div class="categories_tab" id="temp_id"><span>'+'#'+data[x]+'</span></div>');
              $('#temp_id').attr('id',data[x]);
            }
            $('#categories').remove();
            $('#dashbody').append('<br>');
            //$('#post').remove();
        }

        else if(request_categories.status===500){

          $('#dashbody').append('<div/>',{
            id: 'error',
            text: 'Error loading categories, try again later!'
          });

        }

        else if(request_categories.status===403){
          $('#dashbody').append('<div/>',{
            id:'login_error',
            text: 'Lol you didn\'t login'
          });
        }
      }





  }

  request_categories.open('GET','http://localhost:8082/get-categories/',true);
  request_categories.send(null);


});





























});
