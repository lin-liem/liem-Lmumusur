<#include "module/layout.ftl">
<#include "module/sheet/sheet_document.ftl">
<@layout type="document" title="${post.title!} - ${options.blog_title!}" keywords="${options.seo_keywords!},${tagWords!}" description="${options.seo_description!}" canonical="${post.fullPath!}">
	<@document post,'page',"post",'content' />
</@layout>
 
