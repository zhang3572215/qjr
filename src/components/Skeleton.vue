<template>
  <div class="skeleton page">
    <div class="skeleton-nav"></div>
	<!-- <div class='skeleton-classification'>
		<div class='skeleton-cfc-info'  v-for="i in 5">
		</div>
	</div> -->
	<div class='skeleton-meal'>
	    <div class='skeleton-meal-left'>
		</div>
		<div class='skeleton-meal-right'>
		   <div class='skeleton-meal-top'></div>
		   <div class='skeleton-meal-bottom'></div>
		</div>
	</div>
    <div class="skeleton-swiper"></div>
<!--    <ul class="skeleton-tabs">
      <li v-for="i in 8" class="skeleton-tabs-item"><span></span></li>
    </ul> -->
    <div class="skeleton-banner"></div>
   <!-- <div v-for="i in 6" class="skeleton-productions"></div> -->
  </div>
</template>

<script>
	export default{
		 name: "Skeleton"
	}
</script>
<style scoped>
  .skeleton {
    position: relative;
    height: 100vh;
    overflow: hidden;
    /* padding: 15px; */
    box-sizing: border-box;
    background: #fff;
	padding: 0 !important;
  }
  .skeleton-nav {
    height: 34%;
    background: #eee;
    margin-bottom: 15px;
  }
  .skeleton-classification{
	  margin: 0 auto;
	  width: 90%;
	  height: 17%;
	  display: flex;
	  display: -webkit-box;
	  display: -webkit-flex;

	  align-items: center;
	  -webkit-box-align: center;
	  -webkit-align-items: center;
	  transform: translateY(-20%);
	  -webkit-transform: translateY(-20%);
  }
   .skeleton-classification .skeleton-cfc-info{
	  width:15%;
	  height: 50%;
	  background: #eee;
	  border-radius: 10px;
	  margin-right: 5%;
  }
    .skeleton-classification .skeleton-cfc-info:last-child{
		margin-right: 0;
	}
	.skeleton-meal{
		 height: 32%;
		 width: 90%;
		 /* margin: -5% auto 0 auto; */
		  margin: -2% auto 0 auto;
	}
	.skeleton-meal  .skeleton-meal-left{
		  width: 50%;
		  height: 100%;
		  background: #eee;
		  float: left;
		  border-radius: 6px;
	}
	.skeleton-meal  .skeleton-meal-right{
		  width: 47%;
		  height: 100%;
		  float: right;
	}
   .skeleton-meal  .skeleton-meal-right	.skeleton-meal-top{
	       height: 48%;
		   float: right;
		   width: 100%;
		   background: #eee;
	}
	.skeleton-meal  .skeleton-meal-right	.skeleton-meal-bottom{
		       height: 48%;
			   float: right;
			   width: 100%;
			   background: #eee;
			   margin-top: 4%;
		}
  .skeleton-swiper {
	  width: 90%;
	  margin: 6% auto 0  auto ;
    height: 15%;
    background: #eee;
    margin-bottom: 15px;
  }
  .skeleton-tabs {
    list-style: none;
    padding: 0;
    margin: 0 -15px;
    display: flex;
    flex-wrap: wrap;
  }
  .skeleton-tabs-item {
    width: 25%;
    height: 55px;
    box-sizing: border-box;
    text-align: center;
    margin-bottom: 15px;
  }
  .skeleton-tabs-item span {
    display: inline-block;
    width: 55px;
    height: 55px;
    border-radius: 55px;
    background: #eee;
  }
  .skeleton-banner {
    height: 60px;
	width: 100vw;
    background: #eee;
	position: fixed;
	bottom: 0;
	/* margin-top: 40px; */
    /* margin-bottom: 15px; */
  }
  .skeleton-productions {
    height: 20px;
    margin-bottom: 15px;
    background: #eee;
  }

  .skeleton {
    /* padding: 10px; */
  }

  .skeleton .skeleton-head,
  .skeleton .skeleton-title,
  .skeleton .skeleton-content {
    background: rgb(194, 207, 214);
  }

  .skeleton-head {
    width: 100px;
    height: 100px;
    float: left;
  }

  .skeleton-body {
    margin-left: 110px;
  }

  .skeleton-title {
    width: 500px;
    height: 60px;
    transform-origin: left;
    animation: skeleton-stretch .5s linear infinite alternate;
  }

  .skeleton-content {
    width: 260px;
    height: 30px;
    margin-top: 10px;
    transform-origin: left;
    animation: skeleton-stretch .5s -.3s linear infinite alternate;
  }

  @keyframes skeleton-stretch {
    from {
      transform: scalex(1);
    }
    to {
      transform: scalex(.3);
    }
  }
</style>
