$(document).ready(function(){
  $('#text').height($(window).height()-($('#header').height()+$('#footer').height()));
<<<<<<< HEAD



//Get Username
=======
  //Get Username
>>>>>>> ce98d91f4e9f1dad5e4a91eac6dea0578262ae32
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

$('#dropdown').click(function(){
  $('.dropdown-toggle').dropdown();
});


<<<<<<< HEAD
//Categories Page opening request
=======

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




>>>>>>> ce98d91f4e9f1dad5e4a91eac6dea0578262ae32
$(this).on("click", ".categories_tab", function(){
    console.log('clicked_categories');
    console.log(this.id);
    var request_article_by_categories = new XMLHttpRequest();

    request_article_by_categories.onload = function(){
      if(request_article_by_categories.readystate = XMLHttpRequest.DONE){

        if(request_article_by_categories.status===200){
          console.log(request_article_by_categories.responseText);

        }

        else if(request_article_by_categories.status===500){
          console.log('Server Error');
        }

      }
    }

    var art_id = this.id;
    request_article_by_categories.open('GET','http://localhost:8082/get-articles/?category='+art_id,true);
    request_article_by_categories.send(null);


    });


<<<<<<< HEAD

//Categories inside post
=======
>>>>>>> ce98d91f4e9f1dad5e4a91eac6dea0578262ae32
  categories = [];

$('#postcategory').click(function(){
  console.log($('#catdrop').html());
      if($('#catdrop').html()==""){
        console.log("stuff");
      var request_categories = new XMLHttpRequest();
      request_categories.onload = function(){

          if(request_categories.readystate = XMLHttpRequest.DONE){


            if(request_categories.status===200||request_categories.status===304){
              data = JSON.parse(request_categories.responseText);

              for(var x=0; x<data.length; x++){

                if(categories.includes(data[x])!=true){
                $('#catdrop').append('<li class="categoriesdrop" id="temp_id1"><span>'+data[x]+'</span></li>');
                    $('#temp_id1').attr('id',data[x]);
                }
              }

              $('.categoriesdrop').click(function(){
                categories.push(this.id);

                $('#categorydiv').append('<div class="hashtag">'+"#"+this.id+'<i class="fa fa-times" aria-hidden="true" id="cross"></i>'+'<span id="dot">.</span>'+'</div>');
                $('#catdrop').remove();
                $('.modal-footer').append('<ul class="dropdown-menu dropdown-menu-right" id="catdrop"></ul>');
              });

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

}

});

<<<<<<< HEAD
$("#categories").click(function(){
  window.location.href = "http://localhost:8082/ui/categories.html";
})
=======


//Create Article







>>>>>>> ce98d91f4e9f1dad5e4a91eac6dea0578262ae32


setInterval(function(){
  $('blink').fadeIn('slow');
  $('blink').fadeOut('slow');}
  ,400);





});
