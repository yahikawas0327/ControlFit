<<<<<<< HEAD
import $ from 'jquery'

$(document).on('turbolinks:load',function(){
  $('.submit').click(function(event){
    event.preventDefault();
    let h = $(".cm").val();
    let w = $(".kg").val();
    if(isNaN(h)){
      alert("請輸入數字");
      height.value="";
    }else if(isNaN(w)){
      alert("請輸入數字");
      weight.value="";
    }else{
      h = parseFloat(h) / 100;
      w = parseFloat(w);
      let bmi = w / (h * h);
      bmi = bmi.toFixed(2);
      $(".box").html("\n BMI = " + bmi);
    }
  })
=======
import $ from 'jquery'

$(document).on('turbolinks:load',function(){
  $('.box').hide();
  $('.submit').click(function(event){
    $('.box').show();
    event.preventDefault();
    let h = $(".cm").val();
    let w = $(".kg").val();
    if(isNaN(h)){
      alert("請輸入數字");
      height.value="";
    }else if(isNaN(w)){
      alert("請輸入數字");
      weight.value="";
    }else{
      h = parseFloat(h) / 100;
      w = parseFloat(w);
      let bmi = w / (h * h);
      bmi = bmi.toFixed(2);
      $(".box").html("\n BMI = " + bmi);
    }
  })
>>>>>>> origin/master
})