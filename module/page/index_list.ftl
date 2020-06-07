<div class="post-3 post-list post-item-6">
	<div class="post-modules-top  ">
		<div class="modules-title-box">
			<h2 class="module-title">${settings.index_card_title!}</h2>
			<p class="module-desc">${settings.index_card_title_desc!}</p>
		</div>
		<!-- 分类 -->
		<#include "../fragment/index_navbar_categories.ftl">
	</div>
	<div class="hidden-line">
		<ul class="b2_gap">
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
									<a class="post-list-meta-avatar" href="/">
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
	<div class="load-more box-in ">
		<button class="empty post-load-button" data-none="没有更多内容了" data-text="加载更多"
		 data-type="more" data-i="6">加载更多</button>
	</div>
</div>