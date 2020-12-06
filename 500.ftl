<#include "module/layout.ftl">
<@layout type="error" title="服务器异常！ - 500 - ${options.blog_title!}" keywords="${options.seo_keywords!}" description="${options.seo_description!}" canonical="${context!}/categories">
    <#assign errorCode="服务器异常 - 500">
	<#include "module/page/error_page.ftl">
</@layout>
