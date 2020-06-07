<#macro navbar layout>
	<div class="header logo-left">
		<div class="top-style">
			<div class="top-style-blur"></div>
			<div class="wrapper">
				<div class="header-logo">
					<div class="logo">
						<h1><a rel="home" href="${blog_url!}"><img itemprop="logo" src="${blog_logo!}" alt="${blog_title!}"></a></h1>
					</div>
				</div>
				<div id="mobile-menu-button" :class="['menu-icon',{'active':show}]" @click="showAc(true)">
					<div class="line-1"></div>
					<div class="line-2"></div>
					<div class="line-3"></div>
				</div>
				<div class="mobile-hidden header-user">
					<div class="top-user-info">
						<div class="login-button" v-if="!userData.avatar" v-cloak="">
							<#--
							<div class="header-login-button">
								<button class="empty mobile-hidden" @click="login(1)">个人信息</button>
								<button class="mobile-hidden" @click="login(2)">快速搜索</button>
							</div>
							<div class="button text empty mobile-show" @click="login(1)"><i class="b2font b2-user "></i></div>
							-->
							<div data-type="" class="top-search" >
								<form method="get" action="/search" class="mobile-search-input">
									<input type="text" name="keyword" autocomplete="off" placeholder="搜索" class="search-input b2-radius" >
									<button class="search-button-action"><i class="b2font b2-search "></i></button>
								</form>
							</div>
						</div>
					</div>
				</div>
				<div id="mobile-menu" class="mobile-box" ref="MobileMenu">
					<div class="header-tools">
						<div class="mobile-show">
							<div class="header-logo">
								<div class="logo"><a rel="home" href="${blog_url!}"><img itemprop="logo" src="${blog_logo!}" alt="${blog_title!}"></a></div>
							</div>
							<span class="close-button" @click="mobileMenu.showAc(false)">×</span>
						</div>
					</div>
					<div id="top-menu" class="top-menu">
						<ul id="top-menu-ul" class="top-menu-ul">
							<@menuTag method="tree">
								<#if menus?? && menus?size gt 0>
								<#list menus?sort_by('priority') as menu>
								<#if !menu.children??>
									<li class="depth-0">
										<a href="${menu.url}" target="${menu.target!}">
											<span class="hob" style="background-color:#fc3c2d"></span>
											<span>${menu.name}</span>
										</a>
									</li>
								</#if>
								<#if menu.children?? && menu.children?size gt 0>
									<li class="depth-0  has_children b2-menu-3">
										<a href="${menu.url}" target="${menu.target!}">
											<span class="hob" style="background-color:#fc3c2d"></span>${menu.name}<i class="b2font b2-jt-down "></i>
										</a>
										<ul class="sub-menu-0 sub-menu box b2-radius">
											<#list menu.children?sort_by('priority') as child>
											<li><a href="${child.url!}" target="${child.target!}">${child.name!}</a></li>
											</#list>
										</ul>
									</li>
								</#if>
								</#list>
								</#if>
							</@menuTag>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</#macro>
