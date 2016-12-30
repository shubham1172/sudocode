$(document).ready(function(){
  $('#text').height($(window).height()-($('#header').height()+$('#footer').height()));
  //Get Username
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



//Categories Request

$('#categories').click(function(){

  var request_categories = new XMLHttpRequest();
  request_categories.onload = function(){

      if(request_categories.readystate = XMLHttpRequest.DONE){


        if(request_categories.status===200||request_categories.status===304){
            var data = JSON.parse(request_categories.responseText);
            console.log('inside if')
            $('#dashbody').html('');
            for(var x=0;x<data.length;x++){
              $('#dashbody').append('<div class="categories_tab" id="temp_id"><span>'+'#'+data[x]+'</span></div>');
              $('#temp_id').attr('id',data[x]);
            }
            $('#dashbody').append('<hr><br>')
            $('#categories').remove();
            $('#post').remove();
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




$(this).on("click",".categories_tab", function(evt){
    console.log('clicked_categories');
    console.log(this.id);
    var request_article_by_categories = new XMLHttpRequest();

    request_article_by_categories.onload = function(){
      if(request_article_by_categories.readystate = XMLHttpRequest.DONE){

        if(request_article_by_categories.status===200){
          //console.log(request_article_by_categories.responseText);
          var categoryposts = JSON.parse(request_article_by_categories.responseText);
          //console.log(categoryposts.length);
          $('#dashbody').append('<div id="articlediv"></div>')
          $('#articlediv').html('');
          for(var i=0;i<categoryposts.length;i++){
            var m = moment(JSON.stringify(categoryposts[i].datetime));

            m.format('LLL');

            $('#articlediv').append('<div class="article"><div class="username">'+categoryposts[i].uid+'</div><div class="history"><div class="datetime">'+m+'</div><div class="lastmodified">last modified: '+categoryposts[i].lastmodified+'</div></div><br><br><hr><div class="articletitle">'+categoryposts[i].title+'</div><br><br><div class="articlecontent">'+categoryposts[i].content+'</div><hr><div class="carousel-caption" id="comments"></div></div><br>')

          }
          $('#text').height($(window).height()-($('#header').height()+$('#footer').height()));
          $('#article').width(150);
        }

        else if(request_article_by_categories.status===500){
          console.log('Server Error');
        }

      }
    }

    var art_id = this.id;
    request_article_by_categories.open('GET','http://localhost:8082/get-articles/?category='+art_id,true);
    request_article_by_categories.send(null);
	evt.stopPropagation();
	evt.preventDefault();
	evt.stopImmediatePropagation();

 });


  categories = [];

$('#postcategory').click(function(){

      var request_categories = new XMLHttpRequest();
      request_categories.onload = function(){

          if(request_categories.readystate = XMLHttpRequest.DONE){


            if(request_categories.status===200||request_categories.status===304){
                var data = JSON.parse(request_categories.responseText);
                for(var x=0;x<data.length;x++){
                  if(categories.includes(data[x])!=true){
                    $('#catdrop').append('<li class="categoriesdrop" id="temp_id1"><span>'+data[x]+'</span></li>');
                    $('#temp_id1').attr('id',data[x]);
                  }


                }

                $('.categoriesdrop').click(function(){

                  categories.push(this.id);
                  $('#categorydiv').append('<div class="hashtag">'+"#"+this.id+'<i class="fa fa-times" aria-hidden="true" id="cross"></i>'+'<span id="dot">.</span>'+'</div>');
                  $('#catdrop').remove();
                  $('.modal-content').append('<ul class="dropdown-menu dropdown-menu-right" id="catdrop"></ul>');
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


});




$('#postbutton').click(function(){

  var request_post = new XMLHttpRequest();
  request_post.onload = function(){
    if(request_post.readystate=XMLHttpRequest.DONE){
      if(request_post.status===200){
        $('#dashbody').prepend('DONE');
      }
      else if(request_post.status===500){
        $('#dashbody').prepend(request_post.responseText);
      }
    }
  }

  var title = document.getElementById('title').value;
  var content = document.getElementById('postinput').value;
  console.log(categories);
  console.log(content);
  console.log(title);
  request_post.open('POST', 'http://localhost:8082/create-article', true);
  request_post.setRequestHeader('Content-Type', 'application/json');
  request_post.send(JSON.stringify({title: title, content:content, categories:JSON.stringify(categories)}));


});

$('#postinput').click(function(){

});








setInterval(function(){
  $('blink').fadeIn('slow');
  $('blink').fadeOut('slow');}
  ,400);





});
