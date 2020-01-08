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
import echarts from 'echarts/dist/echarts.common.js'
//

document.addEventListener('turbolinks:load', () => {
  const sport = new Vue({
    el: '#sport',
    data :{
      user_id:0,
      message : "",
      premessage:"",
      weight : "",
      user_info:{},
      min: 0,
      sports:[],
      daily_sport:[],
      daily_sum :0,
      daily_count:0,
      currentTime: null,
      currentDay: null,
      tempindex:[],
      editstatus:[],
      savestatus:[],
      foodintention:"",
      sportintention:"",
      tdee:0,
      member_status:false,
      search_status:false,
      daily_record_status:false,
    },
    methods: {
      submit: function(){
        var self = this;
        if (this.member_status===true && this.premessage !== this.message){
          axios.get('http://localhost:5000/search_sport.json',{
                   params:{ search_sport: this.message}})
               .then(function(response){
                  if (response.data.length ===0){alert("沒有資料喔!")}else{
                      self.search_status = true;
                      self.premessage=self.message
                        let search_sport = response.data
                        self.sports=[];
                        for (var i in search_sport ){
                            self.sports.push(search_sport[i])
                      }
                  }
                })        
        }else if(this.member_status===true && this.premessage === this.message){ alert("不要重複搜尋!!!!")
        }else{alert("還不是會員喔!!! 先登入吧")}
             },
      sport_record(idx){
        let  sport_hash = {
          id :  this.sports[idx].id ,
          min:  this.min,
          weight: this.weight,
          consume: this.sports[idx].computed,
          user_id: this.user_id}
        // 將紀錄資料送至後端資料庫
        axios.post("http://localhost:5000/exercise_records",sport_hash)
             .then(function(response){})
        this.daily_sport.push({
          id: this.sports[idx].id ,
          name: this.sports[idx].name,
          weight: this.weight,
          min: Number(this.min).toFixed(1),
          consume: this.sports[idx].consume,
          totalconsum: this.sports[idx].computed,
          created_at: moment().calendar()
        })
        this.editstatus[this.daily_count]=false 
        this.daily_count += 1;
        this.daily_sum += Number(this.sports[idx].computed)
      },
      updateCurrentTime() {
        this.currentTime = moment().format('LTS');
        this.currentDay = moment().format("MMM Do YY");
      },
      edit_record(index){
        if(this.editstatus[index]===false){
          alert("吃了誠實豆沙包要修改時間了嗎?")
          this.editstatus[index] = true
          this.tempindex[index] = this.daily_sport[index].min
        }else{ alert("不要在按了!!! You r in Edit status")}
      },
      delete_record(index){
        alert("確定要刪除這筆資料嗎???")
        let delete_id = { id : this.daily_sport[index].id }
        let delete_index = index ;
        console.log(index)
        // console.log(deletedata)
        this.daily_sum = Number(this.daily_sum) - Number(this.daily_sport[index].totalconsum)
        axios.delete(`http://localhost:5000/exercise_records/${this.daily_sport[index].id}`, delete_id)
             .then(function(response){
             })
        this.daily_sport = this.daily_sport.filter(function(item, index, array){
          return index !== delete_index ;       // 取得大於五歲的
        });
        this.daily_count = this.daily_count -1 
      },
      update_record(index){
        if (Number(this.daily_sport[index].min)>=1){
          alert("確定一切都沒問題了嗎?")
          this.editstatus[index] = false
          let tempsum =Number(this.daily_sum)- Number(this.daily_sport[index].totalconsum)
          let newtotalconsum = (Number(this.daily_sport[index].consume)*Number(this.daily_sport[index].min)).toFixed(2)
          let newdaily_sum = (Number(newtotalconsum) + Number(tempsum)).toFixed(2)
          console.log(newdaily_sum)
          this.daily_sport[index].totalconsum = newtotalconsum
          this.daily_sum = newdaily_sum
          let update_daily = { 
                               id : this.daily_sport[index].id,
                               min: this.daily_sport[index].min,
                               totalconsum: newtotalconsum }
          axios.patch(`http://localhost:5000/exercise_records/${this.daily_sport[index].id}`, update_daily)
               .then(function(response){
                 console.log(response)
               })
        } else{
          alert("分鐘數必須要大於1 min")
        }
      },
      end_search(){
        this.premessage="";
        this.search_status=false;
      },
      more_record(){
        this.daily_record_status = !this.daily_record_status
      }
    },
    computed: {
      consume(){
        let search_length = this.sports.length
        for (var i=0; i<search_length;i++){
          let consume = ((this.min*Number(this.weight)*(Number(this.sports[i].consume)))/30).toFixed(2)
          this.sports[i].computed = consume
        }
      },
    },
    created() {
      // 當前時間
      this.currentTime = moment().format('LTS');
      this.currentDay = moment().format("MMM Do YY");
      setInterval(() => this.updateCurrentTime(), 1 * 1000);
      // User information
      var self =this;
      axios.get('http://localhost:5000/blogs/new.json')
           .then(function(response){
            if (response.data.member_exist === true){
                 self.user_info = response.data
                 self.weight    = response.data.weight
                 self.user_id   = response.data.user_id
                 self.member_status = true
              if (self.user_id !== 0 ){
                  axios.get('http://localhost:5000/search_sport.json',{params:{ member_id: self.user_id}})
                       .then(function(response){
                          let daily_sport = response.data
                          console.log(daily_sport)
                         for (var i in daily_sport ){
                          self.daily_sport.push(daily_sport[i])
                          var NowDate = new Date(daily_sport[i].created_at)
                          self.editstatus[i]=false
                          self.savestatus[i]=false
                          self.daily_sport[i].created_at = moment(NowDate).calendar(); // 時間格式轉換
                        }
                        self.daily_count = daily_sport.length
                        for (var i=0; i<self.daily_count;i++){
                           self.daily_sum = Number(daily_sport[i].totalconsum) + self.daily_sum
                        }
                  })
                  axios.get(`http://localhost:5000/blogs/${self.user_id}/secret`)
                       .then(function(response){
                         self.foodintention  = response.data.foodintention;
                         self.sportintention = response.data.sportintention;
                         self.tdee           = response.data.tdee;})   
              }else{}
            }else{} 
            })
           .catch((error) => { console.error(error) })
    },
  })
})

document.addEventListener('turbolinks:load', () => {
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
      moreshow:false,
      member_status:false
    },
    methods: {
      lookfor: function(){
        if (this.member_status === true){
                  let physical_hash = {
                             Height: this.Height,
                             Weight: this.Weight,
                             Gender: this.Gender,
                             Age: this.Age}
            var physical_validate = Object.values(physical_hash).every(function(item, index, array){
              return item !== '' // 當全部 item all exist  才能回傳 true
            });
            if (physical_validate === true) {
              var self = this;
              axios.post('http://localhost:5000/blogs', physical_hash)
              .then(function(response){
                let body = response.data
                self.BMI =body.bmi;
                self.BMI_range=body.bmi_range;
                self.Ree=body.ree;
                self.BMR=body.bmr;
                })
                .catch((error) => {})
            } else {
              alert('有資料還沒填! 看到紅色框的記得填')
            }
        }else{
          alert("還沒登入喔!! 沒有登入不能使用喔!")
        }
      },
      more: function(){
         this.moreshow = !this.moreshow
      },
      update: function(){
        let update_physical_data = { update_height:  this.Height,
                                     update_weight:  this.Weight,
                                     update_gender:  this.Gender,
                                     update_age   :  this.Age,}
        var update_physical_validate = Object.values(update_physical_data).every(function(item, index, array){
          return item !== '' // 當全部 item all exist  才能回傳 true
        });
        if (this.member_status === true){
          if(update_physical_validate === true){
             axios.patch(`http://localhost:5000/blogs/${this.user_info.user_id}`, update_physical_data)
                  .then(function(response){
                          console.log(response)})            
          }else{
            alert("資料有空白喔! 認真填完再送")
          }          
        }else{
          alert("還不是會員喔!!! 不要亂寫資料 ")
        }
      },
      add_tdee: function(){
        let intention = { eat  : this.eatintention,
                          sport: this.sportintention,
                          tdee : this.TDEE}
        if (this.member_status === true){
             axios.patch(`http://localhost:5000/blogs/${this.user_info.user_id}/tdee`, intention)
                  .then(function(response){})                     
        }else{}
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
      showResult() {
        return (this.BMI && this.BMI_range && this.Ree && this.BMR)
      }
    },
    created() {
      var self= this;
      axios.get('http://localhost:5000/blogs/new.json')
           .then(function(response){
            if (response.data.member_exist === true){
              self.user_info = response.data
              self.Height = response.data.height
              self.Weight = response.data.weight
              self.Gender = response.data.gender
              self.Age    = response.data.age 
              self.member_status = true
              console.log(self.user_info)
            }
           })
           .catch(function (error) {
             console.log(error)
           })
    }         
  })
})

document.addEventListener('turbolinks:load', () => {
  const food_data = new Vue({
    el: '#food_data',
    data:{
      user_id:0,
      data_type:"",
      member_status:false,
    },
    methods:{
      jsday:function(){},
      jsweek:function(){},
      jsmonth: function(){},
    },
    created(){  
      var self = this;
      axios.get('http://localhost:5000/blogs/new.json')
           .then(function(response){
            if (response.data.member_exist === true){
                 self.user_id   = response.data.user_id
                 self.member_status = true
                 if (self.user_id !== 0 ){
                    // day
                      axios.get('http://localhost:5000/member/foodday')
                           .then(function(response){
                                console.log(response)
                                })
                           .catch((error) => {})
                      axios.get('http://localhost:5000/member/sportday')
                           .then(function(response){
                            console.log(response)
                            })
                           .catch((error) => {})
                   //week
                      axios.get('http://localhost:5000/member/foodweek')
                           .then(function(response){
                                 console.log(response)
                                })
                           .catch((error) => {})
                      axios.get('http://localhost:5000/member/sportweek')
                           .then(function(response){
                                console.log(response)
                              })
                           .catch((error) => {})
                   //month
                      axios.get('http://localhost:5000/member/foodmonth')
                           .then(function(response){
                                 console.log(response)
                                })
                           .catch((error) => {})  
                      axios.get('http://localhost:5000/member/sportmonth')
                           .then(function(response){
                            console.log(response)
                                })
                           .catch((error) => {})  
                      }
            }else{}
           })
    }

  })
})
