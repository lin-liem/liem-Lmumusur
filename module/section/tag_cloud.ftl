<section id="b2-widget-hot-34" class="mobile-hidden widget b2-widget-hot box b2-radius">
	<div class="b2-widget-title tax-header">
		<h2 class="widget-title"><i class="b2font b2-yuancircle94 "></i>热门标签</h2>
	</div>
	<div class="b2-widget-box widget_tag_cloud ">
      	<div class="tagcloud">
		<@tagTag method="list">
		<#if tags?? && tags?size gt 0>
			<#list tags as tag>
			<a href="${tag.fullPath!}" target="_blank" aria-label="${tag.slug!}">${tag.name!}</a>
			</#list>
		</#if>
		</@tagTag>
        </div>
	</div>
</section>