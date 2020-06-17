<section id="b2-widget-newsflashes-2" class="mobile-hidden widget b2-widget-newsflashes mg-b box b2-radius">
	<div class="b2-widget-title">
		<h2 class="widget-title"><i class="b2font b2-yuancircle94 "></i>快讯</h2>
		<a target="_blank" href="https://www.dachaoka.com/newsflashes">全部</a>
	</div>
	<div class="b2-widget-box">
		<div class="widget-newsflashes-box">
			<ul>
				<div style="">
					<@categoryTag method="list">
						<#list categories as category>
							<#if category.slug == 'newsflashes'>
								<@postTag method="listByCategoryId" categoryId="${category.id}">
									<#list posts as post>
										<li>
											<div class="widget-new-header">
												<span class="widget-news-user">
													<img src="${user.avatar!}" alt="${user.nickname!}">
													<b>${user.nickname!}</b>
												</span> 
												<span class="ps1">${post.createTime?string('MM年dd日 HH:mm')}</span> 
												<span class="ps"><a href="#"><b>apple</b></a></span>
											</div>
											<div class="widget-new-content">
												<h2 class="anhover"><a href="${post.fullPath!}" target="_blank"><b>${post.title!}</b></a></h2>
												<p><a href="${post.fullPath!}" target="_blank">${post.summary!}</a></p>
											</div>
										</li>
									</#list>
								</@postTag>
							</#if>
						</#list>
					</@categoryTag>
				</div>
			</ul>
		</div>
	</div>
</section>
