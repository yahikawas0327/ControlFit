// console.log('hi')

// import 'bulma/css/bulma.css'
// import  '@fortawesome/fontawesome-free/css/all.css'

// import  './application.scss'
import './application.js'
import $ from 'jquery'
import axios from 'axios-on-rails'
// const axios = require('axios');


// 新增每日食物資料 JQuery 

$(document).ready(function (){
    $('.search_food_result').on('click','button',function(evt){
        evt.stopPropagation();
        let food_hash = {
            food_id : `${evt.target.id}`
         }
         console.log(food_hash)
        axios.post("http://localhost:3000/food_records", food_hash)
         .then( response => {
            console.log('response=>',response); 
         })
        // console.log(food_hash)

    })
})



