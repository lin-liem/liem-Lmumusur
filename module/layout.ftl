<#macro layout type,title,keywords,description,canonical>
<#include "common/navbar.ftl">
<!doctype html>
<html lang="zh-CN" class="avgrund-ready">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
		<meta http-equiv="Cache-Control" content="no-transform">
		<meta http-equiv="Cache-Control" content="no-siteapp">
		<meta name="renderer" content="webkit">
		<meta name="force-rendering" content="webkit">
		<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
		<title>${title!}</title>
		<meta property="wb:webmaster" content="3862de00f8888c99">
		<meta name="baidu-site-verification" content="IFs0BtfI1Q">
		<meta property="og:locale" content="zh_CN">
		<meta property="og:type" content="website">
		<meta property="og:site_name" content="${title!}">
		<meta property="og:title" content="${title!}">
		<meta property="og:url" content="${canonical}">
		<meta name="keywords" content="${meta_keywords!}">
		<meta name="description" content="${meta_description!}">
		<meta property="og:image" content="${user.avatar!}">
		<meta name="generator" content="WordPress 5.4.1">
		<meta name="twitter:card" content="summary">
		<meta name="twitter:title" content="${title!}">
		<meta name="twitter:description" content="${meta_description!}">
		<meta name="twitter:image" content="${user.avatar!}">
		<meta name="msapplication-TileImage" content="https://static.7b2.com/wp-content/uploads/2018/04/资源-19.png">
		<link rel="alternative" href="${atom_url!}" title="${blog_title!}" type="application/atom+xml">
		<link rel="canonical" href="${canonical!}" />
		<link rel="profile" href="http://gmpg.org/xfn/11">
		<#include "common/style.ftl">
	</head>
   
   

	<body class="home blog">
		<div id="page" class="site">
			<div class="site-header mg-b">
				<div class="site-header-in">
					<@header 'page' />
					<@navbar 'page' />
				</div>
			</div>
			
			
			<div id="content" class="site-content">
				xxxx

				 

				<!-- 社交强制绑定 -->
				<div class="aside-container" @click.stop="" ref="asideContainer">
					<div class="aside-bar">
						<div class="bar-footer">
							<div class="bar-item bar-qrcode">
								<i class="b2font b2-erweima "></i>
								<div class="bar-item-desc bar-qrcode-box">
									<ul>
										<li class="b2-radius">
											<img :src="getQrcode('https://www.dachaoka.com')">
											<p>扫码打开当前页</p>
										</li>
										<li class="b2-radius">
											<img src="static/picture/code-qibier.jpg">
											<p>扫码进入公众号</p>
										</li>
										<li class="b2-radius">
											<img src="static/picture/code-qibier.jpg">
											<p>扫码下载APP</p>
										</li>
									</ul>
								</div>
							</div>
							<div class="bar-item" @click="goTop">
								<i class="b2font b2-ictotop "></i> <span class="bar-item-desc">返回顶部</span>
							</div>
						</div>
					</div>
				
				</div>

			</div>
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
										<a href=""><img class="footer-logo" src="static/picture/1d588b3d99ef5c.svg"></a>
										<div class="about-widget-content">
											<a href="">
												<p>我们专注于制作Wordpress主题11、小程序和App，在为客户提供最好的产品的同时，保证优秀的服务质量。</p>
												<p>用户能够通过我们的程序获得收益是我们最大的奋斗目标。</p>
											</a>
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
											<a class="link-block" href="#"></a>
											<div class="links-icon"><img src="static/picture/youhui.png"></div>
											<div>
												<h2>优惠活动</h2>
												<p>查看本站的最新优惠</p>
											</div>
										</li>

										<li>
											<a class="link-block" href="#"></a>
											<div class="links-icon"><img src="static/picture/kuozhan.png"></div>
											<div>
												<h2>配件商城</h2>
												<p>在线购买XX配件</p>
											</div>
										</li>

										<li>
											<a class="link-block" href="#"></a>
											<div class="links-icon"><img src="static/picture/wendang.png"></div>
											<div>
												<h2>法律声明</h2>
												<p>本站的法律声明</p>
											</div>
										</li>

										<li>
											<a target="__blank" class="link-block" href="requests.html"></a>
											<div class="links-icon"><img src="static/picture/gongdan.png"></div>
											<div>
												<h2>在线工单</h2>
												<p>提交在线工单</p>
											</div>
										</li>

										<li>
											<a class="link-block" href="#"></a>
											<div class="links-icon"><img src="static/picture/jianyi.png"></div>
											<div>
												<h2>建议提交</h2>
												<p>查看本主题的文档</p>
											</div>
										</li>
									</ul>
								</div>
							</section>
							<section id="b2-widget-hot-21" class="mobile-hidden widget b2-widget-hot mg-b b2-radius">
								<div class="b2-widget-title">
									<h2 class="widget-title"><i class="b2font b2-yuancircle94 "></i>文章聚合</h2>
								</div>
								<div class="b2-widget-box">
									<ul class="b2-widget-list-ul">
										<li class="b2-widget-box widget-post widget-post-none">
											<div class="b2-widget-post-order widget-order-1"><span class="b2-radius">1</span></div>
											<div class="b2-widget-post-title">
												<h2>大公司头条：阿里宣布 20 亿美元收购网易考拉</h2>
												<time datetime="2019-09-06T10:39:03+08:00">2019/09/06</time>
											</div>
											<a class="link-overlay" href="35223.html"></a>
										</li>
										<li class="b2-widget-box widget-post widget-post-none">
											<div class="b2-widget-post-order widget-order-2"><span class="b2-radius">2</span></div>
											<div class="b2-widget-post-title">
												<h2>元旦快乐，2.8.0更新了！</h2>
												<time datetime="2018-12-31T21:06:16+08:00">2018/12/31</time>
											</div>
											<a class="link-overlay" href="34000.html"></a>
										</li>
										<li class="b2-widget-box widget-post widget-post-none">
											<div class="b2-widget-post-order widget-order-3"><span class="b2-radius">3</span></div>
											<div class="b2-widget-post-title">
												<h2>Seven主题 2.7.4 版本更新公告</h2>
												<time datetime="2018-11-22T01:12:22+08:00">2018/11/22</time>
											</div>
											<a class="link-overlay" href="33307.html"></a>
										</li>
										<li class="b2-widget-box widget-post widget-post-none">
											<div class="b2-widget-post-order widget-order-4"><span class="b2-radius">4</span></div>
											<div class="b2-widget-post-title">
												<h2>Seven 2.5.0 已经可以更新了，请大家关注</h2>
												<time datetime="2018-06-23T18:15:37+08:00">2018/06/23</time>
											</div>
											<a class="link-overlay" href="31766.html"></a>
										</li>
									</ul>
								</div>
							</section>
							<section id="b2-widget-team-3" class="mobile-hidden widget b2-widget-team mg-b b2-radius">
								<div class="b2-widget-title">
									<h2 class="widget-title"><i class="b2font b2-yuancircle94 "></i>我们的团队</h2>
								</div>
								<div class="b2-widget-box">
									<ul class="team-widget">
										<li>
											<a href="auuAwtzuk.html">
												<img src="static/picture/119ba8f8ed6d95_1_avatar-imageres2.jpg" class="avatar b2-radius" title="春哥" alt="春哥">
											</a>
										</li>

										<li>
											<a href="avwxzuvvl.html">
												<img src="static/picture/27c0b852de3a49-imageresizem_fill.jpg" class="avatar b2-radius" title="chunge" alt="chunge">
											</a>
										</li>

										<li>
											<a href="axxzCvvxn.html">
												<img src="static/picture/17bdf95cea5b2d-imageresizem_fill.jpg" class="avatar b2-radius" title="春哥2号" alt="春哥2号">
											</a>
										</li>

										<li>
											<a href="awtyBzywo.html">
												<img src="static/picture/5506ffe00b4f0b_avatar-imageresiz.jpg" class="avatar b2-radius" title="武汉极点出版" alt="武汉极点出版">
											</a>
										</li>

										<li>
											<a href="azAtwBwzp.html">
												<img src="static/picture/default-avatar.png" class="avatar b2-radius" title="xinxin" alt="xinxin">
											</a>
										</li>

										<li>
											<a href="avBvuuxwq.html">
												<img src="static/picture/default-avatar.png" class="avatar b2-radius" title="xiaoai" alt="xiaoai">
											</a>
										</li>

										<li>
											<a href="aBCwBxxCr.html">
												<img src="static/picture/default-avatar.png" class="avatar b2-radius" title="laohu" alt="laohu">
											</a>
										</li>

										<li>
											<a href="aytyyAyys.html">
												<img src="static/picture/default-avatar.png" class="avatar b2-radius" title="chun520" alt="chun520">
											</a>
										</li>

										<li>
											<a href="buAwtzukj.html">
												<img src="static/picture/default-avatar.png" class="avatar b2-radius" title="xiaoyu" alt="xiaoyu">
											</a>
										</li>

										<li>
											<a href="bvCtwzAkk.html">
												<img src="static/picture/default-avatar.png" class="avatar b2-radius" title="dreamin" alt="dreamin">
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

						<div class="footer-links mobile-hidden">
							<ul>
								<li><a target="_blank" href="javascript:;">阿里云博客</a></li>
								<li><a target="_blank" href="javascript:;">最美网站</a></li>
								<li><a target="_blank" href="javascript:;">喵在欧洲</a></li>
								<li><a target="_blank" href="javascript:;">文学宫</a></li>
								<li><a target="_blank" href="javascript:;">南城旧少年</a></li>
								<li><a target="_blank" href="javascript:;">西瓜CG</a></li>
								<li><a target="_blank" href="javascript:;">6服务区</a></li>
								<li><a target="_blank" href="javascript:;">PS样机网</a></li>
								<li><a target="_blank" href="javascript:;">阿里云活动</a></li>
								<li><a target="_blank" href="javascript:;">宅客</a></li>
								<li><a target="_blank" href="javascript:;">一只铅笔</a></li>
								<li><a target="_blank" href="javascript:;">无剪记</a></li>
								<li><a target="_blank" href="javascript:;">纸工场 Paper.TV</a></li>
								<li><a target="_blank" href="javascript:;">投资那点事</a></li>
								<li><a target="_blank" href="javascript:;">HIFI音乐下载</a></li>
								<li><a target="_blank" href="javascript:;">CodePen</a></li>
								<li><a target="_blank" href="javascript:;">王牌网络</a></li>
								<li><a target="_blank" href="javascript:;">1s播</a></li>
								<li><a target="_blank" href="javascript:;">酷社</a></li>
								<li><a target="_blank" href="javascript:;">鹿时间</a></li>
								<li><a target="_blank" href="javascript:;">趣讨教</a></li>
								<li><a target="_blank" href="javascript:;">xfolio</a></li>
								<li><a target="_blank" href="javascript:;">口耳相传</a></li>
								<li><a target="_blank" href="javascript:;">PMU产品经理大学</a></li>
								<li><a target="_blank" href="javascript:;">学美文网</a></li>
								<li><a target="_blank" href="javascript:;">FaiMeilei</a></li>
								<li><a target="_blank" href="javascript:;">五号云</a></li>
								<li><a target="_blank" href="javascript:;">致美化</a></li>
								<li><a target="_blank" href="javascript:;">VPS评审</a></li>
								<li><a target="_blank" href="javascript:;">蓝板报</a></li>
							</ul>
						</div>
						<div class="footer-bottom">
							<div class="footer-bottom-left">
								<div class="copyright">Copyright &copy; 2020<a href="" rel="home">&nbsp;大潮咖</a></div>
								<div class="beian">
									<span class="b2-dot">・</span><a rel="nofollow" target="__blank" href="javascript:;">鄂ICP备16020046号-2</a> <span
									 class="b2-dot">・</span><img src="static/picture/beian-ico.png"><a rel="nofollow" target="__blank" href="javascript:;">X公网安备123456789</a>
								</div>
							</div>
							<div class="footer-bottom-right">
								查询 41 次，耗时 0.5191 秒 </div>
						</div>

					</div>
				</div>
			</footer>
			<div class="mobile-footer-menu mobile-show footer-fixed" ref="footerMenu">
				<div class="mobile-footer-left">
					<a href="">
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
				<div class="mobile-footer-center">
					<a href="write.html">
						<span>
							<i class="b2font b2-jia b2-radius "></i>
						</span>
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
					<a href="javascript:void(0)" onclick="window.event.cancelBubble = true;b2AsideBar.showAc(true)">
						<span v-if="!msg">
							<i class="b2font b2-wode "></i>
						</span>
						<span v-else="" v-cloak="">
							<i class="b2font b2-xiaoxi "></i>
						</span>
						<b id="footer-menu-user">我的</b>
						<b class="footer-new-msg" v-show="msg" v-text="msg" v-cloak=""></b>
					</a>
				</div>
			</div>
		</div>

		
	</body>
</html>
</#macro>