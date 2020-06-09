<section id="b2-widget-comment-12" class="mobile-hidden widget b2-widget-comment box b2-radius">
	<div class="b2-widget-title">
		<h2 class="widget-title"><i class="b2font b2-yuancircle94 "></i>最新评论</h2>
	</div>
	<div class="b2-widget-box">
		<div id="comment-widget" data-count="5" data-hidden="1" class="comment-widget">
			<ul>
				<@commentTag method="latest" top="${settings.recent_comment_count!5}">
					<#if comments?? && comments.getTotalElements() gt 0>
						<#list comments.content as comment>
							<li>
								<div class="widget-comment-user">
									<div class="widget-comment-user-left">
									${comment}
										<img src="${comment.avatar!}" class="b2-radius avatar"> 
										<span>${comment.author!}</span>
									</div>
									<time datetime="${comment.createTime!}" itemprop="datePublished" data-tid="25" class="b2timeago">${comment.createTime?string('yyyy-MM-dd')}</time>
								</div>
								<div class="widget-comment-contnet b2-radius jt">
									<p>${comment.content!}</p>
								</div>
								<div class="widget-comment-post">
									<span><b class="b2-color">「资源」</b>来自：</span>
									<a href="${comment.post.fullPath!}#comment-wrapper">${comment.post.title!}</a>
								</div>
							</li>
						</#list>
					</#if>
				</@commentTag>
			</ul>
		</div>
	</div>
</section>