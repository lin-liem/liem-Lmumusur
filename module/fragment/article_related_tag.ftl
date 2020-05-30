<#-- 相关推荐 -->
<#macro tagsRelatedMacro  >
	<#list tags as tag>
		<@postTag method="listByTagId" tagId="${tag.id}">
			<#list posts as post>
				<#if (post_index+1) lte 6>
					<div class="related-posts-item">
						<div class="b2-pd">
							<div class="related-post-thumb" style="background-image:url(${post.thumbnail!})">
								<a href="${post.fullPath!}" class="link-block"></a>
							</div>
							<h2><a href="${post.fullPath!}">${post.title!}</a></h2>
							<div class="realte-post-meta">
								<span><time class="b2timeago" datetime="${post.createTime!}" itemprop="datePublished" >${post.createTime?string('yyyy-MM-dd HH:mm:ss')}</time></span>
								<span><i class="b2font b2-pinglun "></i>${post.commentCount}</span>
								<span><i class="b2font b2-eye "></i>${post.visits!}</span>
							</div>
						</div>
					</div>
				</#if>
			</#list>
		</@postTag>
	</#list>	
</#macro> 