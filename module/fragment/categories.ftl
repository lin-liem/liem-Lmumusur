<div class="post-list-cats post-list-cats-has-title" data-opt='{"post_type":"post-3","post_order":"new","post_row_count":"1","post_count":"12","post_thumb_ratio":"1\/0.7","post_open_type":"1","post_meta":["title","desc","links","user","date","views","cats","des"],"width":804,"show_widget":true}' data-i="6" id="post-item-6" data-pages="5" style="">
	<div class="post-carts-list-row" data-flickity='{"pageDots": false,"groupCells": true,"cellAlign": "left" ,"selectedAttraction": 0.2,"friction": 0.8}'>
		
		<#assign slugName>
			[<#list  categories as category>"${category.slug}",</#list>]
		</#assign>
			
		<a class="cat-list picked post-load-button" data-cats='${slugName}' href="javascript:void(0)" data-type="cat" data-i="6">
			<span data-type="cat">全部</span>
		</a>
		<@categoryTag method="list">
			<#list categories as category>
				<a class="cat-list post-load-button" data-cats='["${category.slug}"]' href="${category.fullPath!}" data-type="cat" data-i="6">
					<span data-type="cat">${category.name}</span>
				</a>
			</#list>
		</@categoryTag>
	</div>
</div>