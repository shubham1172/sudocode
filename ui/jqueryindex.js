var minHeight = 30;

var resizeMiddle = function() {
    var h = $('#text').height() - $('#header').height() - $('#footer').height();
    h = h > minHeight ? h : minHeight;
    $('#text').height(h);
};





$(document).ready(function(){

resizeMiddle('#text');
$(window).resize(resizeMiddle);

$('#login').click(function(){
//  $('#login').fadeTo('slow',0);

  $('#login').fadeTo('slow',0);
  $('#text').load('http://localhost:8082/ui/login.html');
  $('#login').remove();
});




	setInterval(function(){
		$('blink').fadeIn('slow');
		$('blink').fadeOut('slow');}
		,400);





 });
