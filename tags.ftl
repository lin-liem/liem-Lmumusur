<#include "module/layout.ftl">
<@layout type="tags" title="标签 - ${options.blog_title!}" keywords="${options.seo_keywords!}" description="${options.seo_description!}" canonical="${context!}/tags">
	<#include "module/page/article_tags.ftl">
</@layout>