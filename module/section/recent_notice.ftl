<div class="user-w-login-tips">
	<span>公告</span>
	<a href="https://www.mumusur.com/categories/noticelist.html" target="_blank">全部 ❯</a>
</div>
<div class="user-w-announcement">
	<div>
		<ul>
		<@categoryTag method="list">
			<#list categories as category>
				<#if category.slug == 'noticelist'>
					<@postTag method="listByCategoryId" categoryId="${category.id}">
						<#list posts?sort_by(["createTime"])?reverse as post>
							<#if post_index lte 5>
							<li><a href="${post.fullPath!}" target="_blank">${post.title!}</a></li>
							</#if>
						</#list>
					</@postTag>
				</#if>
			</#list>
		</@categoryTag>
		</ul>
	</div>
</div>