<!-- 博主信息 -->
<#if settings.profile_enable!true>
	<#include "./profile.ftl">
</#if>

<!-- 问候模块 -->
<#if settings.hello_info_enable!true>
	<#include "./hello_info.ftl">
</#if>
	
<!-- 导入热门文章 -->
<#if settings.hot_post_enable!true>
	<#include "./hot_posts.ftl">
</#if>
	
<!-- 导入最新文章 -->
<#if settings.recent_post_enable!true>
	<#include "./recent_posts.ftl">
</#if>

<!-- 导入最新快讯文章 -->
<#if settings.recent_newsflashes_enable!true>
	<#include "./recent_newsflashes.ftl">
</#if>

<!-- 导入标签云 -->
<#if settings.tag_cloud_enable!true>
	<#include "./tag_cloud.ftl">
</#if>
	
<!-- 导入最新评论 -->
<#if settings.recent_comment_enable!true>
	<#include "./recent_comments.ftl">
</#if>