<#-- 相关推荐 -->
<#macro categoryRelatedMacro  >
<section id="b2-widget-products-8" class="mobile-hidden widget b2-widget-products box b2-radius">
	<div class="b2-widget-title">
		<h2 class="widget-title"><i class="b2font b2-yuancircle94 "></i>推荐资源</h2>
	</div>
	<div class="b2-widget-box">
		<div class="hidden-line">
			<ul class="b2-widget-list-ul">
				<#list categories as category>
				  <@postTag method="listByCategoryId" categoryId="${category.id}">
						<#list posts as post>
						<li class="b2-widget-box widget-post widget-post-big">
							<div class="b2-widget-post-thumb box-in b2-radius">
								<div class="b2-widget-post-thumb-product-img">
									<img src="${post.thumbnail!}" alt="${post.title!}">
									<span class="shop-normal-tips">兑换</span>
								</div>
								<div class="b2-widget-post-title">
									<h2> ${post.title!}</h2>
									<div class="products-price green"> <i class="b2font b2-jifen "></i> ${post.createTime?string('yyyy-MM-dd')}发布</div>
								</div>
								<a ref="nofollow" class="link-overlay" href="${post.fullPath!}"></a>
							</div>
						</li>
						</#list>
					</@postTag>
				</#list>	
			</ul>
		</div>
	</div>
</section>
</#macro> 
