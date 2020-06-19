<#-- 公告列表页面：当分类为公告列表即可用（k:快讯，v:noticelist） -->
<style>
	.content-area {
		width: 804px;
	}
</style>

<div id="primary" class="content-area announcement-page wrapper">
	<main id="main" class="site-main">
		<#if posts.content?? && posts.content?size gt 0>
			<#list posts.content as post>
			<article class="announcement-box mg-b b2-pd b2-radius box">
				<h2 class="title"><a href="${post.fullPath!}">${post.title!}</a></h2>
				<div class="announcement-date mg-t mg-b">${post.editTime?string('yyyy年MM月dd日')}</div>
				<div class="entry-content">
					<blockquote>${post.summary!}</blockquote>
					<div class="announcement-read-more mg-t">
						<a href="h${post.fullPath!}" class="">详情</a>
					</div>
				</div>
			</article>
			</#list>
		</#if>
	</main>
</div>
