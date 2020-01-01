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
//  .

document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    el: '#app',
    data :{
      message : "",
      weight : "",
      min: 0,
      sports:[],
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
                    console.log(search_sport[i])
                    console.log(i)
                  }
                })        
             },
      
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
  })
})