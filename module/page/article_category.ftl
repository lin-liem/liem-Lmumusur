<#if settings.newsflashes_enable && category.slug?? && category.slug == 'newsflashes'>
	<#include "../fragment/article_category_newsflashes_list.ftl">
<#elseif category.slug?? && category.slug == 'noticelist'>
	<#include "../fragment/article_category_notice_list.ftl">
<#else>
	<#include "../fragment/article_category_tag_list.ftl">
	<#include "../fragment/article_category_tag_content.ftl">
</#if>



