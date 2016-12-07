var submit = $('#button');

submit.click (function(){
  //Make request
  console.log('click')
  var request = new XMLHttpRequest();
  //request.responseType = "text";
  //Response;
  request.onload = function(){
    console.log('done1')
    if(request.readystate = XMLHttpRequest.DONE){
      console.log('done2');
        if(request.status===200){

          console.log(request.responseText);
        document.getElementById('label').innerHTML = request.responseText;
        $('#loginform').load('http://localhost:8082/ui/loginpsk.html');

        }
        else{
          console.log("NOT DONE!")
        }

    }
  }


  var id = document.getElementById('id').value;
  console.log(id);
  request.open('GET','http://localhost:8082/checkId/?id='+id,true);
  request.send(null);
});
