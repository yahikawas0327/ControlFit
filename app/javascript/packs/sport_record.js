import Vue from 'vue/dist/vue.esm'
// import SportRecord from '../sport_record.vue'
import TurbolinksAdapter from 'vue-turbolinks'

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
      user_info:{},
      min: 0,
      sports:[],
      daily_sport:[],
      daily_sum :0,
      daily_count:0,
      currentTime: null,
      currentDay: null,
      normalshow:[],
    },
    methods: {
      submit: function(){
        var self = this;

        axios.get('http://localhost:3000/search_sport',{
                   params:{ search_sport: this.message}
                 })
             .then(function(response){
                  let search_sport = response.data
                  for (var i in search_sport ){
                    self.sports.push(search_sport[i])
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
      },
      edit_record(index){
        alert("吃了誠實豆沙包要修改時間了嗎?")
        this.normalshow[index] = false
        console.log("edit")
        console.log(index)
      },
      delete_record(index){
        console.log("delete")
        console.log(index)

      },
    },
    computed: {
      consume(){
        let search_length = this.sports.length
        for (var i=0; i<search_length;i++){
          let consume = ((this.min*Number(this.weight)*(Number(this.sports[i].consume)))/30).toFixed(2)
          this.sports[i].computed = consume
        }

      }
    },
    created() {
      // 當前時間
      this.currentTime = moment().format('LTS');
      this.currentDay = moment().format("MMM Do YY");
      setInterval(() => this.updateCurrentTime(), 1 * 1000);
      // User information
      var self =this;
      axios.get('http://localhost:3000/blogs',{params:{ id : 0}})
      .then(function(response){
        self.user_info = response.data
        self.weight    = response.data.weight
      })
      // 今天資料
      axios.get('http://localhost:3000/search_sport',{params:{ id : 0}})
           .then(function(response){
               let daily_sport = response.data
               console.log(daily_sport)
               for (var i in daily_sport ){
                self.daily_sport.push(daily_sport[i])
                var NowDate = new Date(daily_sport[i].created_at)
                self.normalshow[i]=true
                console.log(i)
                console.log(self.normalshow[i])
                self.daily_sport[i].created_at = moment(NowDate).calendar(); // 時間格式轉換
              }
              self.daily_count = daily_sport.length
              for (var i=0; i<self.daily_count;i++){
                 self.daily_sum = Number(daily_sport[i].totalconsum) + self.daily_sum
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
      user_info:{},
      Age:"",
      BMI:"",
      BMI_range:"",
      Ree:"",
      BMR:"",
      TDEE:0,
      selcct_v:'select is-success',
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

        var physical_validate = Object.values(physical_hash).every(function(item, index, array){
          return item !== '' // 當全部 item all exist  才能回傳 true
        });
        if (physical_validate === true) {
          alert('以上資料沒錯的話! 那就把確定按下去')
          var self = this;
          axios.post('http://localhost:3000/blogs', physical_hash)
          .then(function(response){
            let body = response.data
            self.BMI =body.bmi;
            self.BMI_range=body.bmi_range;
            self.Ree=body.ree;
            self.BMR=body.bmr;
           })
           .catch((error) => {
           })
        } else {
          alert('有資料還沒填! 看到紅色框的記得填')
        }
      },
      more: function(){
        this.moreshow = !this.moreshow
      },
    },
    computed: {
      exercise_choice(){
            let  exercise_factor=0     
            if (this.sportintention === '久坐'){
                this.exercise_factor = 1.2
            } else if (this.sportintention === '輕量活動') {
                this.exercise_factor = 1.375
            } else if (this.sportintention === '中度活動') {
                this.exercise_factor = 1.55
            } else if (this.sportintention === '高強度活動') {
                this.exercise_factor = 1.725
            } else if (this.sportintention === '極高強度活動') {
                this.exercise_factor = 1.9
            } else{
                this.exercise_factor = 1
            }
            this.TDEE = (Number(this.BMR)*Number(this.exercise_factor)).toFixed(1)
            return this.sportintention
      },
      food_choice(){
            if (this.eatintention === '維持體重'){
            } else if (this.eatintention === '增加肌肉') {
                this.TDEE = Number(this.TDEE) + 300
            } else if (this.eatintention === '減少脂肪') {
                this.TDEE = Number(this.TDEE) - 300
            } else {
            }
            return this.eatintention

      },
    },
    created() {
      var self= this;
      axios.get('http://localhost:3000/blogs',{params:{ id : 0}})
           .then(function(response){
             self.user_info = response.data
             self.Height = response.data.height
             self.Weight = response.data.weight
             self.Gender = response.data.gender
             self.Age    = response.data.age 
           })
    }         

  })
})