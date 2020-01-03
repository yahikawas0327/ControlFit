import Vue from 'vue'

new Vue({
  el: '#BMI',
  data: {
    height: null,
    weight: null
  },
  computed: {
    bmi(){
      weight = Number(this.weight);
      height = Number(this.height) / 100;
      bmi = weight / (height * height);
      return bmi || 0;
    }
  }

})