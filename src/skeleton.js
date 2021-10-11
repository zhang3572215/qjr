import Vue from 'vue';
import Skeleton1 from './components/Skeleton.vue';
import Skeleton2 from './components/skeleton2.vue';
// import remConfig from './rem.js'
// remConfig()
export default new Vue({
  components: {
    Skeleton1,
	Skeleton2 
  },
   // render: h => h(Skeleton1),
     template: `
              <skeleton1 id="skeleton1" style="display:none"/>
       `

});
