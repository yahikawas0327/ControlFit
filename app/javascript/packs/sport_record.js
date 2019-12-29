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

document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    el: '#app',
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
               for (var i in daily_sport ){
                self.daily_sport.push(daily_sport[i])
                var NowDate = new Date(daily_sport[i].created_at)
                self.daily_sport[i].created_at = moment(NowDate).calendar(); // 時間格式轉換
              }
              self.daily_count = daily_sport.length
              for (var i=0; i<self.daily_count;i++){
                 self.daily_sum = Number(daily_sport[i].totalconsum) + self.daily_sum
                 console.log(self.daily_sum)
              }
      })


    },
  })
})