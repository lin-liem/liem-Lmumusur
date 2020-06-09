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
							<a href="${post.fullPath!}" rel="nofollow" class="thumb-link">
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
										<svg class="Zi Zi--BadgeCert" fill="currentColor" viewBox="0 0 24 24" width="18" height="18">
											<g fill="none" fill-rule="evenodd">
												<path fill="#0F88EB" d="M2.64 13.39c1.068.895 1.808 2.733 1.66 4.113l.022-.196c-.147 1.384.856 2.4 2.24 2.278l-.198.016c1.387-.122 3.21.655 4.083 1.734l-.125-.154c.876 1.084 2.304 1.092 3.195.027l-.127.152c.895-1.068 2.733-1.808 4.113-1.66l-.198-.022c1.386.147 2.402-.856 2.279-2.238l.017.197c-.122-1.388.655-3.212 1.734-4.084l-.154.125c1.083-.876 1.092-2.304.027-3.195l.152.127c-1.068-.895-1.808-2.732-1.66-4.113l-.022.198c.147-1.386-.856-2.4-2.24-2.279l.198-.017c-1.387.123-3.21-.654-4.083-1.733l.125.153c-.876-1.083-2.304-1.092-3.195-.027l.127-.152c-.895 1.068-2.733 1.808-4.113 1.662l.198.02c-1.386-.147-2.4.857-2.279 2.24L4.4 6.363c.122 1.387-.655 3.21-1.734 4.084l.154-.126c-1.083.878-1.092 2.304-.027 3.195l-.152-.127z"></path><path fill="#FFF" d="M9.78 15.728l-2.633-2.999s-.458-.705.242-1.362c.7-.657 1.328-.219 1.328-.219l1.953 2.132 4.696-4.931s.663-.348 1.299.198c.636.545.27 1.382.27 1.382s-3.466 3.858-5.376 5.782c-.98.93-1.778.017-1.778.017z">
												</path>
											</g>
										</svg>
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