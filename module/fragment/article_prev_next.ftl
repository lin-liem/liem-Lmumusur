<div class="post-pre-next mg-b box b2-radius">
	<#if prevPost??>
		<div class="post-pre">
			<div class="post-pre-next-in b2-pd b2-radius" style="background-image:url('${prevPost.thumbnail!}')">
				<div class="post-pre-next-info">
					<div class="post-per-next-cats">
						<a href="ertae.html" style="background-color:#43d480"><span>主题更新</span></a><a
						 href="fenlei6.html" style="background-color:#55efc4"><span>未分类</span></a></div>
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
					<div class="post-per-next-cats">${nextPost}<a href="fenlei8.html" style="background-color:#607d8b"><span>测试分类</span></a></div>
					<h2><a href="${nextPost.fullPath!}">${nextPost.title!}</a></h2>
					<p>${nextPost.createTime?string('yyyy-MM-dd HH:mm:ss')}</p>
				</div>
			</div>
		</div>
	</#if>
</div>