<template>
	<div class='container'>
		<div class='contentss' v-if='typeFlag'>
			<div class='head'>
				<div class='head-left' @click="toBack">
					<img src="../assets/left-black.png" mode=""></img>
					<span>返回</span>
				</div>
				<div class='head-center'>
				  隐私政策
				</div>
				<div class='head-right'>
		         
				</div>
			</div>
		</div>
		<div class='head-show'  v-if='typeFlag'>
		</div>
		<div class='content-1'>
			<div class='title'>清洁人（以及下文提到的“我们”、“我们的”或“本app”）是由主体公司清洁人(厦门)信息科技有限公司提供的网络产品。</br>产品名称： 清洁人</br>产品类别：app
			</br>如果您决定使用我们产品提供的服务，本协议用于告知我们对于用户的隐私如何收集、使用和披露。</div>
			<div class='title-info'>
				如果您选择使用我们提供的服务，则表示您同意收集和使用与此政策相关的信息。我们收集的个人信息用于提供和改进服务。除非本隐私政策中另有说明，否则我们不会与任何人一起使用或分享您的信息。
			</div>
			<div class='title-info'>
				当您除非本隐私政策另有规定，否则本隐私政策中使用的术语与我们的条款和条件具有相同的含义，可在清洁人中访问。
			</div>
			<div class='title'>1、收集信息</div>
			<div class='title-info'>
				我们收集您提供给我们的部分或全部信息， 以及您使用网站和应用程序的数据， 但我们将主要使用收集的数据为您提供满意的服务， 并提高您的使用体验。
			</div>
				<div class='title'>1.1、设备和技术信息的收集</div>
			<div class='title-info'>
				我们可能会收集您使用我们的应用程序所需的数据， 我们可以维护和分析应用程序的功能, 并对应用程序的内容进行个性化设置。
				   我们自动获得有关您的设备的某些信息，包括 IP 地址，国家法典，时区会话开始/停止时间；IDFVs，语言；网络状态 (无线等)，浏览器插件类型和版本；平台，SDK 版本，时间戳；技术设备信息 (如设备型号和名称、操作系统名称和版本、
					、CPU 信息、存储大小、屏幕大小、固件、应用程序的软件 API 密钥标识符、推送通知令牌。虽然这些信息(如IDFV、IP地址)可能唯一地标识您的设备，但此信息并没有亲自识别您。某些立法 (如美国) 可以将您的设备唯一标识为个人信息的信息处理。
			</div>
			<div class='title'>1.2、常规个人信息收</div>
			<div class='title-info'>
				在使用我们的服务时，我们可能会要求您向我们提供可用于联系或识别您的某些个人身份信息（“个人数据”），个人身份信息可能包括但不限于：
			</div>
			<div  class='title-content'>
							  ①手机号码
			</div>
			<div  class='title-content'>
				②电子邮件地址
			</div>
			<div  class='title-content'>
				③所在住址详细信息
			</div>
			<div class='title'>2、如何使用收集的信息</div>
			<div class='title-info'>
				 清洁人将收集的数据用于以下其中的部分或全部目的：
			</div>
			<div  class='title-content'>
				①提供和维护服务
			</div>
			<div  class='title-content'>
				②通知您有关我们服务的更改
			</div>
			<div  class='title-content'>
				③允许您在选择时参与我们服务的互动功能
			</div>
			<div  class='title-content'>
			④为客户提供关怀和支持
			</div>
			<div  class='title-content'>
			⑤提供分析或有价值的信息，以便我们改进服务
			</div>
			<div  class='title-content'>
			⑥监控服务的使用情况
			</div>
			<div  class='title-content'>
			⑦检测，预防和解决技术问题
			</div>
			<div class='title-info'>
			当您通过移动设备访问服务时，我们可能会自动收集某些信息，包括但不限于您使用的移动设备类型，移动设备唯一ID，移动设备的IP地址，移动设备操作系统，您使用的移动互联网浏览器的类型，唯一的设备标识符和其他诊断数据（“使用数据”）。
			</div>
			<div class='title'>3、信息存储</div>
			<div class='title'>3.1、数据安全</div>
			<div class='title-info'>
			数据的安全性对我们很重要，但请记住，没有任何安全措施是完美的或不可渗透的。虽然我们努力使用商业上可接受的方式来保护您的个人数据，但我们无法保证其绝对的安全性。
			</div>
			<div class='title'>3.2、数据传输</div>
			<div class='title-info'>
				您的信息（包括个人数据）可能会被转移到您所在州，省，国家或其他政府管辖范围之外的计算机上，并且这些计算机的数据保护法可能与您所在司法管辖区的数据保护法不同。
				   如果您位于中国境外并选择向我们提供信息，请注意我们将数据（包括个人数据）传输到中国并在中国处理。
				   您同意本隐私政策，然后提交此类信息即表示您同意该转让。
			</div>
			<div class='title'>3.3、数据披露</div>
			<div class='title-info'>
				 清洁人可能会真诚地披露您的个人资料，相信此类行为是必要的：
			</div>
			<div  class='title-content'>
				①履行法律义务
			</div>
			<div  class='title-content'>
				②保护和捍卫本软件的权利或财产
			</div>
			<div  class='title-content'>
				③防止或调查与服务相关的可能的不当行为
			</div>
			<div  class='title-content'>
			④保护服务或公众用户的人身安全
			</div>
			<div  class='title-content'>
			⑤防止法律责任
			</div>
				<div class='title'>3.4、服务供应商</div>
			<div class='title-info'>
				我们可能雇用第三方（公司或个人）来促进我们的服务（“服务提供商”）。第三方代表我们提供服务，执行相关服务或协助我们分析服务的使用方式。 第三方只能代表我们访问您的个人数据以执行这些任务，并且有义务不将其用于任何其他目的。
			</div>
			<div class='title'>3.5、链接到其他网站</div>
			<div class='title-info'>
				我们的服务可能包含指向非我们运营的其他网站的链接。如果您点击第三方链接，您将被引导至该第三方的网站。我们强烈建议您查看您访问的每个站点的隐私政策。
				    我们无法控制任何第三方网站或服务的内容，隐私政策或做法，也不承担任何责任。
			</div>
			<div class='title'>4、删除信息</div>
			<div class='title-info'>
				当不再需要信息时，我们将使用合理的措施删除它，以保护信息不被未经授权的访问或使用。用户上传的内容如果涉嫌黄色、暴力不受欢迎内容我们将有权进行删除，用户可以在发现模块进行举报。
			</div>
			<div class='title'>5、保护信息</div>
			<div class='title-info'>
				我们已经实施了合理的安全措施，以保障收集信息的机密性、安全性和完整性，并防止未经授权的访问和使用违反本隐私政策的信息。虽然我们采取合理的努力，以保障您的信息在我们维护时依然安全，但请注意，没有任何安全措施是绝对安全的。
			</div>
			<div class='title'>6、与儿童有关的信息资料收集息</div>
			<div class='title-info'>
				我们非常重视对未成年人个人信息的保护。如果你是14周岁以下的未成年人，在使用我们的服务前，应确保事先取得监护人的同意，如果你是已满14不满18岁的未成年人，在使用我们服务前，应确保事先取得本人或监护人的同意。如果我们得知已收集了14周岁以下儿童的个人资料，我们会采取一切合理步骤，尽快删除有关资料。
				如果您知道您的孩子在未经您同意的情况下向我们提供了个人信息, 请与我们联系
			</div>
			<div class='title'>7、cookie技术</div>
			<div class='title-info'>
				我们使用cookie和类似的跟踪技术来跟踪我们服务上的活动并保留某些信息。
				</br>Cookie是包含少量数据的文件，可能包含匿名唯一标识符。Cookie会从网站发送到您的浏览器并存储在您的设备上。还使用其他跟踪技术比如信标，标签和脚本等，用于收集和跟踪信息以及改进和分析我们的服务。
				  </br>您可以指示您的浏览器拒绝所有cookie或指示何时发送cookie。但是，如果您不接受cookie，您可能无法使用我们服务的某些部分。
				   </br>我们使用的Cookie示例：
			</div>
			<div  class='title-content'>
				①会话Cookie。我们使用Session Cookies来运营我们的服务。
			</div>
			<div  class='title-content'>
				②偏好Cookie。我们使用首选项Cookie来记住您的偏好和各种设置。
			</div>
			<div  class='title-content'>
				③安全Cookies。出于安全考虑，我们使用安全Cookie。
			</div>
			<div class='title'>8、第三方服务条款</div>
			<div class='title-info'>
				•位置服务
			</div>
			<div class='title-info'>
				我们产品使用Gps定位权限
			</div>
			<div class='title'>9、统计分析</div>
			<div class='title-info'>
				我们产品使用第三方统计，您需要一并同意第三方服务商提供的隐私政策；链接到应用程序使用的第三方服务提供商的隐私政策
			</div>
			<div class='title'>10、退出</div>
			<div class='title-info'>
			    根据本隐私政策，您可以从您的每台设备上卸载所有应用程序并停止使用本网站，从而永远自由地选择不参与将来在软件内收集您的个人信息。
			</div>
			<div class='title'>11、支持</div>
			
			<div class='title-info'>
				如果您对本隐私政策有任何疑问，请联系我们：
			    </br>通过电话：4008290037</p>
			</div>
				<div class='title'>12、对此隐私策略的更改</div>
			<div class='title-info'>
				我们可能会不时更新我们的隐私政策。我们将通过在此页面上发布新的隐私政策来通知您任何更改。建议您定期查看本隐私政策以了解任何变更。本隐私政策的更改在此页面上发布时生效。
			</div>
			
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				typeFlag:true
			}
		},
		props:['flag'],
		methods:{
			toBack(){
				if(this.flag=='首页'){
					this.$emit('toCollagePricacy')
				}else{
					this.$router.go(-1)
				}
				
			}
		},
		created() {
			if(window.localStorage.getItem('wxBrowser')){
					this.typeFlag=false
			}
		}
	}
</script>

<style scoped>
	.container{
		width: 100%;
		height: 100%;
		background: #fff;
		 z-index: 100000;
		 position: fixed;
		 top: 0;
		 overflow: scroll;
	}
	.contentss {
			position: fixed;
			top: 0;
			z-index: 100;
			width: 100vw;
		}
	
	.head {
			padding-top: 0.4rem;
			height: 0.88rem;
			width: 100vw;
			/* background: #36a8fa; */
			background: #fff;
			text-align: center;
			/* position: relative; */
			box-sizing: content-box;
			/* color:#fff; */
			font-size: 0.33rem;
			z-index: 20;
		}
	
	/* 	.head-left {
			height: 100%;
			line-height: 88upx;
			float: left;
			width: 30%;
			display: flex;
			position: relative;
		}
	
		.head-left img {
			display: inline-block;
			width: 18upx;
			height: 32upx;
			position: absolute;
			margin-left: 28upx;
			top: 50%;
			transform: translateY(-50%);
		}
	
		.head-left span {
			margin-left: 60upx;
	        line-height: 88upx;
		}
	 */
	.head-left {
			height: 100%;
			/* line-height: 0.88rem; */
			float: left;
			width: 30%;
			/* display: flex; */
			position: relative;
		}
	
		.head-left img {
			display: inline-block;
			width: 0.18rem;
			height: 0.32rem;
			position: absolute;
			margin-left: 0.28rem;
			top: 50%;
			left: 0;
			transform: translateY(-50%);
			-webkit-transform: translateY(-50%);
		}
	
		.head-left span {
			/* line-height: 0rem; */
			margin-left: 0.35rem;
			font-size: 0.32rem;
			position: absolute;
			top: 50%;
			left: 0;
			transform: translateY(-51%);
			-webkit-transform: translateY(-51%);
			width: 50%;
		}
	
	
	
		.head-center {
			height: 100%;
			width: 40%;
			line-height: 0.88rem;
			text-align: center;
			float: left;
			font-size: 0.36rem;
			font-family: Arial !important;
			font-weight: 500 !important;
		}
	
		/* .head-right{
		 
		  height: 88upx;
		  width: 30%;
		
		} */
		.head-right {
			height: 100%;
			line-height: 0.85rem;
			float: right;
			width: 20%;
			display: flex;
			display: -webkit-box;
			display: -webkit-flex;
			justify-content: flex-end;
			-webkit-box-pack: end;
			-webkit-justify-content: flex-end;
			padding-right: 0.28rem;
		}
	
		.head-show {
			height: 1.28rem;
			width: 100%;
		}
		.content-1 {
			width: 6.94rem;
			margin: 0.37rem auto 0 auto;
		}
		.title {
			width: 100%;
			font-size: 0.28rem;
			/* font-weight: 550; */
			margin-bottom: 0.1rem;
		}
		
		.title-info {
			font-size: 0.26rem;
			line-height: 0.38rem;
			margin-bottom: 0.2rem;
		}
		.title-content{
			font-size: 0.26rem;
			line-height: 0.30rem;
			margin-bottom: 0.15rem;
		}
</style>
