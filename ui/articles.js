

//Document on ready function
$(document).ready(function(){

//Get Article by category
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
          $('#dashbody').append('<br><div id="articlediv"></div>')
          $('#articlediv').html('');
          for(var i=0;i<categoryposts.length;i++){
          //  var m = moment(JSON.stringify(categoryposts[i].datetime));

          //  m.format('LLL');

            $('#articlediv').append('<div class="article" id='+categoryposts[i].id+'><div class="username">'+categoryposts[i].username+'</div><div class="history"><div class="datetime">'+categoryposts[i].datetime+'</div><div class="lastmodified">last modified: '+categoryposts[i].lastmodified+'</div></div><br><br><hr><div class="articletitle">'+categoryposts[i].title+'</div><br><br><div class="articlecontent">'+categoryposts[i].content+'</div><hr><div id="myCarousel" class="carousel slide" data-ride="carousel" id="comments"><div class="carousel-inner" role="listbox"> </div><button class="commentbutton">Have some thoughts?</button></div></div><br>')

          }
          $('#text').height($(window).height()-($('#header').height()+$('#footer').height()));
          $('#article').width(150);
          console.log("DASHING");
          dashboard();
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

//Create comment
