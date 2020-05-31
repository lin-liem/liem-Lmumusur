<#macro article post,layout,commentType,pageType>
	<#-- 文章模板 -->
	<#if pageType == 'content'>
		<#include "./article_content.ftl">
	</#if>
	
	<#-- 下载模板 -->
	<#if pageType == 'download'>
		<#include "./article_download.ftl">
	</#if>
	
	<#-- 分类页模板 -->
	<#if pageType == 'category'>
		<#include "./article_category.ftl">
	</#if>
</#macro>