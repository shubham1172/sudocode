$(document).ready(function(){


  $('#menu').html(' <span class="dropdown"><img src="http://localhost:8082/get-photo" height="29.600" width="29.600" style="border: 2px solid #a4a6aa; border-radius: 100px" id="logout" id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="dropdown-menu dropdown-menu-left" aria-labelledby="dLabel"><span id="Profile">Profile</span><br> <span id="settings">Settings</span><br> <span id="logoutbtn">Logout</span></span>  <i class="fa fa-home" aria-hidden="true" id="home"></i>  <i class="fa fa-coffee" aria-hidden="true" id="categories"></i>');
  dashboard();
  $('#menu').css("padding-right","50px");
  //Get feed
    function dashboard(){
      console.log('feed_function');
      var feed = new XMLHttpRequest();
      feed.onload = function(){
        if(feed.readystate=XMLHttpRequest.DONE){
          if(feed.status===200){
            feedposts = JSON.parse(feed.responseText);
            for(var i=0;i<feedposts.length;i++){
              $('#dashbody').append('<div class="article" id='+feedposts[i].id+'><div class="username">'+feedposts[i].username+'</div><div class="history"><div class="datetime">'+feedposts[i].datetime+'</div><div class="lastmodified">last modified: '+feedposts[i].lastmodified+'</div></div><br><br><hr><div class="articletitle">'+feedposts[i].title+'</div><br><br><div class="articlecontent">'+feedposts[i].content+'</div><hr><div id="myCarousel" class="carousel slide" data-ride="carousel" id="comments"><div class="carousel-inner" role="listbox"> </div><button class="commentbutton">Have some thoughts?</button></div></div><br>');
              }
          }
          else if(feed.status===500){

          }
        }


    }
    feed.open('GET','http://localhost:8082/get-feed',true);
    feed.send(null);
  }

  //Create Article
   $('#postbutton').click(function(){
     var request_post = new XMLHttpRequest();
     request_post.onload = function(){
       if(request_post.readystate=XMLHttpRequest.DONE){
         if(request_post.status===200){
          // $('#dashbody').prepend('DONE');
          $('#dashbody').html('<br>');
          dashboard();
         }
         else if(request_post.status===500){
           $('#dashbody').prepend(request_post.responseText);
         }
       }
     }

     var title = document.getElementById('title').value;
     var content = document.getElementById('postinput').value;
     var temp = categories;

     $('#title').val("");
     $('#postinput').val("");
     $('#categorydiv').html("");
     request_post.open('POST', 'http://localhost:8082/create-article', true);
     request_post.setRequestHeader('Content-Type', 'application/json');
     request_post.send(JSON.stringify({title: title, content:content, categories:JSON.stringify(temp)}));
     categories = [];
   });

//categories for posts
//Categories inside post
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

setInterval(function(){
  $('blink').fadeIn('slow');
  $('blink').fadeOut('slow');}
  ,400);






});
