<template>
	<div>
		<div class='contents'>
			<div class='head'>
				<div class='head-left' @click='tapReturn'>
					<img src="../assets/left-black.png" mode=""></img>
					<span>返回</span>
				</div>
				<div class='head-center'>
				   购买协议
				</div>
				<div class='head-right'>
					<!-- <slot name="content-right"></slot> -->
				</div>
			</div>
		</div>
		<div class='head-show'>
		</div>
		<div class='content'>
			<div class='mr-bottom1'>购买协议</div>
			<div class='info-height mr-bottom3'>
				本协议由您(用户)与清洁人平台的经营者共同缔结，是对双方具有约束力的法律文件。清洁人平台的经营者是指法律认可的经营清洁人平台网站的责任主体，清洁人平台网站域名为<text class='color-url'>qingjieren365.com</text>，本协议项中清洁人平台的经营者可单称或合称为“清洁人”。有关清洁人平台经营者的信息请查看清洁人平台首页底部公布的公司信息和证照信息。
			</div>
			<div class="mr-bottom5">
				清洁人平台各项产品/服务的所有权和经营权归清洁人。为便于表达，本协议“产品/服务”简称“产品”或“服务”，您理解并同意，此协议所指“产品”、“服务” 均包含清洁人目前或将来提供的所有产品及服务项目。
			</div>
			<div class='mr-bottom2'>
				协议缔结与签署
			</div>
			<div class='mr-bottom6'>
				1.
				本协议内容包括协议正文及所有清洁人平台已经发布的或将来可能发布的各类相关的规则和条款。您在清洁人平台购买产品的过程中，本协议内容、网页上出现的关于购买操作及服务规范的提示内容均是您购买产品需要遵循的相关规则。所有规则和条款均为本协议不可分割的组成部分，与协议正文具有同等法律效力。
			</div>
			<div class='mr-bottom7'>
				2.
				如您购买清洁人提供的产品，您便接受了以下协议规则和条款，如您对本协议有任何疑问，应当停止继续购买并可向清洁人咨询。但无论您事实上是否阅读、理解了本协议内容，只要您进行购买产品操作，则本协议即对您产生约束，届时您不应以未阅读、未理解或不同意本协议的内容，以及未获得或不接受清洁人对您咨询的解答等理由，主张本协议无效或要求撤销本协议。
			</div>
			<div class='mr-bottom1'>
				订单合同关系的确立
			</div>
			<div class='mr-bottom8'>
				您的订单成功提交后，清洁人将根据清洁人设定的规则自动对您的订单进行审核。订单一旦通过审核， 清洁人对您的购买申请的批准与接受就正式成立，但此时不认为您与清洁人就订单内容确立了合同关系。
			</div>
			<div class='mr-bottom8'>
				您与清洁人就订单内容确立合同关系的标志为完成订单全额款项的支付，且清洁人也确认收到您支付的订单全额款项并同意提供服务。
			</div>
			<div class='mr-bottom8'>
				需要强调的是，在您与清洁人就订单内容确立合同关系成立付款前登录清洁人平台时，系统将在订单提交页面显示您同意本协议的签订，清洁人会记录您进行确认操作的IP地址、操作时间等信息，以备查证。如果您对订单内容或本协议条款有异议的，必须立即停止付款并联系清洁人进行核实，如果您继续付款，除非是存在明显错误的信息，否则代表您确认清洁人记录的订单或本协议信息是准确的，同意购买清洁人提供的产品。
			</div>
			<div class='mr-bottom7'>
				除通过.上述约定方式确立合同关系外，清洁人不接受且不会授权其领导人或员工通过其他任何方式(包括但不限于邮件、附件、电话或短信等方式)与用户订立产品购买合同关系或变更协议条款，任何用户主张以上述限制方式(包括但不限于邮件、附件、电话或短信等方式)确立的合同关系或条款的，清洁人一概不予承认，但经双方专门有效确认且存有真实有效依据的情况除外。
			</div>
			<div class='mr-bottom2'>
				订单的取消
			</div>
			<div class='mr-bottom8'>
				在您的订单提交成功但尚未付款之前，您根据自身需要可以在清洁人平台上取消订单，且不认定为违约。
			</div>
			<div class='mr-bottom8'>
				在您的订单成功提交之后，如果清洁人未在订单中限定的期限内收到您支付的全额订单款项或您选择的服务超出清洁人的服务范围(包括住址或住宅类型等)， 则清洁人有权单方面取消您的订单且无需承担任何违约责任。
			</div>
			<div class='mr-bottom8'>
				在您的订单成功提交且合同关系正式确立之后，如清洁人因自身原因需要取消订单的，清洁人将全额退还您已支付的款项。
			</div>
			<div class='mr-bottom7'>任何情况下，一旦您的订单在清洁人平台上被取消，则该订单的对应的合同关系即时失效，与该订单相对应签署的任何协议也即时同步失效。</div>
			<div class='mr-bottom2'>
				产品信息的说明
			</div>
			<div class='mr-bottom8'>
				为了让用户更方便、全面的了解清洁人的产品，清洁人会通过“产品说明”对产品进行详细的描述和说明。
			</div>
			<div class='mr-bottom8'>
				清洁人平台上的产品描述、说明、规则、价格等信息随时都有可能发生变动，清洁人对上述信息的调整不作特别通知。由于网站上产品信息量极其庞大，虽然清洁人会尽最大努力保证您所浏览产品信息的准确性，但由于众所周知的互联网技术因素等客观原因存在，清洁人在家网页显示的信息可能会有一定的滞后性或差错，对此情形您知悉并理解接受，清洁人欢迎您的纠错。
			</div>
			<div class='mr-bottom8'>
				产品的最终成交价格，一律以您成功提交订单时的产品实时价格为准。但是，如果由于发生了意外情况或是由于网站的错误等导致订单成交价格或/和金额的不准确，经双方确认后您有权取消订单。
			</div>
			<div class='mr-bottom8'>
				如果发现订单实际成交价格或/和金额存在错误，清洁人将会采取下列之一措施予以纠正:
			</div>
			<div class='mr-bottom8'>
				1.   如果订单实际成交价格或/和金额高于正确价格或/和金额，清洁人承诺将按照正确的价格或和金额向您销售交付相应产品。如果您已按错误价格或/和金额完成支付的，您可以申请退回差价或用差价购买清洁人其他产品。
			</div>
			<div class='mr-bottom7'>
				2.   如果订单实际成交价格或/和金额低于正确价格和/或金额，清洁人会根据具体情况而定,或者取消订单，或者暂停产品交付并通知您补回差价。
			</div>
		 <div class='mr-bottom2'>
			 款项的支付
		 </div>
		 <div>
			 1.  支付方式
		 </div>
		 <div class='pd-left1'>
			 订单款项的支付方式仅包括线上支付方式:具体支付方式: 您可以按规定通过第三方支付平台向清洁人在第三方支付平台(如支付宝)开设的账号，或通过网络银行向清洁人在银行开设的账号在线完成订单款项支付。
		 </div>
		 <div>
		 	2.  付款期限
		 </div>
		 <div class='pd-left1  mr-bottom7'>
		 		正常情况下，清洁人在确认收到您支付的全额订单款项的1个工作日内即可交付订单产品 在清洁人交付订单产品后，双方应按照约定的时间内履行各自的义务,如因您未能提供应该提供的配合和支持(如未提供详细的地址或联系方式等)造成清洁人无法履行相应义务的，清洁人不承担任何责任， 因此造成您无法及时使用产品的责任由您自行承担	
		 </div>
		 <div class='mr-bottom2'>
			 不可抗力
		 </div>
		 <div class='mr-bottom8'>
			 您和清洁人双方因不可抗力(包括地震、台风、雷击、水灾、火灾等自然原因,以及战争、政府行为、黑客攻击、电信部门技术管制等原因)不能履行或不能继续履行已生效订单约定内容的，双方均不承担违约责任,但法律另有规定的除外。
		 </div>
		 <div class='mr-bottom7'>
			 因清洁人延迟履行已生效订单约定内容后发生不可抗力的，不能免除责任。
		 </div>
		 <div class='mr-bottom2'>
			 违约赔偿
		 </div>
		 <div class='mr-bottom8'>
			 您同意支付因您违反本协议条款或为纠正您违反行为所引起的律师费用、诉讼费用、公证费用、鉴定费用、执行费用以及因违反协议条款引起的损害赔偿费用。
		 </div>
		 <div class='mr-bottom7'>
			 除本协议另有规定外，在任何情况下，清洁人对本协议所承担的违约赔偿责任总金额不超过向您收取的当次所涉违约产品所属订单金额。
		 </div>
		 <div class='mr-bottom2'>
			 法律适用与争议解决
		 </div>
		 <div class='mr-bottom8'>
			 本协议的订立、执行和解释及争议的解决均应适用中华人民共和国法律法规，您与清洁人都必须遵守中华人民共和国的司法管辖。如发生本协议相关规则和条款与中华人民共和国法律法规相抵触时，则该规则和条款将按相关法律法规重新解释，而其他规则和条款则保持对您及清洁人产生法律效力和影响。
		 </div>
		 <div  class='mr-bottom7'>
			清洁人已经建立了规范的消费纠纷受理及解决机制，您和清洁人一致同意， 有关本协议及使用清洁人产品服务产生的任何分歧或争议，本着双方友好协商的原则，解决彼此之间的分歧或争议。若协商不成，任何-方均有权向清洁人所在地有管辖权的人民法院进行诉讼。 
		 </div>
		 <div  class='mr-bottom2'>
			 本协议的修改更新
		 </div>
		 <div>
			 清洁人有权根据需要不时地制订、修改本协议及/或规则，并公布在清洁人平台，无需另行单独通知您。变更后的协议和规则一经在清洁人平台公布后，立即或在公告明确的特定时间自动生效。若您在前述变更后继续使用清洁人平台服务的，即表示您已经阅读、理解并接受经修订的协议和规则。若您不同意相关变更，应当立即停止使用清洁人平台服务。
		 </div>
		</div>
	</div>
</template>

<script>

	export default {
		data() {
			return {

			}
		},

		methods: {

			tapReturn() {
				this.$emit('showAdr')

				
			},
		
		}
	}
</script>
<style scoped>
	.contents{
			position: fixed;
			top:0;
			z-index: 100;
		    width: 100%;
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
			z-index: 20000;
		}

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
			margin-left: 0.35rem;
			font-size: 0.32rem;
			position: absolute;
			top: 50%;
			left: 0;
			transform: translateY(-50%);
			-webkit-transform: translateY(-50%);
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
			width: 30%;
			display: flex;
			display: -webkit-box;
			display: -webkit-flex;
			justify-content: flex-end;
			-webkit-box-pack: end;
			-webkit-justify-content: flex-end;
			padding-right: 0.28rem;
		}
	.content {
		width: 7.22rem;
		margin:0.24rem auto 0 auto;
	}

	.content>div {
		font-size: 0.18rem;
	}

	.mr-bottom1 {
		margin-bottom: 0.15rem;
	}

	.mr-bottom2 {
		margin-bottom: 0.18rem;
	}

	.mr-bottom3 {
		margin-bottom: 0.22rem;
	}

	.mr-bottom4 {
		margin-bottom: 0.1rem;
	}

	.mr-bottom5 {
		margin-bottom: 0.25rem;
	}

	.mr-bottom6 {
		margin-bottom: 0.42rem;
	}

	.mr-bottom7 {
		margin-bottom: 0.25rem;
	}

	.mr-bottom8 {
		margin-bottom: 0.12rem;
	}
    .pd-left1{
		padding-left: 0.26rem;
	}
	.info-height {
		line-height: 0.36rem;
	}
	.color-url{
		color:#3f62ce;
	}
</style>
