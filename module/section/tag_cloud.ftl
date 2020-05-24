<section id="b2-widget-hot-34" class="mobile-hidden widget b2-widget-hot box b2-radius">
	<div class="b2-widget-title">
		<h2 class="widget-title"><i class="b2font b2-yuancircle94 "></i>热门标签</h2>
	</div>
	<div class="b2-widget-box">
		<div class="tagcloud">
			<@tagTag method="list">
			<#if tags?? && tags?size gt 0>
				<#list tags as tag>
				<a href="${tag.fullPath!}" class="tag-cloud-link tag-link-8 tag-link-position-1" style="font-size:${tag.postCount+tag.name?length+tag.slug?length}px" aria-label="${tag.name!}">${tag.name!}</a>
				</#list>
			</#if>
			</@tagTag>
		</div>	
	</div>
</section>