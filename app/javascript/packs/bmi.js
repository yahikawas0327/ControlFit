import $ from 'jquery'

$(document).ready(function(){
  $('.submit').click(function(){
    var h = $(".cm").val();
    var w = $(".kg").val();
    if(isNaN(h)){
      alert("請輸入數字");
      height.value="";
    }else if(isNaN(w)){
      alert("請輸入數字");
      weight.value="";
    }else{
      h = parseFloat(h) / 100;
      w = parseFloat(w)
      var bmi = w / (h * h);
      bmi = bmi.toFixed(2);
      $(".box").append("身高" + h + "公尺！" + "體重" + w + "公斤!" + "\n BMI = " + bmi);
    }
  })
})