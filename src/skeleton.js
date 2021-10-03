import Vue from 'vue';
import Skeleton from './components/Skeleton.vue';
// import Skeleton2 from './components/skeleton2.vue';
// import remConfig from './rem.js'
// remConfig()
export default new Vue({
  components: {
    Skeleton
  },
   // render: h => h(Skeleton),
     template: `
        <div>
			<Skeleton id="skeleton"/>
        </div>
       `

});
