<!-- 社交强制绑定 -->
<div class="aside-container" @click.stop="" ref="asideContainer">
	<div class="aside-bar">
		<div class="bar-footer">
			<#if settings.tool_qr_enable!true>
				<div class="bar-item bar-qrcode">
					<i class="b2font b2-erweima "></i>
					<div class="bar-item-desc bar-qrcode-box">
						<ul>
							<li class="b2-radius">
								<img :src="getQrcode('${canonical!}')">
								<p>${settings.tool_qr_page_desc!'扫码打开当前页'}</p>
							</li>
							<li class="b2-radius">
								<img src="${settings.tool_qr_01_img!'https://www.mumusur.com/upload/2020/04/mumures-b2eca980e6b8475185722138416a2c26.png'}">
								<p>${settings.tool_qr_01_desc!'暂无描述信息'}</p>
							</li>
							<li class="b2-radius">
								<img src="${settings.tool_qr_02_img!'https://www.mumusur.com/upload/2020/04/QQ_class-cccffa3ad8b94545abc3f52208606f21.png'}">
								<p>${settings.tool_qr_02_desc!'暂无描述信息'}</p>
							</li>
						</ul>
					</div>
				</div>
			</#if>
			<div class="bar-item" @click="goTop">
				<i class="b2font b2-ictotop "></i> <span class="bar-item-desc">返回顶部</span>
			</div>
		</div>
	</div>
</div>

<div class="mobile-footer-menu mobile-show footer-fixed" ref="footerMenu">
	<div class="mobile-footer-left">
		<a href="${blog_url!}">
			<span>
				<i class="b2font b2-home"></i>
			</span>
			<b>首页</b>
		</a>
		<a href="collection.html">
			<span>
				<i class="b2font b2-zhuanti"></i>
			</span>
			<b>专题</b>
		</a>
		<a href="verify.html">
			<span>
				<i class="b2font b2-renzheng"></i>
			</span>
			<b>认证</b>
		</a>
	</div>
	<div class="mobile-footer-right">
		<a href="javascript:void(0)" onclick="b2SearchBox.show = true">
			<span>
				<i class="b2font b2-search "></i>
			</span>
			<b>搜索</b>
		</a>
		<a href="javascript:void(0)" onclick="mobileMenu.showAc(true)">
			<span>
				<i class="b2font b2-menu "></i>
			</span>
			<b>菜单</b>
		</a>
		<a href="javascript:void(0)">
			<span>
				<i class="b2font b2-ictotop"></i>
			</span>
			<b id="footer-menu-user">顶部</b>
		</a>
	</div>
</div>