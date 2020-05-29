<div class="post-pre-next mg-b box b2-radius">
	<#if prevPost??>
		<div class="post-pre">
			<div class="post-pre-next-in b2-pd b2-radius" style="background-image:url('${prevPost.thumbnail!}')">
				<div class="post-pre-next-info">
					<#if prevPost.super.categories?? && prevPost.super.categories?size gt 0>
						<div class="post-per-next-cats">
							<#list prevPost.super.categories as cate>
								<a href="${cate.fullPath}" style="background-color:#607d8b"><span>${cate.name}</span></a>
							</#list>
						</div>
					</#if>
					<h2><a href="${prevPost.fullPath!}">${prevPost.title!}</a></h2>
					<p>${prevPost.createTime?string('yyyy-MM-dd HH:mm:ss')}</p>
				</div>
			</div>
		</div>
	</#if>
	<#if nextPost??>
		<div class="post-next">
			<div class="post-pre-next-in b2-pd b2-radius" style="background-image:url('${nextPost.thumbnail!}')">
				<div class="post-pre-next-info">
					<#if nextPost.super.categories?? && nextPost.super.categories?size gt 0>
						<div class="post-per-next-cats">
							<#list nextPost.super.categories as cate>
								<a href="${cate.fullPath}" style="background-color:#607d8b"><span>${cate.name}</span></a>
							</#list>
						</div>
					</#if>
					<h2><a href="${nextPost.fullPath!}">${nextPost.title!}</a></h2>
					<p>${nextPost.createTime?string('yyyy-MM-dd HH:mm:ss')}</p>
				</div>
			</div>
		</div>
	</#if>
</div>