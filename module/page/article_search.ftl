<style type="text/css">
	.search .tax-search {
		width: 100%;
		padding: 0 10px 10px;
		border-bottom: 1px solid #f3f3f3;
	}
	.post-item-1 ul.b2_gap>li {
		width: 25%;
	}
</style>
<div class="b2-single-content wrapper single-sidebar-hidden search">
	<div id="primary-home" class="wrapper box b2-radius">
		<div class="search-page-title">
			<h2>资源</h2>
			<p>关键词「<span class="red">${keyword}</span>」的搜索结果：</p>
		</div>
		<div class="tax-search">
			<form method="get" action="${blog_url!}/search" autocomplete="off">
				<input type="text" name="keyword" class="b2-radius" placeholder="输入关键字搜索" value="${keyword}">
				<input type="hidden" name="type" value="post">
				<button class="text"><i class="b2font b2-search "></i></button>
			</form>
		</div>
		<div class="archive-row">
			<div class="post-1 post-list post-item-1" id="post-list">
				<div class="hidden-line">
					<ul class="b2_gap ">
						<#list posts.content as post>
							<li class="post-list-item item-post-style-5" id="item-32693">
								<div class="item-in b2-radius">
									<div class="post-module-thumb" style="padding-top:61.8%">
										<a href="${post.fullPath!}" rel="nofollow" class="thumb-link">
											<img class="post-thumb lazy loaded" data-src="${post.thumbnail!}" src="${post.thumbnail!}" alt="${post.title!}" data-was-processed="true">
										</a>
										<div class="post-list-meta-box">
											<ul class="post-list-meta">
												<li class="post-list-meta-views"><span><i class="b2font b2-eye "></i>${post.visits!}</span></li>
												<li class="post-list-meta-like"><span><i class="b2font b2-pinglun"></i>${post.commentCount}</span></li>
											</ul> 
											<div class="post-list-cat  b2-radius">
												<#if post.categories?? && post.categories?size gt 0>
													<#list post.categories as category>
														<a class="post-list-cat-item b2-radius" style="background-color:#43d480;" href="${category.fullPath!}">${category.name!}</a>
													</#list>
												</#if>
											</div>
										</div>
									</div>
									<div class="post-info">
										<h2><a href="${post.fullPath!}">${post.title!}</a></h2>
										<div class="post-excerpt">${post.summary!}</div>
										<div class="list-footer">
											<a class="post-list-meta-avatar" href="/">
												<img class="avatar b2-radius lazy loaded" data-src="${user.avatar!}" src="${user.avatar!}" data-was-processed="true">
												<span>${user.nickname!"博主"}</span>
												<svg class="Zi Zi--BadgeCert" fill="currentColor" viewBox="0 0 24 24" width="18" height="18">
													<g fill="none" fill-rule="evenodd">
														<path fill="#0F88EB" d="M2.64 13.39c1.068.895 1.808 2.733 1.66 4.113l.022-.196c-.147 1.384.856 2.4 2.24 2.278l-.198.016c1.387-.122 3.21.655 4.083 1.734l-.125-.154c.876 1.084 2.304 1.092 3.195.027l-.127.152c.895-1.068 2.733-1.808 4.113-1.66l-.198-.022c1.386.147 2.402-.856 2.279-2.238l.017.197c-.122-1.388.655-3.212 1.734-4.084l-.154.125c1.083-.876 1.092-2.304.027-3.195l.152.127c-1.068-.895-1.808-2.732-1.66-4.113l-.022.198c.147-1.386-.856-2.4-2.24-2.279l.198-.017c-1.387.123-3.21-.654-4.083-1.733l.125.153c-.876-1.083-2.304-1.092-3.195-.027l.127-.152c-.895 1.068-2.733 1.808-4.113 1.662l.198.02c-1.386-.147-2.4.857-2.279 2.24L4.4 6.363c.122 1.387-.655 3.21-1.734 4.084l.154-.126c-1.083.878-1.092 2.304-.027 3.195l-.152-.127z"></path>
														<path fill="#FFF" d="M9.78 15.728l-2.633-2.999s-.458-.705.242-1.362c.7-.657 1.328-.219 1.328-.219l1.953 2.132 4.696-4.931s.663-.348 1.299.198c.636.545.27 1.382.27 1.382s-3.466 3.858-5.376 5.782c-.98.93-1.778.017-1.778.017z"></path>
													</g>
												</svg>
											</a>
											<span>
												<time class="b2timeago" datetime="${post.createTime}" itemprop="datePublished" data-tid="${post.id}">${post.createTime}</time>
											</span>
										</div>
									</div>
								</div>
							</li>
						</#list>
					</ul>
				</div>
			</div>
		</div>
		
			
		<#if posts.getTotalPages() gt 0>
			<@paginationTag method="search" page="${posts.number}" total="${posts.totalPages}" display="3" keyword="${keyword!}">
			<div data-max="3" class="b2-pagenav post-nav">
				<div class="ajax-pager">
					<div class="ajax-pagenav">
						<div class="btn-group">
							<#list pagination.rainbowPages as number>
								<#if number.isCurrent>
									<a href="javascript:;" class="button empty selected disabled">${number.page!}</a>
								<#else>
									<a href="${number.fullPath!}" class="button empty ">${number.page!}</a>
								</#if>
							</#list>
							<label class="pager-center"><input type="text" value="${posts.number + 1}"> /${posts.totalPages} 页 </label>
						</div>
						<div class="btn-pager">
							<#if pagination.hasPrev>
								<a herf="${pagination.prevPageFullPath!}" class="button empty">❮</a>
							<#else >
								<a herf="javascript:;" class="button empty selected">❮</a>
							</#if>
							
							<#if pagination.hasNext>
								<a href="${pagination.nextPageFullPath!}" class="empty button">❯</a>
							<#else >
								<a href="javascript:;" class="empty button selected">❯</a>
							</#if>
							
						</div>
					</div>
				</div>
			</div>
			</@paginationTag>
		</#if>
			
	</div>
</div>