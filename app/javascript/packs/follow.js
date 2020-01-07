import $ from 'jquery'
import axios from 'axios'

$(document).on('turbolinks:load',function(){
  var myURL = new URL('http://localhost:5000/users/3');
  console.log(myURL.pathname)
  $('.btn-primary').click(function(even){
    event.preventDefault();
  })
})