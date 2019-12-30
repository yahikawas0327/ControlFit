import Vue from 'vue/dist/vue.esm'
// import SportRecord from '../sport_record.vue'

// ---Bootstrap Vue setting
import 'bulma'
import { func } from 'prop-types'
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
import 'bootstrap-vue/dist/bootstrap-vue.css'
//
import axios from 'axios'
Vue.prototype.$ajax = axios
//  
import moment from "moment";
//

document.addEventListener('turbolinks:load', () => {
  //  sport query system and daily sport reord system
  const sport = new Vue({
    el: '#sport',
    data :{
      message : "",
      weight : "",
      min: 0,
      sports:[],
      daily_sport:[],
      daily_sum :0,
      daily_count:0,
      currentTime: null,
      currentDay: null
    },
    methods: {
      submit: function(){
        var self = this;
        //將key-word 發送至後端撈資料
        axios.get('http://localhost:3000/search_sport',{
                   params:{ search_sport: this.message}
                 })
             .then(function(response){
                  let search_sport = response.data
                  for (var i in search_sport ){
                    self.sports.push(search_sport[i])
                    // console.log(search_sport[i])
                    // console.log(i)
                  }
                })        
             },
      sport_record(idx){
        let  sport_hash = {
          id :  this.sports[idx].id ,
          min:  this.min,
          weight: this.weight,
          consume: this.sports[idx].computed
        }
        console.log(sport_hash) 
        // 將紀錄資料送至後端資料庫
        axios.post("http://localhost:3000/exercise_records",sport_hash)
             .then(function(response){
                  console.log(response)
             })
        this.daily_sport.push({
          id: this.sports[idx].id ,
          name: this.sports[idx].name,
          weight: this.weight,
          min: Number(this.min).toFixed(1),
          totalconsum: this.sports[idx].computed,
          created_at: moment().calendar()
        })
        this.daily_count += 1;
        this.daily_sum += Number(this.sports[idx].computed)
      },
      updateCurrentTime() {
        this.currentTime = moment().format('LTS');
        this.currentDay = moment().format("MMM Do YY");
      }
    },
    computed: {
      consume(){
        let search_length = this.sports.length
        for (var i=0; i<search_length;i++){
          console.log(this.min)
          console.log(this.weight)
        let consume = ((this.min*Number(this.weight)*(Number(this.sports[i].consume)))/30).toFixed(2)
          this.sports[i].computed = consume
          console.log(this.sports[i].computed)
        }

      }
    },
    created() {
      // 當前時間
      this.currentTime = moment().format('LTS');
      this.currentDay = moment().format("MMM Do YY");
      setInterval(() => this.updateCurrentTime(), 1 * 1000);
  
      // 今天資料
      var self =this;
      axios.get('http://localhost:3000/search_sport', {params:{ id : 0}
               })
           .then(function(response){
               let daily_sport = response.data
              //  console.log(daily_sport )
               for (var i in daily_sport ){
                self.daily_sport.push(daily_sport[i])
                var NowDate = new Date(daily_sport[i].created_at)
                self.daily_sport[i].created_at = moment(NowDate).calendar(); // 時間格式轉換
              }
              self.daily_count = daily_sport.length
              for (var i=0; i<self.daily_count;i++){
                 self.daily_sum = Number(daily_sport[i].totalconsum) + self.daily_sum
                //  console.log(self.daily_sum)
              }
      })


    },
  })
  // 個人身體資訊
  const physical = new Vue({
    el: '#physical',
    data :{
      Height: "",
      Weight: "",
      Gender: "", // 取Gender選中的值
      Genders:[
        { text:'Man / 男', value:'Man'},
        { text:'Woman / 女', value:'Woman'}
      ],
      Age:"",
      BMI:"",
      BMI_range:"",
      Ree:"",
      BMR:"",
      eatintention:"",
      sportintention:"",
      moreshow:false
    },
    methods: {
      lookfor: function(){
        let physical_hash = {
          Height: this.Height,
          Weight: this.Weight,
          Gender: this.Gender,
          Age: this.Age}
        var self = this;
        axios.post('http://localhost:3000/blogs', physical_hash)
             .then(function(response){
               let body = response.data
               console.log(body)
               self.BMI =body.bmi;
               self.BMI_range=body.bmi_range;
               self.Ree=body.ree;
               self.BMR=body.bmr;
              })
      },
      more: function(){
        this.moreshow = !this.moreshow

      }
    },
    computed: {
    },
  })
})