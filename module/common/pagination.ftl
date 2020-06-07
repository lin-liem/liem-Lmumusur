<#if posts.getTotalPages() gt 1>
	<#if category??>
		<@paginationTag method="categoryPosts" page="${posts.number}" total="${posts.totalPages}" display="3" slug="${category.slug!}">
			<#include "./pagination_content.ftl">
		</@paginationTag>
	<#elseif tag??>
		<@paginationTag method="tagPosts" page="${posts.number}" total="${posts.totalPages}" display="3" slug="${tag.slug!}">
			<#include "./pagination_content.ftl">
		</@paginationTag>
	<#elseif is_search??>
		<@paginationTag method="search" page="${posts.number}" total="${posts.totalPages}" display="3" keyword="${keyword!}">
			<#include "./pagination_content.ftl">
		</@paginationTag>
	</#if>
</#if>
	
 