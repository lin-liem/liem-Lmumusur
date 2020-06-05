<!-- 登陆与注册组件 -->
<div id="login-box">
	<login-box ref="loginBox" :show="show" :allow-register="'1'" :check-type="'tel'" :login-type="loginType" :login-text="'手机号'" :invitation="'1'" :invitation-link="'https://www.dachaoka.com/invitation-code'" :invitation-text="'获取邀请码'" :img-box-code="imgCode" @close-form="close" @login-ac="loginAc" v-cloak=""></login-box>
</div>

<!-- 验证码组件 -->
<div id="recaptcha-form">
	<recaptcha-box :show="show" :type="type" @close-form="close" v-cloak=""></recaptcha-box>
</div>

<!-- 搜索组件 -->
<div id="search-box">
	<search-box :show="show" :search-type="searchType" @close="close" v-cloak=""></search-box>
</div>

<!-- 公告弹窗 -->
<div id="gg-box">
	<gg-box :show="show" :ggdata="ggdata" @close="close" v-cloak=""></gg-box>
</div>

<!-- 私信弹窗 -->
<div id="dmsg-box" @click.stop="">
	<dmsg-box :show="show" :userid="userid" :type="select" @close="close" v-cloak=""></dmsg-box>
</div>

<!-- 扫码支付 -->
<div id="gongzhonghao-box" @click.stop="">
	<div data-money="" :class="['modal','ds-box scan-box',{'show-modal':show}]">
		<div class="modal-content b2-radius">
			<div class="pay-box-title">
				<div class="pay-box-left"><span>${settings.gongzhonghao_title!'关注微信公众号！'}</span></div>
				<div class="pay-box-right"><span class="pay-close" @click="close()">×</span></div>
			</div>
			<div class="pay-box-content">
				<div class="scan-info">
					<div class="qrcode-img b2-radius">
						<img src="${settings.gongzhonghao_qr!}"></div>
					<div class="qrcode-money"><span>${settings.gongzhonghao_id!'mumures'}</span></div>
					<div class="qrcode-desc">${settings.gongzhonghao_desc!'请打开手机微信扫描'}</div>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- 扫码支付 -->
<div id="scan-box" @click.stop="">
	<scan-box :show="show" :data="data" @close="close" v-cloak=""></scan-box>
</div>

<!-- 支付检查 -->
<div id="pay-check" @click.stop="">
	<check-box :show="show" :title="title" :type="type" @close="close" v-cloak=""></check-box>
</div>

<!-- 支付组件 -->
<div id="donate-box" ref="dsmoney">
	<div :class="['modal','ds-box',{'show-modal':show}]">
		<div class="modal-content b2-radius">
			<div class="pay-box-title">
				<div class="pay-box-left ds-pay-title">
					<img src="${user.avatar!}">
					<span>给${user.nickname!}打赏</span></div>
				<div class="pay-box-right">
					<span class="pay-close" @click="close()">×</span>
				</div>
			</div>
			<div class="pay-box-content ds">
				<div class="ds-msg">${settings.donate_guide_desc!'予人玫瑰，手有余香'}</div>
			</div>
			<div class="pay-type">
				<ul>
					<li>
						<button class="b2-radius" :class="payType == 'alipay' ? 'picked' : ''" onclick="donateBox.choseType('alipay')"  >
							<img src="${settings.donate_alipay!}">
							<div class="qrcode-money">
								<span><i class="b2font b2-pay-zhifubao "></i>支付宝</span>
							</div>
						</button>
					</li>
					<li>
						<button class="b2-radius" :class="payType == 'wecatpay' ? 'picked' : ''" onclick="donateBox.choseType('wecatpay')" >
							<img src="${settings.donate_wecatpay!}">
							<div class="qrcode-money">
								<span><i class="b2font b2-pay-weixin "></i>微信</span>
							</div>
						</button>
					</li>
				</ul>
			</div>
			<div class="pay-button">
				<div><button class="button " @click="close()">${settings.donate_close_btn!'不想赞赏'}</button></div>
			</div>
		</div>
	</div>
</div>

<!-- 积分支付组件 -->
<div id="credit-box" ref="creditbox">
	<credit-box :show="show" :data="data" :user="user" @close="close" v-cloak=""></credit-box>
</div>

<!-- 财富页面组件 -->
<div id="money-buy" ref="moneyBuy">
	<money-buy :show="show" :data="data" :user="user" @close="close" v-cloak=""></money-buy>
</div>

<!-- 微信绑定组件 -->
<div id="weixin-bind" ref="weixinBind">
	<weixin-bind :show="show" :url="url" @close="close" v-cloak=""></weixin-bind>
</div>

<!-- 关注公众号登录 -->
<div id="mp-box">
	<mp-box ref="b2mp" :show="show" :qrcode="qrcode" :invitation="'1'" :invitation-link="'https://www.dachaoka.com/invitation-code'" :invitation-text="'获取邀请码'" @close="close" v-cloak=""></mp-box>
</div>
