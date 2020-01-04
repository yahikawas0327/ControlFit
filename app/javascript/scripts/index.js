
// console.log('hi')

// import 'bulma/css/bulma.css'
// import  '@fortawesome/fontawesome-free/css/all.css'

// import  './application.scss'
import './application.js'
import $ from 'jquery'
import axios from 'axios-on-rails'
import moment from "moment";
import { element } from 'prop-types';

// const axios = require('axios');
 
document.addEventListener('turbolinks:load', () => {
    // 新增每日食物資料 JQuery  
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
      axios.post("http://localhost:3000/food_records", food_hash)
           .then( response => {
                  console.log('response=>',response);
                  // window.location.reload();
                  // $( "#daliy-food" ).load("search_food.html #daliy-food");
                  deleteEvent()
                  editEvent()
                  // $( "#Add_food_record_by_user" ).load("search_food.html #Add_food_record_by_user");
                  // $( ".js-edit").load("search_food.html .js-edit");
                  
      })
    }) // 將資料傳送至後端 傳送 id / qty / type
 
    //----------------------------------------------------------
    $('.form-row').on('click','.is-return', function(){
      $(this).parent().parent('.form-row').remove()
      $('#query-food').show();
    })

    $('#Add_food_record_by_user').on('click', function(){
     $('#query-food').remove();
     $('#Add_food_record').remove()  
     $('#Add_food_record_type').append(`
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
   `)
    }) // Create New food record data

    $('.form-row').on('click','.is-add', function(){
        // evt.stopPropagation();
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
       axios.post("http://localhost:3000/food_records", food_hash)
            .then( response => {
              console.log('response=>',response);
              $( "#daliy-food" ).load( "search_food.html #daliy-food" )
            })

    }) // Add New food data
        
    // Edit daily record data function 
    function editEvent(){
      $('.daily_food_result').on('click','.js-edit',function(evt){
        console.log(this)
        $(this).attr('disabled', 'disabled')
        alert(this.dataset.id);
        evt.stopPropagation();
        let edit_food_id = this.dataset.id
        $('#Add_food_record_type').remove()
        $('#query-food').remove();
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
     })
    }
    // Save edit daily record data function 
    $('.form-row').on('click','.js-save',function(evt){
      // console.log(this.dataset.id)
      let editfoodqty=$("#editfoodqty :selected").text();
      let editfoodtype=$("#editfoodtype :selected").text();
      let editfood_hash = {
                            edit_id : `${this.dataset.id}`,
                            edit_qty: editfoodqty,
                            edit_type: editfoodtype}
      // console.log(editfood_hash)
      $(`.js-edit[data-id="${this.dataset.id}"]`).removeAttr('disabled')
      $(this).parent().parent('.form-row').remove()
      // $(`.js-edit`).filter(`[data-id="${this.dataset.id}"]`).removeAttr('disabled')
      let before_edit_sum = $(`.js-edit[data-id="${this.dataset.id}"]`).parent().siblings('.foodsum:eq(0)').text()
      // console.log(before_edit_sum)
      axios.patch(`http://localhost:3000/food_records/${this.dataset.id}`,editfood_hash)
           .then( response => {
                // console.log('response=>',response);
                // console.log(response.data)
                let edit_sum = response.data.total_calorie
                let origin_sum = Number($(`.js-edit[data-id="${this.dataset.id}"]`).parent().siblings('.foodsum:eq(0)').text())
                $(`.js-edit[data-id="${this.dataset.id}"]`).parent().siblings('.foodsum:eq(0)').text(edit_sum)
                $(`.js-edit[data-id="${this.dataset.id}"]`).parent().siblings('.type:eq(0)').text(editfoodtype)
                $(`.js-edit[data-id="${this.dataset.id}"]`).parent().siblings('.qty:eq(0)').text(editfoodqty)
                let total = Number($('.totalsum').text())
                let new_sum = total - origin_sum + Number($(`.js-edit[data-id="${this.dataset.id}"]`).parent().siblings('.foodsum:eq(0)').text())
                $('.totalsum').text(new_sum)
                })
    })

    // Delete daily record data function
    function deleteEvent(){    
  
      $('.daily_food_result').on('click','.js-del',function(evt){
        console.log(this.dataset.id);
        let delete_id = {id: this.dataset.id}
        axios.delete(`http://localhost:3000/food_records/${this.dataset.id}`, delete_id )
        .then( response => {
            console.log('response=>',response);
            $(this).parent().parent('.daily_food_result').remove()
            })
      })

    }
    deleteEvent()
    editEvent()

    // Now time and day
    let time = moment().format('lll');
    $('.daytime').html(time);
})










