<div class="tax-header mg-t- mg-b">
	<div class="b2-light-dark">
		<div class="b2-light-dark-outside">
			<div class="b2-light-dark-bg" style="background-image: url(${theme_base!}/source/picture/category_bg.jpg);"></div>
		</div>
		<div class="wrapper">
			<div class="tax-info">
				<div class="tax-info-item">
					<button class="fliter-button" @click.stop="show('hot')">智能<i class="b2font b2-jt-block-down "></i></button>
				</div>
				<div class="tax-info-item mobile-show" @click.stop="show('cat')">
					<button class="fliter-button">筛选<i class="b2font b2-jt-block-down "></i></button>
				</div>
				<div class="tax-search tax-info-item">
					<form method="post" action="https://www.dachaoka.com/wp-jq/fenlei1" autocomplete="off">
						<input type="text" name="archiveSearch" class="b2-radius" placeholder="在「分类3」中搜索" value="">
						<button class="text"><i class="b2font b2-search "></i></button>
					</form>
				</div>
				<div class="tax-info-item">
					<a class="fliter-button button" href="javascript:;" target="_blank">全部标签</a>
				</div>
				<div class="tax-info-item tag-list">
					<a href="测试.html">测试</a> <a href="wordpress.html">wordpress</a> <a href="ziranzhi2.html">ziranzhi2</a> <a href="wp技巧.html">WP技巧</a>
				</div>
				<div class="tax-title">
					<h1 class="b2-radius" style="background-image:url(static/image/1ea9b58345ba48.jpg)"><span>分类3</span></h1>
				</div>
			</div>
			<div class="tax-fliter-hot" v-show="showFliter.hot" v-cloak="">
				<div class="tax-order-box">
					<div class="order-items"><a href="javascript:;" class="current">最新</a><a href="javascript:;" class="">随机</a><a
						 href="javascript:;" class="">最多浏览</a><a href="javascript:;" class="">最多喜欢</a><a href="javascript:;" class="">最多评论</a></div>
				</div>
			</div>
			<div :id="showFliter.cat ? 'fliter-show' : ''" class="tax-fliter-cat" ref="filterContent">
				<div id="filter-top">
					<div class="filters-box">
						<ul>
							<li>
								<div class="filter-name">分类：</div>
								<div class="filter-items">
									<a href="javascript:;" class="current" title="全部">全部</a>
									<@categoryTag method="list">
										<#list categories as category>
											 <a href="${category.fullPath!}"  title="${category.slug}">${category.name}</a>
										</#list>
									</@categoryTag>
								</div>
							</li>
							<li>
								<div class="filter-name">标签：</div>
								<div class="filter-items">
									<a href="javascript:;" class="current" title="全部">全部</a>
									<@tagTag method="list">
										<#list tags as tag>
											<a href="${tag.fullPath!}"  title="${tag.slug}">${tag.name}</a>
										</#list>
									</@tagTag>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<div class="waves-bg">
			<svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewbox="0 24 150 28"
			 preserveaspectratio="none" shape-rendering="auto">
				<defs>
					<path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"></path>
				</defs>
				<g class="parallax">
					<use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7"></use>
					<use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)"></use>
					<use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)"></use>
					<use xlink:href="#gentle-wave" x="48" y="7" fill="#fff"></use>
				</g>
			</svg>
		</div>
	</div>
</div>
<div class="b2-single-content wrapper category single-sidebar-show ">

	<div id="primary-home" class="content-area box">
		<style>
			.post-item-1 ul.b2_gap > li{
					width:100%    
			}
		</style>
		<div class="archive-row">
			<div class="post-3 post-list post-item-1 hidden-line" id="post-list">
				<ul class="b2_gap ">
					<#list posts.content as post>
					<li class="post-3-li post-list-item">
						<div class="item-in b2-radius">
							<div class="post-module-thumb">
								<div style="padding-top:70%;width:100%;height:0">
									<a href="35223.html" rel="nofollow" class="thumb-link">
										<img class="post-thumb b2-radius lazy" data-src="${post.thumbnail!}" alt="${post.title!}" src="${theme_base!}/source/picture/default-img.jpg">
									</a>
								</div>
							</div>
							<div class="post-info">
								<div class="post-list-cat  b2-radius">
									<#if post.categories?? && post.categories?size gt 0>
										<#list post.categories as category>
											<a class="post-list-cat-item b2-radius" href="${category.fullPath!}">
												<span class="post-3-cat" style="border: 2px solid #55efc4"></span>${category.name!}
											</a>
										</#list>
									</#if>
								</div>
								<h2><a href="${post.fullPath!}">${post.title!}</a></h2>
								<div class="post-excerpt">${post.summary!}</div>
								<div class="post-list-meta-box ">
									<ul class="post-list-meta">
										<li class="post-list-meta-user">
											<a class="post-list-meta-avatar" href="dBCBCkrns.html">
												<img class="avatar b2-radius lazy" data-src="${user.avatar!}" src="${theme_base!}/source/picture/default-img.jpg">
												<span>${user.nickname!"博主"}</span>
											</a>
										</li>
										<li class="post-list-meta-date">
											<span>
												<time class="b2timeago" datetime="${post.createTime}" itemprop="datePublished">${post.createTime}</time>
											</span>
										</li>
										<li class="post-list-meta-views">
											<span><i class="b2font b2-eye "></i>${post.visits!}</span>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</li>
					</#list>
				</ul>
			</div>
		</div>
	</div>


	<aside id="secondary" class="widget-area">
		<div class="sidebar-innter">
			<#include "../section/section.ftl">
		</div>
	</aside>
</div>