// import 'bulma/css/bulma.css'
// import  '@fortawesome/fontawesome-free/css/all.css'

// import  './application.scss'
import './application.js'
import $ from 'jquery'
import axios from 'axios-on-rails'
import moment from "moment";
import { element, func } from 'prop-types';
import echarts from "echarts";

// const axios = require('axios');
 
document.addEventListener('turbolinks:load', () => {
    // 增加 Query system event
    $('#query-table').hide()
    $('#Add_food_record_type').hide()
    $('#daliy-food').hide()
    $('#recommend-food').hide()
    search_item()           
    deleteEvent()
    editEvent()
    search()
    search_add()
    endsearch()
    back_search()
    query_add()
    add_food_record_by_user()
    click_create_new_record_by_user()
    saveEvent()
    more()
    recommend()
    recommendAdd()
    end_recommend_search()
    recommendLike()
    // Now time and day
    let time = moment().format('lll');
    $('.daytime').html(time);
})

// search_food_item
function search_item(){
  $('.search_food_result').on('click','button',function(evt){
    $('#query-food').hide();
    let food_name = $(evt.target).parent().siblings('td:first').text()
    let food_calorie = $(evt.target).parent().siblings('td:first').next().text()
    $('#Add_food_record_type').remove()

     $('#Add_food_record').append( `
     <div class="form-row" >
     <div class="col-md-1 md-3"></div>
     <div class="col-md-3 mb-3 ">
      <label for="disabledTextInput">食物名稱</label>
      <input class="form-control" type="text" placeholder="${food_name}" readonly>
     </div>
     <div class="col-md-2 mb-3">
      <label for="disabledTextInput_1">卡洛里</label>
      <input class="form-control" type="text" placeholder="${food_calorie}" readonly>
     </div>
     <div class="col-md-1 mb-3">
      <label for="custom-select">份數</label>
      <select class="custom-select" id="foodqty">
          <option selected>1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
      </select>
     </div>
     <div class="col-md-2 mb-3">
      <label for="exampleFormControlInput1">型態</label>
      <select class="custom-select" id="foodtype">
          <option selected>早餐</option>
          <option value="1">午餐</option>
          <option value="2">晚餐</option>
          <option value="3">點心/其他</option>
      </select>
     </div>
     <div class="col-md-1 md-3">
       <label for="exampleFormControlInput1">加進去</label>
       <button type="submit" class="button is-success  is-light js-add" data-id="${evt.target.id}"><i class="fas fa-plus-square"></i></button>       
     </div>
     <div class="col-md-1 mb-3">
     <label for="exampleFormControlInput1">回搜尋</label>
     <button class="button  is-link is-light is-return" data-id="return_food"><i class="fas fa-undo-alt"></i></button>
     </div>
     </div>
     `); // 增加使用者體驗 並接收 食物數量 / 型態
  })

}

// search food function
function search(){
  $('.form-row').on('click','.js-search',function(evt){
    $('#query-table').show()
    $('#Add_food_record_type').hide()
    evt.stopPropagation();
    let searchfood_hash = {searchfood: $('#searchfood').val()}
    axios.get('http://localhost:5000/search_food.json', {params:{ search_food: $('#searchfood').val()}})
         .then( response => {
          let query_data = response.data.length
          let result = ""
          for ( var i = 0; i < query_data; i++) {
             result +=  `
            <tr class="search_food_result" id="${response.data[i].id}">
                 <td>${i+1}</td>
                 <td class="search_name">${response.data[i].name}</td>
                 <td class="search_calories">${response.data[i].calories}</td>
                 <td>${response.data[i].protein}</td>
                 <td>${response.data[i].fat_content}</td>
                 <td>${response.data[i].carbohydrate}</td>
                 <td><button data-id="${response.data[i].id}" class="fas fa-plus-square js-searchadd" ></button></td>
            </tr>
              `
          }
          $('#foodresult').html(result) 
         })
  })
}
// endsearch function 
function endsearch(){
  $('.form-row').on('click','.js-endsearch',function(evt){
    $('#query-table').hide()
    $('#Add_food_record_type').hide()
  })
}
// search_add record function 
function search_add(){
  $('.form-row').on('click','.js-searchadd',function(){
    $('#Add_food_record_type').hide()
    let search_food_id = this.dataset.id
    console.log(search_food_id)
    let search_food_name = $(this).parent().siblings('.search_name:eq(0)').text()
    let search_food_calorie = $(this).parent().siblings('.search_calories:eq(0)').text()
    
    console.log(search_food_name)
    console.log(search_food_calorie)

    $('#query-table').hide()
     $('#Add_food_record').append( `
     </br>
     <div class="form-row" >
     <div class="col-md-1 md-3"></div>
     <div class="col-md-3 mb-3 ">
      <label for="disabledTextInput">食物名稱</label>
      <input class="form-control" type="text" placeholder="${search_food_name}" readonly>
     </div>
     <div class="col-md-2 mb-3">
      <label for="disabledTextInput_1">卡洛里</label>
      <input class="form-control" type="text" placeholder="${search_food_calorie}" readonly>
     </div>
     <div class="col-md-1 mb-3">
      <label for="custom-select">份數</label>
      <select class="custom-select" id="foodqty">
          <option selected>1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
      </select>
     </div>
     <div class="col-md-2 mb-3">
      <label for="exampleFormControlInput1">型態</label>
      <select class="custom-select" id="foodtype">
          <option selected>早餐</option>
          <option value="1">午餐</option>
          <option value="2">晚餐</option>
          <option value="3">點心/其他</option>
      </select>
     </div>
     <div class="col-md-1 md-3">
       <label for="exampleFormControlInput1">加進去</label>
       <button type="submit" class="button is-success  is-light js-add" data-id="${this.dataset.id}"><i class="fas fa-plus-square"></i></button>       
     </div>
     <div class="col-md-1 mb-3">
     <label for="exampleFormControlInput1">回搜尋</label>
     <button class="button  is-link is-light is-return" data-id="return_food"><i class="fas fa-undo-alt"></i></button>
     </div>
     </div>
     `); 
     // 增加使用者體驗 並接收 食物數量 / 型態
  })
}
// back_search function
function back_search(){
  $('.form-row').on('click','.is-return', function(){
    $(this).parent().parent('.form-row').remove()
    $('#query-table').show();
    $('#Add_food_record_type').hide()
  })
}
function add_food_record_by_user(){
  $('#Add_food_record_by_user').on('click', function(){
    $('#query-table').hide()
    $('#Add_food_record_type').show()
    let result = ""
    let temp = result + `
    <div class="form-row" >
    <div class="col-md-1 mb-3">
    </div>
    <div class="col-md-3 mb-3 ">
      <label for="exampleFormControlInput1">食物名稱</label>
      <input type="text" class="form-control" id="foodname"  placeholder="食物名稱">
    </div>
    <div class="col-md-2 mb-3">
      <label for="exampleFormControlInput1">卡洛里</label>
      <input type="text" class="form-control" id="foodcalories"  placeholder="卡洛里">
    </div>
    <div class="col-md-2 mb-3">
    <label for="custom-select">份數</label>
    <select class="custom-select" id="foodqty">
        <option selected>1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
    </select>
    </div>
    <div class="col-md-2 mb-3">
    <label for="exampleFormControlInput1">型態</label>
    <select class="custom-select" id="foodtype">
    <option selected>早餐</option>
    <option value="1">午餐</option>
    <option value="2">晚餐</option>
    <option value="3">點心/其他</option>
    </select>
    </div>
    <div class="col-md-1 mb-3">
    <label for="exampleFormControlInput1">加進去</label>
    <button class="button is-success is-small is-light is-add" data-id="Add_food_data_by_user"><i class="fas fa-plus-square"></i></button>
    </div>
    </div>
  ` 
  $('#Add_food_record_type').html(temp)

  })
}

// Add New food data
function click_create_new_record_by_user(){
  $('.form-row').on('click','.is-add', function(evt){
    evt.stopPropagation();
    console.log(this.dataset.id)
   let foodname=$('#foodname').val();
   let foodcalories=$('#foodcalories').val();
   let foodqty=$("#foodqty :selected").text();
   let foodtype=$("#foodtype :selected").text();
   let food_hash = {
      food_id     : 0,
      food_name   : foodname,
      food_calories: foodcalories,
      food_qty    : foodqty,
      food_type   : foodtype
       }
       console.log(food_hash)
       $(this).parent().parent('.form-row').remove()
   axios.post("hhttp://localhost:5000/food_records", food_hash)
        .then( response => {
          console.log('response=>',response);
            let pre_time =  moment().format('LT'); 
                $('#dailyfood').append(
                  `
                  <tr class="daily_food_result" >
                    <td> <button class="button is-success is-small is-light is-rounded "><i class="fab fa-hotjar"></i>New</button></td>
                      <td> ${pre_time} </td>
                      <td class="type">${response.data.eat_type}</td>                  
                      <td class="name">${response.data.name}</td>
                      <td class="qty"> ${response.data.qty}</td>
                      <td class="foodsum"> ${response.data.total_calorie}</td>
                      <td>
                        <button data-id="${response.data.id}" class="button is-warning is-small is-light js-edit"><i class="fas fa-pencil-alt"> </i></button>
                        <button data-id="${response.data.id}" class="button is-danger is-small is-light js-del"><i class="fas fa-trash"> </i></button>
                    </td>
                  </tr>
                  `
                )
                let total = Number($('.totalsum').text())
                let daily_delta= Number($('.tdee').text())
                count_plus()
                let newtotal= (total + Number(response.data.total_calorie)).toFixed(2)
                let new_daily_delta = (newtotal - daily_delta).toFixed(2)
                $('.sum_message').text(newtotal)
                $('.totalsum').text(newtotal)
                $('.delta_message').text(new_daily_delta)                
        })
   
})
}

function count_plus(){
  let count = Number($('.totalcount').text())
  console.log(count)
  let newcount = count + 1
  $('.totalcount').text(newcount)
  $('.count_message').text(newcount)
  console.log(newcount) 
}
function count_minus(){
  let count = Number($('.totalcount').text())
  console.log(count)
  let newcount = count - 1
  $('.totalcount').text(newcount)
  $('.count_message').text(newcount)
  console.log(newcount) 

}

// Edit daily record data 
function editEvent(){
  $('#daliy-food').on('click','.js-edit',function(evt){
    console.log(this)
    $(this).attr('disabled', 'disabled')
    alert(this.dataset.id);
    let edit_food_id = this.dataset.id
    let edit_food_qty = $(this).parent().siblings('.qty:eq(0)').text()
    let edit_food_name = $(this).parent().siblings('.name:eq(0)').text()
    let edit_food_calorie = $(this).parent().siblings('.foodsum:eq(0)').text()
    let edit_food_type = $(this).parent().siblings('.type:eq(0)').text()
    $('#Edit_food_record').append( `
    <div class="form-row" >
    <div class="col-md-1 md-3 ">
    </div>
    <div class="col-md-3 mb-3 ">
    <label for="disabledTextInput">食物名稱</label>
    <input class="form-control" type="text" placeholder="${edit_food_name}" readonly>
    </div>
    <div class="col-md-2 mb-3">
    <label for="disabledTextInput_1">卡洛里</label>
    <input class="form-control" type="text" placeholder="${edit_food_calorie}" readonly>
    </div>
    <div class="col-md-2 mb-3">
         <label for="custom-select">份數 : ${edit_food_qty} </label>
         <select class="custom-select" id="editfoodqty">
             <option selected>1</option>
             <option value="1">2</option>
             <option value="2">3</option>
             <option value="3">4</option>
             <option value="4">5</option>
         </select>
    </div>
    <div class="col-md-3 mb-3">
         <label for="exampleFormControlInput1">型態: ${edit_food_type}</label>
         <select class="custom-select" id="editfoodtype">
             <option selected>早餐</option>
             <option value="1">午餐</option>
             <option value="2">晚餐</option>
             <option value="3">點心/其他</option>
         </select>
    </div>
    <div class="col-md-1 mb-3">
    <label for="exampleFormControlInput1">Save</label>
    <button data-id="${edit_food_id}" class="button is-success is-small is-light js-save"><i class="fas fa-save"> </i></button>
    </div>
    </div>
    `)
    search()
    add_food_record_by_user()
 })
}

// Save edit daily record data function 
function saveEvent(){
  $('.form-row').on('click','.js-save',function(evt){
    let editfoodqty=$("#editfoodqty :selected").text();
    let editfoodtype=$("#editfoodtype :selected").text();
    let editfood_hash = {
                          edit_id : `${this.dataset.id}`,
                          edit_qty: editfoodqty,
                          edit_type: editfoodtype}
    // console.log(editfood_hash)
    $(`.js-edit[data-id="${this.dataset.id}"]`).removeAttr('disabled')
    $(this).parent().parent('.form-row').remove()
    let before_edit_sum = $(`.js-edit[data-id="${this.dataset.id}"]`).parent().siblings('.foodsum:eq(0)').text()
    axios.patch(`http://localhost:5000/food_records/${this.dataset.id}`, editfood_hash)

         .then( response => {
              // console.log('response=>',response);
              // console.log(response.data)
              let edit_sum = response.data.total_calorie
              let origin_sum = Number($(`.js-edit[data-id="${this.dataset.id}"]`).parent().siblings('.foodsum:eq(0)').text())
              $(`.js-edit[data-id="${this.dataset.id}"]`).parent().siblings('.foodsum:eq(0)').text(edit_sum)
              $(`.js-edit[data-id="${this.dataset.id}"]`).parent().siblings('.type:eq(0)').text(editfoodtype)
              $(`.js-edit[data-id="${this.dataset.id}"]`).parent().siblings('.qty:eq(0)').text(editfoodqty)
              let total = Number($('.totalsum').text())
              let daily_delta= Number($('.tdee').text())
              let new_sum = (total - origin_sum + Number($(`.js-edit[data-id="${this.dataset.id}"]`).parent().siblings('.foodsum:eq(0)').text())).toFixed(2)
              let new_daily_delta = (new_sum - daily_delta).toFixed(2)
              $('.totalsum').text(new_sum)
              $('.sum_message').text(new_sum)
              $('.delta_message').text(new_daily_delta)
              })
              add_food_record_by_user()
              search()
  })
}

// Delete daily record data function
function deleteEvent(){    
  $('#daliy-food').on('click','.js-del',function(evt){
    console.log(this.dataset.id);
    let delete_id = {id: this.dataset.id}
    axios.delete(`http://localhost:5000/food_records/${this.dataset.id}`, delete_id )
    .then( response => {
        console.log('response=>',response);
        let del_sum = $(`.js-del[data-id="${this.dataset.id}"]`).parent().siblings('.foodsum:eq(0)').text()
        let total = Number($('.totalsum').text())
        let daily_delta= Number($('.tdee').text())
        let new_sum = (total - Number(del_sum)).toFixed(2)
        let new_daily_delta = (new_sum - daily_delta).toFixed(2)
        $('.totalsum').text(new_sum)
        $('.sum_message').text(new_sum)
        $('.delta_message').text(new_daily_delta)
        count_minus()
        $(this).parent().parent('.daily_food_result').remove()
        })
  })

}

// Add Query-data to database 
function query_add(){
  $('.form-row').on('click','.js-add',function(evt){
    evt.stopPropagation();
    let foodqty=$("#foodqty :selected").text();
    let foodtype=$("#foodtype :selected").text();
    let food_hash = {
              food_id : `${this.dataset.id}`,
              food_qty: foodqty,
              food_type: foodtype
               }
    
     $(this).parent().parent('.form-row').remove()
    axios.post("http://localhost:5000/food_records", food_hash)
         .then( response => {
                console.log(response)
            let pre_time =  moment().format('LT'); 
                $('#dailyfood').append(
                  `
                  <tr class="daily_food_result" >
                      <td> <button class="button is-success is-small is-light is-rounded "><i class="fab fa-hotjar"></i>New</button></td>
                      <td> ${pre_time} </td>
                      <td class="type">${response.data.eat_type}</td>                  
                      <td class="name">${response.data.name}</td>
                      <td class="qty"> ${response.data.qty}</td>
                      <td class="foodsum"> ${response.data.total_calorie}</td>
                      <td>
                        <button data-id="${response.data.id}" class="button is-warning is-small is-light js-edit"><i class="fas fa-pencil-alt"> </i></button>
                        <button data-id="${response.data.id}" class="button is-danger is-small is-light js-del"><i class="fas fa-trash"> </i></button>
                      </td>
                  </tr>
                  `
                )
                let total = Number($('.totalsum').text())
                let daily_delta= Number($('.tdee').text())
                let newtotal= (total + Number(response.data.total_calorie)).toFixed(2)
                let new_daily_delta = (newtotal - daily_delta).toFixed(2)
                $('.totalsum').text(newtotal)
                $('.sum_message').text(newtotal)
                $('.delta_message').text(new_daily_delta)
                count_plus()
    })
  })
}

// more funtion 
function more(){
  $('.message-body').on('click','.js-more',function(evt){
    $('#daliy-food').toggle()
  }) 
}

// recommend function
function recommend(){
  $('.message-body').on('click','.js-recommend',function(evt){
    $('#recommend-food').toggle()
    axios.get('http://localhost:5000/search_food/random.json')
         .then( response => {
               var result = ""
              for ( var i = 0; i < 5; i++) {
                   result +=  `
                     <tr class="recommend_food_result" id="${response.data[i].id}">
                          <td>${i+1}</td>
                          <td class="recommend_name">${response.data[i].name}</td>
                          <td class="recommend_calories">${response.data[i].calories}</td>
                          <td>${response.data[i].protein}</td>
                          <td>${response.data[i].fat_content}</td>
                          <td>${response.data[i].carbohydrate}</td>
                          <td><button data-id="${response.data[i].id}" class="button is-success is-small is-light is-rounded js-recommend-add" ><i class="fas fa-plus-circle"></i></button>
                          <button class="button  is-danger is-small is-light is-rounded js-recommend-like" data-id="${response.data[i].id}"><i class="far fa-heart"></i></button>
                          </td>
                     </tr>
                          `}
              $('#recommend').html(result)
              })
    }) 
}

// recommend food add 
function recommendAdd(){
  $('.form-row').on('click','.js-recommend-add',function(){
    let recommend_food_id = this.dataset.id
    // console.log(recommend_food_id)
    let recommend_food_name = $(this).parent().siblings('.recommend_name:eq(0)').text()
    let recommend_food_calorie = $(this).parent().siblings('.recommend_calories:eq(0)').text()
    // console.log(recommend_food_name)
    // console.log(recommend_food_calorie)
    $('#Add_food_record').append( `
     </br>
     <div class="form-row" >
     <div class="col-md-1 md-3"></div>
     <div class="col-md-3 mb-3 ">
      <label for="disabledTextInput">食物名稱</label>
      <input class="form-control" type="text" placeholder="${recommend_food_name}" readonly>
     </div>
     <div class="col-md-2 mb-3">
      <label for="disabledTextInput_1">卡洛里</label>
      <input class="form-control" type="text" placeholder="${recommend_food_calorie}" readonly>
     </div>
     <div class="col-md-1 mb-3">
      <label for="custom-select">份數</label>
      <select class="custom-select" id="foodqty">
          <option selected>1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
      </select>
     </div>
     <div class="col-md-2 mb-3">
      <label for="exampleFormControlInput1">型態</label>
      <select class="custom-select" id="foodtype">
          <option selected>早餐</option>
          <option value="1">午餐</option>
          <option value="2">晚餐</option>
          <option value="3">點心/其他</option>
      </select>
     </div>
     <div class="col-md-1 md-3">
       <label for="exampleFormControlInput1">加進去</label>
       <button type="submit" class="button is-success  is-light js-add" data-id="${this.dataset.id}"><i class="fas fa-plus-square"></i></button>       
     </div>
     <div class="col-md-1 mb-3">
     <label for="exampleFormControlInput1">結束</label>
     <button class="button  is-link is-light is-recommend" data-id="delete_food"><i class="far fa-trash-alt"></i></button>
     </div>
     </div>
     `); 
  })
}

// back_recommend list
function end_recommend_search(){
  $('.form-row').on('click','.is-recommend', function(){
    $(this).parent().parent('.form-row').remove()
  })
}

function recommendLike(){
  $('.form-row').on('click','.js-recommend-like',function(){
    $(this).children().removeClass("far")
    $(this).children().addClass("fas")
})
}
