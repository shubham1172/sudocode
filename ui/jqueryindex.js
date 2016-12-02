var minHeight = 30; // Define a minimum height for the middle div

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

  $('#login').fadeTo('slow',100);
  $('#text').load('login.html');
  document.getElementById('nav').innerHTML="<button id='login'> Back </button>";
});




	setInterval(function(){
		$('blink').fadeIn('slow');
		$('blink').fadeOut('slow');}
		,400);





 });
