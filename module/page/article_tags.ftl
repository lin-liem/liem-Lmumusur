<div class="b2-single-content wrapper">
	<div id="tags" class="tags-page wrapper">
		<main id="main" class="site-main">
			<h1>热门标签</h1>
			<ul>
				 <@categoryTag method="list">
                    <#list categories as category>
                        <li>
                        	<a href="${category.fullPath!}" target="_blank" class="box b2-radius b2-mg">
                        		<h2 title="${category.name}">${category.name}</h2>
                        		<p>共${category.postCount!}篇文章</p>
                        	</a>
                        </li>
                    </#list>
                </@categoryTag>
			</ul>
		</main>
	</div>
</div>
