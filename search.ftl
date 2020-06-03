<#include "module/layout.ftl">
<@layout type="search" title="搜索：${keyword} - ${blog_title!}" keywords="${options.seo_keywords!}" description="${options.seo_description!}" canonical="${blog_url!}/search?keyword=${keyword}">
	<#include "module/page/article_search.ftl">
</@layout>