$(document).ready(function(){
 //get-user

 var user = new XMLHttpRequest();

 user.onload = function(){
   if(user.readystate = XMLHttpRequest.DONE){
     if(user.status === 500){
       //do something
     }
     else if(user.status === 403){
       //do something
     }
     else{
       data = JSON.parse(user.responseText);
       
       $('#username').append(data.username);
       $('#uid').html(data.id);
       $('#bio').html(data.bio);
       for(var i=0;i<data.articles.length;i++){
          $('#dashbody').append('<div class="article" id='+data.articles[i].id+'><div class="username">'+data.articles[i].username+'</div><div class="history"><div class="datetime">'+data.articles[i].datetime+'</div><div class="lastmodified">last modified: '+data.articles[i].lastmodified+'</div></div><br><br><hr><div class="articletitle">'+data.articles[i].title+'</div><br><br><div class="articlecontent">'+data.articles[i].content+'</div><hr><div id="myCarousel" class="carousel slide" data-ride="carousel" id="comments"><div class="carousel-inner" role="listbox"> </div><button class="commentbutton">Have some thoughts?</button></div></div><br>');
        }
     }
   }


 }

 user.open('GET','http://localhost:8082/get-user/',true);
 user.send(null);

 setInterval(function(){
   $('blink').fadeIn('slow');
   $('blink').fadeOut('slow');}
   ,400);



});
