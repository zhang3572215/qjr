<template>
	<div class='container'>
		<div class='contentss'  v-if='typeFlag'>
			<div class='head'>
				<div class='head-left' @click="toBack">
					<img src="../assets/left-black.png" mode=""></img>
					<span>返回</span>
				</div>
				<div class='head-center'>
				    客户服务协议
				</div>
				<div class='head-right'>
		         
				</div>
			</div>
		</div>
		<div class='head-show' v-if='typeFlag'>
		</div>
		<div class='content-1'>
			<div class='title'>特别提示：在使用客户服务协议</div>
			<div class='title-info'>
				提供的各项服务之前，您应当认真阅读并遵守《清洁人APP客户服务协议》（以下简称“本协议”），请您务必审慎阅读、充分理解各条款内容，
				特别是免除或者限制责任的条款、争议解决条款。免除或者限制责任的条款可能会以加粗字体显示，您应重点阅读。如您对协议有任何疑问，应向清洁人客服咨询
			</div>
			<div class='title-info'>
				当您按照登录页面提示填写信息、阅读并同意本协议且完成全部登录程序后，或您以其他清洁人APP允许的方式实际使用清洁人APP的服务时，即表示您已充分阅读、理解并接受本协议的全部内容。
				您承诺接受并遵守本协议的约定，届时您不应以未阅读本协议的内容或者未获得清洁人对您问询的解答等理由，主张本协议无效，或要求撤销本协议。
			</div>
			<div class='title'>一、协议的目的和范围</div>
			<div class='title-info'>
				1.1 本协议由您与清洁人APP的运营者共同订立。
			</div>
			<div class='title-info'>
				1.2 本协议包括协议正文、清洁人发布的各种官方信息、业务办理规则、法律声明、公告或通知等，以上文件构成本协议不可分割的组成部分，具有同等法律效力，且文件之间构成相互解释的关系，以下统称本协议。
			</div>
			<div class='title-info'>
				1.3 清洁人APP旨在向您提供代表清洁人的官方信息发布、服务信息查询、业务办理服务，并具备一定的网络交易平台功能。除非另行文件说明，清洁人APP提供的以上所有的服务均受本协议约束，您在使用清洁人APP提供的任一服务时，
				即表示您接受本协议所有条款。
			</div>
			<div class='title-info'>
				1.4 清洁人有权根据需要不时地修改本协议的各个组成文件的内容，或新增部分内容，而无需另行单独通知您。变更后的协议一经在网站公布，立即或在文件明确的特定时间生效。您通过清洁人APP接受服务的行为受您接受服务当时的协议内容约束。本协议是对双方权利义务的原则性约定，您如通过清洁人APP或营业厅前台等方式办理各项业务时，还应当遵守办理业务时的具体约定和条款，并以办理时的各项约定为准。
				如清洁人发布的各种官方信息、业务办理规则、法律声明、公告或通知与实际办理业务时的内容不符或不一致，您应当明确咨询和询问，并以实际办理业务时的各项约定和业务办理规则为准。
			</div>
			<div class='title'>二、主体资格、账号密码和用户信息</div>
			<div class='title-info'>
				•主体资格
			</div>
			<div class='title-info'>
				2.1 您确认，在您进行登录或以其他清洁人APP允许的方式实际使用清洁人APP的服务时，您应当是具备完全民事行为能力的自然人、法人或其他组织。若您不具备前述主体资格，则您及您的监护人应承担因此而导致的一切后果，且清洁人APP有权注销或永久冻结您的账户，
				并向您及您的监护人索偿相应损失。
			</div>
			<div class='title-info'>
				•账号和密码
			</div>
			<div class='title-info'>
				2.2 您在清洁人APP上的账号和密码是您重要的个人资料，为保障您个人资料信息安全，需要通过服务密码正确验证进行访问，您需记住本身的服务密码，务必注意账号和密码的保密
			</div>
			<div class='title-info'>
				2.3 清洁人APP向您提供多种登录方式，包括但不限于手机号码直接登录、凭动态密码登录基本登录方式
			</div>
			<div class='title-info'>
				2.4 您应按照机密的原则设置和保管自设密码，避免使用姓名、生日、电话号码等与本人明显相关的信息或过于简单的数字组合（如12345678、6个6、8个8等）作为密码，不应将本人自设密码提供给法律规定必须提供之外的任何人。
			</div>
			<div class='title-info'>
				2.5清洁人APP会提供便捷的业务办理和服务功能，您首次登录后会默认记住登录状态，如您不更换终端或注销账户，后续使用等同于已经通过本机本账户登录验证。
			</div>
			<div class='title-info'>
				2.6 您应采取合理措施，防止本人密码被窃取，防范他人擅用您终端（包括但不限于手机），由于密码泄露或他人擅用造成的后果由您自行承担。
			</div>
			<div class='title-info'>
				2.7 凡通过账号和密码登录清洁人APP办理的一切业务，均视为您亲自办理的业务，您须对在该用户名和密码下发生的所有活动（包括但不限于发布信息、查询信息、点击同意或提交、网上订立协议、网上购买商品或服务等）承担责任。
			</div>
			<div class='title-info'>
				2.8 清洁人APP有相应的安全措施来保障您的交易安全，但清洁人不保证其绝对安全。
			</div>
			<div class='title-info'>
				2.9 若您使用的号码是销号后重新启用的号码，如号码销号前在银行、微信、淘宝等任何第三方机构办理了手机号码绑定业务（包括但不限于银行自动支付话费、接收费用变更提醒或支付确认等），且在销号前未解除绑定，您可能会收到第三方机构的相关服务短信。
				如遇此种情况，您可联系第三方机构解除所绑定的业务，清洁人将予以必要的协助
			</div>
			<div class='title-info'>
				2.10 您将手机号码与银行、微信、淘宝等任何第三方机构提供的业务进行绑定，属于您和第三方机构的合同约定。为保护您的个人隐私和财产安全，您在更换手机号码、过户或销户前，需主动与第三方机构联系解除绑定关系。
				如您未解除有关绑定，因此产生的纠纷，以及发生对您不利的任何后果，清洁人将不承担责任。
			</div>
			<div class='title-info'>
				2.11 您在清洁人APP注册时所使用的用户名不得侵犯他人合法权益。如您设置的用户名涉嫌侵犯他人合法权益或损害社会公共利益，清洁人有权根据利益相关人的请求或者出于审慎和维护公序良俗的考虑注销您的用户名。
				用户名被注销后将开放给任意用户注册。
			</div>
			<div class='title-info'>
				2.12 您的登录用户名、昵称（如果有的话）和密码不得以任何方式买卖、转让、赠与或继承，除非有法律明确规定或司法裁定，并经清洁人认可，且需提供清洁人要求的合格的文件并按照清洁人的操作流程办理。
			</div>
			<div class='title-info'>
				2.13 如果您发现任何人未经您的授权使用您的用户名和密码登录清洁人APP，您应立即通知清洁人，防止您的损失或不利影响进一步扩大。如果您使用用户名和密码完成了在清洁人APP的操作，离开时，您应当以正确的步骤退出。清洁人不会对因您未能遵守本约定而发生的任何损失负责。
				您理解清洁人对您的请求采取行动需要合理时间，对在采取行动前已经产生的后果（包括但不限于您的任何损失和不利影响），清洁人不承担责任。
			</div>
			<div class='title-info'>
				2.14 您保证不会利用清洁人APP提供的服务发布任何违反法律规定和清洁人APP管理规则的信息、不实施侵犯他人合法权益或违反法律规定和清洁人APP管理规则的行为。
				发生上述任一行为，清洁人有权采取包括但不限于注销您的用户名、删除或屏蔽您发布的信息、终止向您提供服务等必要措施。
			</div>
			<div class='title-info'>
				2.15 在使用清洁人APP提供的服务或进行交易时，您应当依照相应页面的提示填写您的有关信息，并于相关信息变更时及时更新。您保证您所提供信息的真实性、完整性、准确性和及时性。
				如您的信息不能满足上述要求，您应承担由此导致的不利后果，也可能导致清洁人APP暂停或终止向您提供服务
			</div>
			<div class='title-info'>
				•用户信息：
			</div>
			<div class='title-info'>
				2.16 您应当准确填写并及时更新您的电子邮箱地址、联系电话、联系地址、邮政编码等联系方式信息，以便清洁人或其他用户与您进行有效联系，因通过您提供的联系方式无法与您取得联系，导致您在使用清洁人APP服务过程中产生任何损失或增加费用的，应由您独自承担。
			</div>
			<div class='title-info'>
				2.17 您在使用清洁人APP提供的服务时，应当向清洁人提供真实有效的二代身份证件。您在2013年9月1日前入网且没有登记信息或登记信息不全的，在登录清洁人APP后，应按照国家相关要求，主动认真的填写本人身份信息，
				按要求上传清晰身份证照等相关照片，完成补登记。
			</div>
			<div class='title'>三、清洁人APP服务内容、服务和使用规范</div>
			<div class='title-info'>
				•服务内容：
			</div>
			<div class='title-info'>
				3.1 清洁人APP主要向您提供代表清洁人的官方信息发布、服务信息查询、业务办理，并具备一定的网络交易平台功能，通过网络交易平台，您可以查询商品信息，达成交易意向并进行交易。
			</div>
			<div class='title-info'>
				3.2 清洁人APP将采取相应的安全措施来保障您的交易安全，但是您理解，对于因网络传输、电脑病毒、黑客入侵等非网站原因导致的网络交易风险，清洁人不承担责任。
			</div>
			<div class='title-info'>
				•服务规则：
			</div>
			<div class='title-info'>
				3.3 您在申请办理业务，或者申请查询信息以及其他任何网站提供的服务之前，请务必详细阅读网站上所公布的各项相关的业务规则，并确保完全理解之后，再提交业务办理申请。如您对网站上公布的业务规则不明白，请务必在向清洁人咨询后再提交业务办理申请。
			</div>
			<div class='title-info'>
				您向清洁人提交的业务申请即为您的要约。
			</div>
			<div class='title-info'>
				3.4 对于部分业务，如果您的手机号码有欠费，您必须先结清欠费，清洁人APP才受理您的业务申请。
		     </div>
			 <div class='title-info'>
			 	3.5 您需要提供真实、准确的个人信息，否则将无法受理您的业务申请，或者会导致您增加费用或者导致您的损失。
			  </div>
			  <div class='title-info'>
			  	3.6 您同意，清洁人APP可以出于客户服务、开展活动、提升客户体验、完成交易、货物配送等与为您提供服务有关的需要，收集您登录网站的个人信息，包括但不限于您填写的个人信息、上网的记录、交易的记录等信息，但登录密码、交易密码、银行账号等涉及财产安全的信息除外。
				清洁人APP承诺对涉及个人隐私的信息予以严格保密，除非得到您的授权、为履行强行性法律义务（如国家执法机关明令）或法律另有规定、双方另有约定外，本站不会向外界披露您的隐私信息。
			   </div>
			   <div class='title-info'>
			   	3.7 对于清洁人APP中发布的所有图片和文字信息，未经清洁人书面许可，您不得对这些图片和文字信息进行任何商业目的的复制和传播行为。
			    </div>
			  <div class='title-info'>
				3.8 在您登录清洁人APP，使用清洁人APP提供的服务，或使用清洁人APP进行交易时，您同意遵守以下约定：
			  </div>
			  <div class='title-info'>
			  	3.8.1 实施的所有行为均遵守法律规定和本协议的约定，不违背公序良俗、社会公共道德，不损害社会公共利益，不损害国家和任何第三方的合法权益。
			  </div>
			  <div class='title-info'>
			  	3.8.2 如果您通过清洁人APP发布有关信息，您发送的信息内容不得含有以下内容：
			  </div>
			  <div  class='title-content'>
				  ①骚扰性的、中伤他人的、辱骂性的、恐吓性的、伤害性的、挑衅的、庸俗的、淫秽的内容；
			  </div>
			  <div  class='title-content'>
			  	②教唆他人实施犯罪行为的内容；
			  </div>
			  <div  class='title-content'>
			  	③涉及国家安全、国家机密的内容；
			  </div>
			  <div  class='title-content'>
			  ④侵犯他人任何合法权益的内容；
			  </div>
			  <div  class='title-content'>
			  ⑤虚假不实的信息，包括对交易平台上销售商品的虚假不实的评论信息；
			  </div>
			  <div  class='title-content'>
			  ⑥违反社会公序良俗、公共道德或公共利益的内容；
			  </div>
			  <div  class='title-content'>
			  ⑦按照任何法律规定为非法的信息。
			  </div>
			 <div class='title-info'>
			 	3.8.3 不使用任何装置、软件干预或试图干预清洁人APP的正常运作，或对清洁人APP上的任何交易和使用行为进行干预。您承诺不使用任何可能导致清洁人APP运行设备承载不合理庞大数据负荷的设备和作为
			 </div>
			 <div class='title-info'>
			 	3.8.4 其他任何违反本协议约定和违反法律规定的行为。
			 </div>
			 <div class='title-info'>
			 	3.9 您了解并同意：
			 </div>
			 <div class='title-info'>
			 	3.9.1 您如果违反前述约定和承诺，您独自承担所有法律后果，因此给清洁人造成任何损失或产生任何费用的，您将予以承担。
			 </div>
			 <div class='title-info'>
			 	3.9.2 出于维护清洁人APP正常运行、正常的交易秩序和交易安全的需要，清洁人APP有权在发生恶意购买等任何扰乱正常运行、正常交易的情形时，采取关闭相应交易订单和业务申请的措施。
			 </div>
			 <div class='title-info'>
			 	3.9.3 如您发送了含有违反上述约定内容的信息，清洁人APP有权采取包括但不限于删除、屏蔽信息，向受害人提供您的个人信息等必要手段，并根据需要向有关执法机关报告。
			 </div>
			<div class='title'>四、清洁人APP商品销售</div>
			<div class='title-info'>
				•清洁人APP商品销售定义
			</div>
			<div class='title-info'>
				4.1 清洁人APP商品包括但不限于清洁服务活动。
			</div>
			<div class='title-info'>
				4.2 商品销售订单履行，指商品订单下单后的执行过程，包括但不限于配送上门或客户自提、订单包裹交接、商品涉及的业务开通、后续话费返还，具体以清洁人APP公布的履行清洁人APP商品销售及服务（下称“电子服务”）方式和要求为准。
			</div>
			<div class='title-info'>
			   •电子服务协议签订与履行
			</div>
			<div class='title-info'>
			  4.3 您按照清洁人APP提示选择合适商品，并需进行必要身份信息验证；您在下单前应清楚了解商品相关内容，成功下单后不能将不了解商品或服务作为不履行订单的理由。
			</div>
			<div class='title-info'>
			 4.4 您应在确认所选购商品后，认真阅读清洁人通过清洁人APP展示的本协议相关内容，同意后按清洁人APP的提示进行相关操作，一旦完成操作，即视为您完全理解和接受本协议的全部条款。
			</div>
			<div class='title-info'>
			 4.5 您应按照清洁人APP提示，选择合适的履行电子服务方式（包括但不限于配送上门等，具体以清洁人APP信息公布为准），完成相关信息的填写，并确保信息的真实性。
			</div>
			<div class='title-info'>
			4.6 除不可抗力外，成功下单后双方都应按照清洁人APP公布的履行电子服务方式和要求完成订单履行。履行订单时，您需提供本人真实有效的身份证件（仅限于身份证）。
			</div>
			<div class='title-info'>
			•费用及费用交纳
			</div>
			<div class='title-info'>
			4.7 您购买并使用清洁人提供的电子服务应支付相关费用。与相关网络服务有关的设备（如电脑、调制解调器及其他与接入互联网有关的装置等）及其所需的费用（如为接入互联网而支付的电话费及上网费等）均应由您自行负担。
			</div>
			<div class='title-info'>
			4.8 您应按照与清洁人约定的方式（包括但不限于在线支付、货到付款等），向清洁人交纳订单全部费用，订单费用包括但不限于商品价格、运费及相关税费。
			</div>
			<div class='title-info'>
			4.9 您有权要求清洁人提供费用查询服务，清洁人有义务就订单费用对您的合理要求进行解释。
			</div>
			<div class='title-info'>
			4.10 清洁人APP所展示的来自于第三方网站、APP的内容、服务、商品，以及这些内容链接或指向的其他内容（如广告）等非清洁人APP自有服务内容，不代表清洁人APP观点，若您需要在该服务或者商品中进行交易，应慎重辨别这些内容的准确
			性和安全性，若您不确定这些内容是否准确、安全，清洁人建议您先咨询专业人士，购买第三方商品及服务所产生的费用纠纷问题（包含付款后未收到商品等），需要您与第三方网站、APP协商解决或通过法律途径解决。
			</div>
			<div class='title'>五、其他约定</div>
			<div class='title-info'>
			5.1 您在使用清洁人APP服务过程中，所产生的一切软硬件和其他方面的费用和成本，均由您独自承担。
			</div>
			<div class='title-info'>
			5.2 清洁人APP上的商品图片展示、说明和价格并不构成要约。如果您通过清洁人APP订购产品，您的订单就成为一种购买产品的要约。在我们收到您的订购申请，经审核并给您发送确认短信或其他形式的通知时，您的订购合同才成立。
			</div>
			<div class='title-info'>
			5.3 清洁人APP努力使各种业务信息、商品信息、业务规则尽可能准确，但我们并不保证这些信息的准确性、完整的、时效性。如果您经清洁人APP购买的产品本身与清洁人APP信息不一致，您可以将该未经使用过的产品退还给相应的商家，并依
			法要求商家以其他形式履行法定或约定义务
			</div>
			<div class='title-info'>
			5.4 清洁人不保证清洁人APP的服务一定能满足客户的要求，不保证服务不会中断，不保证服务的绝对及时、安全、真实和无差错，也不保证客户发送的信息能完全准确、及时、顺利地被传送，但会极力保证服务的及时提供，为客户提供方便、快捷的服务。
			</div>
			<div class='title-info'>
			5.5 不论何种情形清洁人都不对任何由于使用或无法使用清洁人APP提供的服务所造成间接的、附带的、特殊的或余波所及的损失、损害、债务或商务中断承担责任。
			</div>
			<div class='title-info'>
			5.6 本协议的成立、生效、履行和解释，均适用中华人民共和国法律。
			</div>
			<div class='title-info'>
			5.7 在履行本协议过程中，发生争议的，双方友好协商解决。协商不成的，提交您号码所归属的清洁人地市分公司住所地人民法院诉讼解决。
			</div>
			<div class='title-info'>
			5.8 任何单位或个人如果认为清洁人APP所展示的第三方内容可能涉嫌侵害其合法著作权，应及时以书面形式向清洁人反映，并提供相关证明资料，清洁人收到上述文件后，会尽快断开相关链接。如存在异议，双方应通过相关法律途径进行解决，并承担相关
			法律责任。对于第三方内容侵权事件，应由第三方提供者承担相应的法律责任，清洁人概不负责，亦无法也不能承担任何法律责任。
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
					this.$emit('toCollage')
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
