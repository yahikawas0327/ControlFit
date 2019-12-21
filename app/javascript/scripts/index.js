// console.log('hi')

// import 'bulma/css/bulma.css'
// import  '@fortawesome/fontawesome-free/css/all.css'

// import  './application.scss'
import './application.js'
import $ from 'jquery'
import axios from 'axios-on-rails'
// const axios = require('axios');


// 新增每日食物資料 JQuery 

// $(document).ready(function (){
//     $('.search_food_result').on('click','button',function(evt){
//         evt.stopPropagation();
//         let food_hash = {
//             food_id : `${evt.target.id}`
//          }
//          console.log(food_hash)
//         axios.post("http://localhost:3000/food_records", food_hash)
//          .then( response => {
//             console.log('response=>',response); 
//          })
//         // console.log(food_hash)

//     })
// })

 // 新增每日食物資料 JQuery 
 $(document).ready(function (){
    $('tr').on('click','button',function(evt){

      $('.table-hover').hide();
      let food_name = $(evt.target).parent().siblings('td:first').text()
      let food_calorie = $(evt.target).parent().siblings('td:first').next().text()

       $('#Add_food_record').append( `
       <div class="col-md-3 mb-3 ">
       <label for="disabledTextInput">食物名稱</label>
       <input class="form-control" type="text" placeholder="${food_name}" readonly>
       </div>
       <div class="col-md-3 mb-3">
       <label for="disabledTextInput_1">卡洛里</label>
       <input class="form-control" type="text" placeholder="${food_calorie}" readonly>
       </div>
       <div class="col-md-3 mb-3">
            <label for="custom-select">份數</label>
            <select class="custom-select" id="foodqty">
                <option selected>1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
       </div>
       <div class="col-md-3 mb-3">
            <label for="exampleFormControlInput1">型態</label>
            <select class="custom-select" id="foodtype">
            <option selected>早餐</option>
            <option value="1">午餐</option>
            <option value="2">晚餐</option>
            <option value="3">點心/其他</option>
            </select>
       </div>
       <button type="submit" class="fas fa-cloud-upload-alt" id="${evt.target.id}"></button>
       `); // 增加使用者體驗 並接收 食物數量 / 型態
    })
     
    $('#Add_food_record').on('click','button',function(evt){
      evt.stopPropagation();
      let foodqty=$("#foodqty :selected").text();
      //獲取Select選擇的qty
      let foodtype=$("#foodtype :selected").text();
      //獲取Select選擇的foodtype
      let food_hash = {
                food_id : `${evt.target.id}`,
                food_qty: foodqty,
                food_type: foodtype
                 }
      // console.log(food_hash)
      axios.post("http://localhost:3000/food_records", food_hash)
           .then( response => {
                  console.log('response=>',response); 
      })
    }) // 將資料傳送至後端 傳送 id / qty / type
 
    //----------------------------------------------------------



})



