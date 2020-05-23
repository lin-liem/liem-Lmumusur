<#macro navbar layout>
	<div class="header logo-left">
		<div class="top-style">
			<div class="top-style-blur"></div>
			<div class="wrapper">
				<div id="mobile-menu-button" :class="['menu-icon',{'active':show}]" @click="showAc(true)">
					<div class="line-1"></div>
					<div class="line-2"></div>
					<div class="line-3"></div>
				</div>
				<div class="header-logo">
					<div class="logo">
						<h1><a rel="home" href=""><img itemprop="logo" src="${blog_logo!}" alt="${blog_title!}"></a></h1>
					</div>
				</div>
				<div class="header-user">
					<div class="top-user-info">
						<div class="login-button" v-if="!userData.avatar" v-cloak="">
							<div class="header-login-button">
								<button class="empty mobile-hidden" @click="login(1)">个人信息</button>
								<button class="mobile-hidden" @click="login(2)">快速搜索</button>
							</div>
							<div class="button text empty mobile-show" @click="login(1)"><i class="b2font b2-user "></i></div>
						</div>
					</div>
				</div>
				<div id="mobile-menu" class="mobile-box" ref="MobileMenu">
					<div class="header-tools">
						<div class="mobile-show">
							<div class="header-logo">
								<div class="logo"><a rel="home" href=""><img itemprop="logo" src="static/picture/125f3523397d3e.svg"></a></div>
							</div>
							<span class="close-button" @click="mobileMenu.showAc(false)">×</span>
						</div>
					</div>
					<div id="top-menu" class="top-menu">
						<ul id="top-menu-ul" class="top-menu-ul">
							<li class="depth-0"><a href="collection.html"><span class="hob" style="background-color:#81d742"></span><span>专题中心</span></a></li>
							<li class="depth-0"><a href="newsflashes.html"><span class="hob" style="background-color:#fc3c2d"></span><span>快讯</span></a></li>
							<li class="depth-0"><a href="document.html"><span class="hob" style="background-color:#1e73be"></span><span>帮助中心</span></a></li>
							<li class="depth-0  has_children b2-menu-3"><a href="ertae.html"><span class="hob" style="background-color:#43d480"></span>下拉菜单<i
									 class="b2font b2-jt-down "></i></a>
								<ul class="sub-menu-0 sub-menu box b2-radius">
									<li><a href="fenlei8.html">测试分类<i class="b2font b2-jiantou "></i></a>
										<ul>
											<li><a href="fenlei6.html"><span>未分类</span></a></li>
											<li><a href="wp-jq.html"><span>WP技巧</span></a></li>
										</ul>
									</li>
									<li><a href="ertae.html">主题更新<i class="b2font b2-jiantou "></i></a>
										<ul>
											<li><a href="fenlei8.html"><span>测试分类</span></a></li>
											<li><a href="fenlei6.html"><span>未分类</span></a></li>
											<li><a href="wp-jq.html"><span>WP技巧</span></a></li>
										</ul>
									</li>
								</ul>
							</li>
							<li class="depth-0  has_children b2-menu-1"><a href="wuhanyiqing.html"><span class="hob" style="background-color:#fc3c2d"></span>图片菜单<i
									 class="b2font b2-jt-down "></i></a>
								<ul class="sub-menu-0 sub-menu box b2-radius">
									<li><a href="fenlei8.html"><img class="menu-1-img b2-radius lazy" width="100" height="100" src="static/picture/default-img.jpg"
											 data-src="static/picture/27c0b852de3a49-imageresizem_fill.jpg"><span>测试分类</span></a></li>
									<li><a href="fenlei6.html"><img class="menu-1-img b2-radius lazy" width="100" height="100" src="static/picture/default-img.jpg"
											 data-src="static/picture/11dc23ccbcd548-imageresizem_fill.jpg"><span>未分类</span></a></li>
									<li><a href="wp-jq.html"><img class="menu-1-img b2-radius lazy" width="100" height="100" src="static/picture/default-img.jpg"
											 data-src="static/picture/15acd300750cba-imageresizem_fill.jpg"><span>WP技巧</span></a></li>
									<li><a href="fenlei1.html"><img class="menu-1-img b2-radius lazy" width="100" height="100" src="static/picture/default-img.jpg"
											 data-src="static/picture/1eecf157c9b9e3-imageresizem_fill.jpg"><span>分类3</span></a></li>
									<li><a href="jiqiao.html"><img class="menu-1-img b2-radius lazy" width="100" height="100" src="static/picture/default-img.jpg"
											 data-src="static/picture/1bb5dc9d57b7b9-imageresizem_fill.jpg"><span>柒比贰主题技巧</span></a></li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</#macro>
