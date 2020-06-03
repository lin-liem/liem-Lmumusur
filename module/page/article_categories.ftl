<div class="b2-single-content wrapper">
	<div id="tags" class="tags-page wrapper">
		<main id="main" class="site-main">
			<h1>热门分类</h1>
			<ul>
				<@tagTag method="list">
                    <#list tags as tag>
						<li>
							<a href="${tag.fullPath!}" target="_blank" class="box b2-radius b2-mg">
								<h2 title="${tag.name}">${tag.name}</h2>
								<p>共${tag.postCount!}篇文章</p>
							</a>
						</li>
					</#list>
				</@tagTag>
			</ul>
		</main>
	</div>
</div>

