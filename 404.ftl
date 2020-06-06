<#include "module/layout.ftl">
<@layout type="error" title="未找到页面 - 404 - ${options.blog_title!}" keywords="${options.seo_keywords!}" description="${options.seo_description!}" canonical="${context!}/categories">
    <#assign errorCode="未找到页面 - 404">
	<#include "module/page/error_page.ftl">
</@layout>
