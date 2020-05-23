<section id="b2-widget-hot-34" class="mobile-hidden widget b2-widget-hot box b2-radius">
	<div class="b2-widget-title">
		<h2 class="widget-title"><i class="b2font b2-yuancircle94 "></i>最新文章</h2>
	</div>
	<div class="b2-widget-box">
		<ul class="b2-widget-list-ul">
			 <@postTag method="latest" top="5">
				<#list posts as post>
					<li class="b2-widget-box widget-post">
						<div class="b2-widget-post-thumb">
							<div class="b2-widget-post-thumb-img">
								<img class="b2-radius lazy" data-src="${post.thumbnail!}" src="${theme_base!}/source/picture/default-img.jpg" alt="${post.title!}">
							</div>
							<div class="b2-widget-post-title">
								<h2>${post.title!}</h2>
								<time datetime="${post.createTime!}">${post.createTime?string('yyyy/MM/dd')}</time>
							</div>
						</div>
						<a ref="nofollow" class="link-overlay" href="${post.fullPath!}"></a>
					</li>
				</#list>
			</@postTag>
		</ul>
	</div>
</section>