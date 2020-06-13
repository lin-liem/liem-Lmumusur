<#if settings.newsflashes_enable!'false' && category.slug == 'newsflashes'>
	<#include "../fragment/article_category_newsflashes_list.ftl">
<#else>
	<#include "../fragment/article_category_tag_list.ftl">
	<#include "../fragment/article_category_tag_content.ftl">
</#if>



