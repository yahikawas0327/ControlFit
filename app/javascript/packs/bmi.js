// import $ from 'jquery'

// $(document).on('turbolinks:load',function(){
//   console.log('123')
//   $('.bmi-submit').on('click',function(event){
//     event.preventDefault();
//     let h = $(".cm").val();
//     let w = $(".kg").val();
//     if(h === ""){
//       $('.box').html("不能是空的唷")
//     }else if(w === ""){
//       $('.box').html("不能是空的唷")
//     }else{
//       h = parseFloat(h) / 100;
//       w = parseFloat(w);
//       let bmi = w / (h * h);
//       bmi = bmi.toFixed(2);
//       $(".box").html("BMI 稱為身體質量指數，是目前美國疾病管制局及世界衛生組織所認可，利用身高為基礎來測量體重是否符合標準，是目前國際上通用評估胖瘦的方式，理想體重範圍為 BMI 介於 18.5 到 24 之間，年輕者適用較低的 BMI 值，年長者則適用較高的 BMI 值，而最健康的 BMI 值為 22，若身體質量指數超過 24 為過重，超過 27 為肥胖，若超過 35 則為極度肥胖。 <br>" + "\n BMI = " + `<div class="d-inline-block bmi-jquery">${bmi}</div>` + '</br><br> 想更加認識自己嗎？ <a class="text-primary" href="http://localhost:5000/blogs">加入我們</a>')
//     }
//   })
// })