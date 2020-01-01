import Vue from 'vue/dist/vue.esm'
import NameCard from '../name_card.vue'

document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    el: '#app',
    components: { NameCard },
    mounted: function() {
        console.log(123);
    }
  })
})