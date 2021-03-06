<div class="post-list-cats post-list-cats-has-title" data-opt='{"post_type":"post-3","post_order":"new","post_row_count":"1","post_count":"12","post_thumb_ratio":"1\/0.7","post_open_type":"1","post_meta":["title","desc","links","user","date","views","cats","des"],"width":804,"show_widget":true}' data-i="6" id="post-item-6" data-pages="5" style="">
	<div class="post-carts-list-row" data-flickity='{"pageDots": false,"groupCells": true,"cellAlign": "left" ,"selectedAttraction": 0.2,"friction": 0.8}'>
		<#assign text>${settings.filter_category_json}</#assign>
		<#assign filterCate=text?eval />
		
		<#assign slugName>
          	<@categoryTag method="list">
          	<#list categories as category>
				<#if category.slug != 'noticelist' && category.slug != 'newsflashes'>
					<#if category.parentId == 0 >
					"${category.slug}",
					</#if>
				</#if>
          	</#list>
            </@categoryTag>
		</#assign>
		<a class="cat-list picked post-load-button" data-cats='[${slugName?substring(0,slugName?length-2)}]' href="javascript:void(0)" data-type="cat" data-i="6">
			<span data-type="cat">全部</span>
		</a>
		<@categoryTag method="list">
			<#list categories as category>
				<#if category.slug != 'noticelist' && category.slug != 'newsflashes'>
					<#if category.parentId == 0>
					<a class="cat-list post-load-button" data-cats='["${category.slug}"]' href="${category.fullPath!}" data-type="cat" data-i="6">
						<span data-type="cat">${category.name}</span>
					</a>
					</#if>
				</#if>
			</#list>
		</@categoryTag>
	</div>
</div>