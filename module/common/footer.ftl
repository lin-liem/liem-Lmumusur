<style>
	.site-footer{
		background-color:#333333		
	}
	.site-footer-nav{
		background-color:#0a0a0a	
	}
	#bigTriangleColor{
		background-color:#333333		
	}
</style>
<footer id="colophon" class="footer">
	<div class="site-footer">
		<div class="wrapper">
			<div class="site-footer-widget-in">
				<section id="b2-widget-about-7" class="widget b2-widget-about mg-b b2-radius">
					<div class="b2-widget-title">
						<h2 class="widget-title"><i class="b2font b2-yuancircle94 "></i>关于我们</h2>
					</div>
					<div class="b2-widget-box">
						<div class="about-widget">
							<a href=""><img class="footer-logo" src="${settings.footer_logo!'https://www.mumusur.com/upload/2020/3/logo2-b0d113f6a65b4b4280bef775e754d97f.png'}"></a>
							<div class="about-widget-content">
								${settings.footer_logo_memo}
							</div>
						</div>
					</div>
				</section>
				<section id="b2-widget-links-3" class="mobile-hidden widget b2-widget-links mg-b b2-radius">
					<div class="b2-widget-title">
						<h2 class="widget-title"><i class="b2font b2-yuancircle94 "></i>联系与合作</h2>
					</div>
					<div class="b2-widget-box">
						<ul class="links-widget">
							<li>
								<a class="link-block" href="https://www.8848faka.com/details/ACFEFC36"></a>
								<div class="links-icon"><img src="${theme_base!}/source/picture/youhui.png"></div>
								<div>
									<h2>成为会员</h2>
									<p>入驻本站会员资源任意用</p>
								</div>
							</li>
							<li>
								<a class="link-block" href="https://www.mumusur.com/s/about.html"></a>
								<div class="links-icon"><img src="${theme_base!}/source/picture/kuozhan.png"></div>
								<div>
									<h2>关于本站</h2>
									<p>从这儿可以了解本站</p>
								</div>
							</li>

							<li>
								<a class="link-block" href="https://www.mumusur.com/s/disclaimer.html"></a>
								<div class="links-icon"><img src="${theme_base!}/source/picture/wendang.png"></div>
								<div>
									<h2>免责声明</h2>
									<p>资源免责声明或侵删联系</p>
								</div>
							</li>

							<li>
								<a target="__blank" class="link-block" href="https://www.mumusur.com/s/guestbook.html"></a>
								<div class="links-icon"><img src="${theme_base!}/source/picture/gongdan.png"></div>
								<div>
									<h2>留言反馈</h2>
									<p>反馈资源或资源需求等</p>
								</div>
							</li>

							<li>
								<a class="link-block" href="https://www.mumusur.com/s/cooperation.html"></a>
								<div class="links-icon"><img src="${theme_base!}/source/picture/jianyi.png"></div>
								<div>
									<h2>商务合作</h2>
									<p>了解广告推广服务</p>
								</div>
							</li>
						</ul>
					</div>
				</section>
				<section id="b2-widget-hot-21" class="mobile-hidden widget b2-widget-hot mg-b b2-radius">
					<div class="b2-widget-title">
						<h2 class="widget-title"><i class="b2font b2-yuancircle94 "></i>最近快讯</h2>
					</div>
					<div class="b2-widget-box">
						<ul class="b2-widget-list-ul">
							<@categoryTag method="list">
								<#list categories as category>
									<#if category.slug == 'newsflashes'>
										<@postTag method="listByCategoryId" categoryId="${category.id}">
											<#list posts?sort_by(["createTime"])?reverse as post>
												<#if post_index lte 5>
												<li class="b2-widget-box widget-post widget-post-none">
													<div class="b2-widget-post-order widget-order-1"><span class="b2-radius">${post_index+1}</span></div>
													<div class="b2-widget-post-title">
														<h2>${post.title!}</h2>
														<time datetime="${post.createTime?string('yyyy/MM/dd')}">${post.createTime?string('yyyy/MM/dd')}</time>
													</div>
													<a class="link-overlay" href="${post.fullPath!}"></a>
												</li>
												</#if>
											</#list>
										</@postTag>
									</#if>
								</#list>
							</@categoryTag>
						</ul>
					</div>
				</section>
				<section id="b2-widget-team-3" class="mobile-hidden widget b2-widget-team mg-b b2-radius">
					<div class="b2-widget-title">
						<h2 class="widget-title"><i class="b2font b2-yuancircle94 "></i>合作伙伴</h2>
					</div>
					<div class="b2-widget-box">
						<ul class="team-widget">
							<li>
								<a href="https://www.aliyun.com/">
									<img src="${theme_base!}/source/picture/footer_ali.png" class="avatar b2-radius" title="阿里云" alt="阿里云">
								</a>
							</li>

							<li>
								<a href="https://cloud.tencent.com/">
									<img src="${theme_base!}/source/picture/footer_tengxun.png" class="avatar b2-radius" title="腾讯云" alt="腾讯云">
								</a>
							</li>

							<li>
								<a href="https://pan.baidu.com/">
									<img src="${theme_base!}/source/picture/footer_baiduyun.png" class="avatar b2-radius" title="百度网盘" alt="百度网盘">
								</a>
							</li>

							<li>
								<a href="https://www.upyun.com/">
									<img src="${theme_base!}/source/picture/footer_youpai.png" class="avatar b2-radius" title="又拍云" alt="又拍云">
								</a>
							</li>
							
							<li>
								<a href="https://www.lanzou.com/">
									<img src="${theme_base!}/source/picture/footer_lanzou.png" class="avatar b2-radius" title="蓝奏云" alt="蓝奏云">
								</a>
							</li>

						</ul>
					</div>
				</section>
			</div>
		</div>
	</div>
	<div class="site-footer-nav">
		<div class="wrapper">
			<#if settings.footer_links_enable!true>
				<#include "./footer_links.ftl">
			</#if>
			<div class="footer-bottom">
				<div class="footer-bottom-left">
					<div class="copyright">Copyright &copy; ${.now?string('yyyy')}<a href="" rel="home">&nbsp;${options.blog_title!}</a></div>
					<div class="beian">
						<span class="b2-dot">・</span>${user.nickname!}
						<span class="b2-dot">・</span>
						<a rel="nofollow" target="__blank" href="javascript:;">渝ICP备20002228号</a> 
					</div>
				</div>
				<div class="footer-bottom-right">自定义链接</div>
			</div>
		</div>
	</div>
</footer>
