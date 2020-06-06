<#-- 所有分类和标签模式 -->
<#if  (settings.tag_and_type_list_model!'ONLY_TYPE_SHOW') == 'ALL_TYPE_SHOW'>
<div class="tax-header mg-t- mg-b">
	<div class="b2-light-dark">
		<div class="b2-light-dark-outside">
			<#if tag?? && tag.thumbnail?? && tag.thumbnail?length gt 0 >
				<div class="b2-light-dark-bg" style="background-image: url(${tag.thumbnail!});"></div>
			<#elseif category?? && category.thumbnail?? && category.thumbnail?length gt 0>
				<div class="b2-light-dark-bg" style="background-image: url(${category.thumbnail!});"></div>
			<#else>
				<div class="b2-light-dark-bg" style="background-image: url(${theme_base!}/source/picture/category_bg.jpg);"></div>
			</#if>
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
					<form method="get" action="/search" autocomplete="off">
						<input type="text" name="keyword" class="b2-radius" placeholder="请输入关键字搜索" value="">
						<button class="text"><i class="b2font b2-search "></i></button>
					</form>
				</div>
				<div class="tax-info-item">
					<a class="fliter-button button" href="${tags_url!}" target="_blank">全部标签</a>
				</div>
				<div class="tax-info-item tag-list">
					<a href="测试.html">测试</a> <a href="wordpress.html">wordpress</a> <a href="ziranzhi2.html">ziranzhi2</a> <a href="wp技巧.html">WP技巧</a>
				</div>
				<div class="tax-title">
					<#if tag?? && tag.thumbnail?? && tag.thumbnail?length gt 0>
						<h1 class="b2-radius" style="background-image: url(${tag.thumbnail!});"><span>${tag.name}</span></h1>
					<#elseif category?? && category.thumbnail?? && category.thumbnail?length gt 0>
						<h1 class="b2-radius" style="background-image:url(${category.thumbnail!});"><span>${category.name}</span></h1>
					<#else>
						<h1 class="b2-radius" style="background-image: url(${theme_base!}/source/picture/category_bg.jpg);">
							<#if tag??>
								<span>${tag.name}</span>
							<#elseif category??>
								<span>${category.name}</span>
							<#else>
								<span>全部</span>
							</#if>
						</h1>
					</#if>
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
									<a href="${categories_url!}" class="current" title="全部">全部</a>
									<@categoryTag method="list">
										<#list categories as categoryItem>
											<#if category?? && categoryItem.id==category.id>
												<a href="${categoryItem.fullPath!}" class="current" title="${categoryItem.slug}">${categoryItem.name}</a>
											<#else>
												<a href="${categoryItem.fullPath!}" title="${categoryItem.slug}">${categoryItem.name}</a>
											</#if>
										</#list>
									</@categoryTag>
								</div>
							</li>
							<li>
								<div class="filter-name">标签：</div>
								<div class="filter-items">
									<a href="${tags_url!}" class="current" title="全部">全部</a>
									<@tagTag method="list">
										<#list tags as tagItem>
											<#if tag?? && tagItem.id==tag.id>
												<a href="${tagItem.fullPath!}" class="current" title="${tagItem.slug}">${tagItem.name}</a>
											<#else>
												<a href="${tagItem.fullPath!}" title="${tagItem.slug}">${tagItem.name}</a>
											</#if>
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
<#elseif (settings.tag_and_type_list_model!'ONLY_TYPE_SHOW') == 'ONLY_TYPE_SHOW'>
<#-- 分类下详尽分类模式 -->
<div class="tax-header mg-t- mg-b">
	<div class="b2-light-dark">
		<div class="b2-light-dark-outside">
			<#if tag?? && tag.thumbnail?? && tag.thumbnail?length gt 0 >
				<div class="b2-light-dark-bg" style="background-image: url(${tag.thumbnail!});"></div>
			<#elseif category?? && category.thumbnail?? && category.thumbnail?length gt 0>
				<div class="b2-light-dark-bg" style="background-image: url(${category.thumbnail!});"></div>
			<#else>
				<div class="b2-light-dark-bg" style="background-image: url(${theme_base!}/source/picture/category_bg.jpg);"></div>
			</#if>
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
					<form method="get" action="/search" autocomplete="off">
						<input type="text" name="keyword" class="b2-radius" placeholder="请输入关键字搜索" value="">
						<button class="text"><i class="b2font b2-search "></i></button>
					</form>
				</div>
				<div class="tax-info-item">
					<a class="fliter-button button" href="${tags_url!}" target="_blank">全部标签</a>
				</div>
				<div class="tax-info-item tag-list">
					<a href="测试.html">测试</a> <a href="wordpress.html">wordpress</a> <a href="ziranzhi2.html">ziranzhi2</a> <a href="wp技巧.html">WP技巧</a>
				</div>
				<div class="tax-title">
					<#if tag?? && tag.thumbnail?? && tag.thumbnail?length gt 0>
						<h1 class="b2-radius" style="background-image: url(${tag.thumbnail!});"><span>${tag.name}</span></h1>
					<#elseif category?? && category.thumbnail?? && category.thumbnail?length gt 0>
						<h1 class="b2-radius" style="background-image:url(${category.thumbnail!});"><span>${category.name}</span></h1>
					<#else>
						<h1 class="b2-radius" style="background-image: url(${theme_base!}/source/picture/category_bg.jpg);">
							<#if tag??>
								<span>${tag.name}</span>
							<#elseif category??>
								<span>${category.name}</span>
							<#else>
								<span>全部</span>
							</#if>
						</h1>
					</#if>
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
									<@categoryTag method="list">
										<#list categories as categoryChild>
											<#if category?? && ( categoryChild.parentId == category.id && category.parentId == 0 )>
												<#if category?? && categoryChild.id == category.id>
													<a href="${categoryChild.fullPath!}" class="current" title="${categoryChild.slug}">全部</a>
												<#else>
													<a href="${categoryChild.fullPath!}" title="${categoryChild.slug}">全部</a>
												</#if>
											</#if>
										</#list>
									</@categoryTag>
										
									<@categoryTag method="list">
										<#list categories as categoryChild>
											<#if category?? && (categoryChild.parentId == category.id || categoryChild.parentId == category.parentId && category.parentId != 0)>
												<#if category?? && categoryChild.id == category.id>
													<a href="${categoryChild.fullPath!}" class="current" title="${categoryChild.slug}">${categoryChild.name}</a>
												<#else>
													<a href="${categoryChild.fullPath!}" title="${categoryChild.slug}">${categoryChild.name}</a>
												</#if>
											</#if>
										</#list>
									</@categoryTag>
								</div>
							</li>
							<li>
								<div class="filter-name">标签：</div>
								<div class="filter-items">
									<a href="${tags_url!}" class="current" title="全部">全部</a>
									<@tagTag method="list">
										<#list tags as tagItem>
											<#if tag?? && tagItem.id==tag.id>
												<a href="${tagItem.fullPath!}" class="current" title="${tagItem.slug}">${tagItem.name}</a>
											<#else>
												<a href="${tagItem.fullPath!}" title="${tagItem.slug}">${tagItem.name}</a>
											</#if>
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

</#if>